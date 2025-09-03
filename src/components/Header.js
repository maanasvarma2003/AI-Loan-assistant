import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu as Menu, FiX as X, FiUser as User, FiBell as Bell, FiHelpCircle as HelpCircle, FiShield as Shield, FiHome as Home, FiCreditCard as CreditCard, FiBarChart2 as BarChart3, FiFileText as FileText } from 'react-icons/fi';
import { FaRupeeSign as Rupee } from 'react-icons/fa';
import { useApp } from '../context/AppContext';

const Header = ({ language, setLanguage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { state } = useApp();
  const location = useLocation();

  const translations = {
    en: {
      home: 'Home',
      apply: 'Apply for Loan',
      dashboard: 'Dashboard',
      help: 'Help',
      security: 'Security',
      analytics: 'Analytics',
      profile: 'Profile',
      notifications: 'Notifications'
    },
    hi: {
      home: 'होम',
      apply: 'लोन के लिए आवेदन',
      dashboard: 'डैशबोर्ड',
      help: 'सहायता',
      security: 'सुरक्षा',
      analytics: 'विश्लेषण',
      profile: 'प्रोफ़ाइल',
      notifications: 'सूचनाएं'
    }
  };

  const t = translations[language] || translations.en;

  const navigation = [
    { name: t.home, href: '/', icon: Home },
    { name: t.apply, href: '/apply', icon: CreditCard },
    { name: t.dashboard, href: '/dashboard', icon: BarChart3 },
    { name: t.help, href: '/help', icon: HelpCircle },
    { name: t.security, href: '/security', icon: Shield },
    { name: t.analytics, href: '/analytics', icon: FileText }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white/80 backdrop-blur-sm supports-[backdrop-filter]:bg-white/70 sticky top-0 z-50 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <Rupee className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900">RuralLend</span>
                <span className="text-xs text-gray-500">AI Loan Assistant</span>
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-2">
                  {item.icon && <item.icon className="w-4 h-4" />}
                  <span>{item.name}</span>
                </div>
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button
              className="relative p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label={t.notifications}
            >
              <Bell className="w-5 h-5" />
              {state.notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {state.notifications.length}
                </span>
              )}
            </button>

            <button
              className="flex items-center space-x-2 p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label={t.profile}
            >
              <User className="w-5 h-5" />
              {state.user && (
                <span className="hidden sm:block text-sm font-medium">
                  {state.user.name}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <nav className="px-4 py-2 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  {item.icon && <item.icon className="w-5 h-5" />}
                  <span>{item.name}</span>
                </div>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
