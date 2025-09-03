// Service Worker for RuralLend - Offline-first functionality for rural areas

const CACHE_NAME = 'rurallend-v1.0.0';
const OFFLINE_URL = '/offline.html';

// Resources to cache for offline functionality
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  OFFLINE_URL
];

// Install event - cache essential resources
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching essential resources');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('Service Worker: Installation complete');
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('Service Worker: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activation complete');
        return self.clients.claim();
      })
  );
});

// Fetch event - implement cache-first strategy with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Handle API requests differently
  if (request.url.includes('/api/')) {
    event.respondWith(handleApiRequest(request));
    return;
  }

  // Handle navigation requests
  if (request.mode === 'navigate') {
    event.respondWith(handleNavigationRequest(request));
    return;
  }

  // Handle other requests with cache-first strategy
  event.respondWith(
    caches.match(request)
      .then((response) => {
        if (response) {
          return response;
        }
        
        return fetch(request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response for caching
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(request, responseToCache);
              });

            return response;
          });
      })
      .catch(() => {
        // Provide fallback for offline scenarios
        if (request.destination === 'document') {
          return caches.match(OFFLINE_URL);
        }
      })
  );
});

// Handle API requests with network-first strategy and queue for retry
async function handleApiRequest(request) {
  try {
    const response = await fetch(request);
    
    // Cache successful API responses for short duration
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      const clonedResponse = response.clone();
      
      // Add timestamp for cache expiration
      const headers = new Headers(clonedResponse.headers);
      headers.set('sw-cached-time', Date.now().toString());
      
      const cachedResponse = new Response(clonedResponse.body, {
        status: clonedResponse.status,
        statusText: clonedResponse.statusText,
        headers: headers
      });
      
      cache.put(request, cachedResponse);
    }
    
    return response;
  } catch (error) {
    console.log('Service Worker: API request failed, checking cache:', request.url);
    
    // Try to serve from cache
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      const cachedTime = cachedResponse.headers.get('sw-cached-time');
      const now = Date.now();
      const maxAge = 5 * 60 * 1000; // 5 minutes
      
      if (cachedTime && (now - parseInt(cachedTime)) < maxAge) {
        console.log('Service Worker: Serving cached API response');
        return cachedResponse;
      }
    }
    
    // Queue request for retry when back online
    await queueFailedRequest(request);
    
    // Return offline response
    return new Response(
      JSON.stringify({
        error: 'offline',
        message: 'This request will be retried when connection is restored',
        queued: true
      }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Handle navigation requests
async function handleNavigationRequest(request) {
  try {
    const response = await fetch(request);
    return response;
  } catch (error) {
    // Serve cached page or offline page
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    return caches.match(OFFLINE_URL);
  }
}

// Queue failed requests for retry
async function queueFailedRequest(request) {
  const requestData = {
    url: request.url,
    method: request.method,
    headers: Object.fromEntries(request.headers.entries()),
    body: request.body ? await request.text() : null,
    timestamp: Date.now()
  };
  
  // Store in IndexedDB for persistence
  try {
    const db = await openDB();
    const transaction = db.transaction(['requests'], 'readwrite');
    const store = transaction.objectStore('requests');
    await store.add(requestData);
    console.log('Service Worker: Queued failed request for retry');
  } catch (error) {
    console.error('Service Worker: Failed to queue request:', error);
  }
}

// Simple IndexedDB wrapper for storing failed requests
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('RuralLendOffline', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('requests')) {
        const store = db.createObjectStore('requests', { keyPath: 'id', autoIncrement: true });
        store.createIndex('timestamp', 'timestamp', { unique: false });
      }
    };
  });
}

// Listen for online events to retry queued requests
self.addEventListener('online', () => {
  console.log('Service Worker: Back online, processing queued requests');
  processQueuedRequests();
});

// Process queued requests when back online
async function processQueuedRequests() {
  try {
    const db = await openDB();
    const transaction = db.transaction(['requests'], 'readonly');
    const store = transaction.objectStore('requests');
    const requests = await store.getAll();
    
    for (const requestData of requests) {
      try {
        const response = await fetch(requestData.url, {
          method: requestData.method,
          headers: requestData.headers,
          body: requestData.body
        });
        
        if (response.ok) {
          // Remove successfully processed request
          const deleteTransaction = db.transaction(['requests'], 'readwrite');
          const deleteStore = deleteTransaction.objectStore('requests');
          await deleteStore.delete(requestData.id);
          
          console.log('Service Worker: Successfully retried request:', requestData.url);
        }
      } catch (error) {
        console.error('Service Worker: Retry failed for request:', requestData.url, error);
      }
    }
  } catch (error) {
    console.error('Service Worker: Failed to process queued requests:', error);
  }
}

// Background sync for retrying failed requests
self.addEventListener('sync', (event) => {
  if (event.tag === 'retry-requests') {
    event.waitUntil(processQueuedRequests());
  }
});

// Push notification handling for loan updates
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'You have a new update from RuralLend',
    icon: '/logo192.png',
    badge: '/logo192.png',
    data: {
      url: '/'
    }
  };

  event.waitUntil(
    self.registration.showNotification('RuralLend', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(
    self.clients.openWindow(event.notification.data.url || '/')
  );
});
