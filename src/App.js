import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Header from './components/Header';
import HomePage from './components/HomePage';
import LoanApplication from './components/LoanApplication';
import AIUnderwriting from './components/AIUnderwriting';
import Dashboard from './components/Dashboard';
import SuccessPage from './components/SuccessPage';
import OfflineIndicator from './components/OfflineIndicator';
import LanguageSelector from './components/LanguageSelector';
import HelpCenter from './components/HelpCenter';
import SecurityCenter from './components/SecurityCenter';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import Footer from './components/Footer';


// Context for global state management
import { AppProvider } from './context/AppContext';

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <AppProvider>
      <Router>
        <div className="App min-h-screen bg-gray-50 flex flex-col">
          {!isOnline && <OfflineIndicator />}
          
          <Header language={language} setLanguage={setLanguage} />
          
          <main className="pb-safe flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/apply" element={<LoanApplication />} />
              <Route path="/ai-underwriting" element={<AIUnderwriting />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/success" element={<SuccessPage />} />
              <Route path="/help" element={<HelpCenter />} />
              <Route path="/security" element={<SecurityCenter />} />
              <Route path="/analytics" element={<AnalyticsDashboard />} />
            </Routes>
          </main>

          <Footer />

          <LanguageSelector 
            currentLanguage={language} 
            onLanguageChange={setLanguage} 
          />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
