import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state for the app
const initialState = {
  user: null,
  loanApplication: {
    personalInfo: {},
    financialInfo: {},
    documents: [],
    aiAnalysis: null,
    status: 'draft'
  },
  language: 'en',
  isOnline: navigator.onLine,
  notifications: [],
  retryQueue: [],
  analytics: {
    userEngagement: {},
    conversionMetrics: {},
    errorRates: {}
  }
};

// Action types
const actionTypes = {
  SET_USER: 'SET_USER',
  UPDATE_LOAN_APPLICATION: 'UPDATE_LOAN_APPLICATION',
  SET_LANGUAGE: 'SET_LANGUAGE',
  SET_ONLINE_STATUS: 'SET_ONLINE_STATUS',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
  ADD_TO_RETRY_QUEUE: 'ADD_TO_RETRY_QUEUE',
  REMOVE_FROM_RETRY_QUEUE: 'REMOVE_FROM_RETRY_QUEUE',
  UPDATE_ANALYTICS: 'UPDATE_ANALYTICS',
  RESET_APPLICATION: 'RESET_APPLICATION'
};

// Reducer function
function appReducer(state, action) {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.payload
      };
    
    case actionTypes.UPDATE_LOAN_APPLICATION:
      return {
        ...state,
        loanApplication: {
          ...state.loanApplication,
          ...action.payload
        }
      };
    
    case actionTypes.SET_LANGUAGE:
      return {
        ...state,
        language: action.payload
      };
    
    case actionTypes.SET_ONLINE_STATUS:
      return {
        ...state,
        isOnline: action.payload
      };
    
    case actionTypes.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      };
    
    case actionTypes.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload)
      };
    
    case actionTypes.ADD_TO_RETRY_QUEUE:
      return {
        ...state,
        retryQueue: [...state.retryQueue, action.payload]
      };
    
    case actionTypes.REMOVE_FROM_RETRY_QUEUE:
      return {
        ...state,
        retryQueue: state.retryQueue.filter(item => item.id !== action.payload)
      };
    
    case actionTypes.UPDATE_ANALYTICS:
      return {
        ...state,
        analytics: {
          ...state.analytics,
          ...action.payload
        }
      };
    
    case actionTypes.RESET_APPLICATION:
      return {
        ...state,
        loanApplication: initialState.loanApplication
      };
    
    default:
      return state;
  }
}

// Create context
const AppContext = createContext();

// Provider component
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load state from localStorage on app start
  useEffect(() => {
    const savedState = localStorage.getItem('ruralLendState');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        // Restore certain parts of state
        if (parsedState.loanApplication) {
          dispatch({
            type: actionTypes.UPDATE_LOAN_APPLICATION,
            payload: parsedState.loanApplication
          });
        }
        if (parsedState.language) {
          dispatch({
            type: actionTypes.SET_LANGUAGE,
            payload: parsedState.language
          });
        }
      } catch (error) {
        console.error('Failed to restore state from localStorage:', error);
      }
    }
  }, []);

  // Save important state to localStorage
  useEffect(() => {
    const stateToSave = {
      loanApplication: state.loanApplication,
      language: state.language,
      user: state.user
    };
    localStorage.setItem('ruralLendState', JSON.stringify(stateToSave));
  }, [state.loanApplication, state.language, state.user]);

  // Online/offline status management
  useEffect(() => {
    const handleOnline = () => {
      dispatch({ type: actionTypes.SET_ONLINE_STATUS, payload: true });
      // Process retry queue when back online
      state.retryQueue.forEach(item => {
        // Retry failed requests
        setTimeout(() => {
          dispatch({ type: actionTypes.REMOVE_FROM_RETRY_QUEUE, payload: item.id });
        }, 1000);
      });
    };

    const handleOffline = () => {
      dispatch({ type: actionTypes.SET_ONLINE_STATUS, payload: false });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [state.retryQueue]);

  // Action creators
  const actions = {
    setUser: (user) => dispatch({ type: actionTypes.SET_USER, payload: user }),
    updateLoanApplication: (data) => dispatch({ type: actionTypes.UPDATE_LOAN_APPLICATION, payload: data }),
    setLanguage: (language) => dispatch({ type: actionTypes.SET_LANGUAGE, payload: language }),
    addNotification: (notification) => dispatch({ 
      type: actionTypes.ADD_NOTIFICATION, 
      payload: { ...notification, id: Date.now() } 
    }),
    removeNotification: (id) => dispatch({ type: actionTypes.REMOVE_NOTIFICATION, payload: id }),
    addToRetryQueue: (request) => dispatch({ 
      type: actionTypes.ADD_TO_RETRY_QUEUE, 
      payload: { ...request, id: Date.now() } 
    }),
    updateAnalytics: (data) => dispatch({ type: actionTypes.UPDATE_ANALYTICS, payload: data }),
    resetApplication: () => dispatch({ type: actionTypes.RESET_APPLICATION })
  };

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use the context
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

export { actionTypes };
