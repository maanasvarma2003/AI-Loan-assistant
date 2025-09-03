import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Service Worker for offline capability in low bandwidth areas
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    if (process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    } else {
      // Ensure no SW in dev to avoid reload/blinking issues
      navigator.serviceWorker.getRegistrations().then(registrations => {
        registrations.forEach(reg => reg.unregister());
      });
    }
  });
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);
