import React, { useState } from 'react';
import { FiGlobe as Globe, FiCheck as Check } from 'react-icons/fi';

const LanguageSelector = ({ currentLanguage, onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', native: 'English', emoji: '🇬🇧', color: 'bg-blue-100 text-blue-600' },
    { code: 'hi', name: 'Hindi', native: 'हिंदी', emoji: '🇮🇳', color: 'bg-orange-100 text-orange-600' },
    { code: 'bn', name: 'Bengali', native: 'বাংলা', emoji: '📖', color: 'bg-green-100 text-green-600' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు', emoji: '🎭', color: 'bg-purple-100 text-purple-600' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்', emoji: '🎨', color: 'bg-red-100 text-red-600' },
    { code: 'mr', name: 'Marathi', native: 'मराठी', emoji: '🎪', color: 'bg-yellow-100 text-yellow-600' },
    { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', emoji: '🏛️', color: 'bg-indigo-100 text-indigo-600' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', emoji: '🎵', color: 'bg-pink-100 text-pink-600' },
    { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ', emoji: '🌺', color: 'bg-teal-100 text-teal-600' },
    { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', emoji: '🎶', color: 'bg-cyan-100 text-cyan-600' }
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  const handleLanguageSelect = (languageCode) => {
    onLanguageChange(languageCode);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white shadow-lg rounded-full p-3 flex items-center space-x-2 border border-gray-200 hover:shadow-xl transition-shadow duration-200"
          aria-label="Select language"
        >
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${currentLang.color}`}>
            {currentLang.emoji}
          </div>
          <span className="text-sm font-medium text-gray-700 hidden sm:block">
            {currentLang.native}
          </span>
        </button>

        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-25 z-40"
              onClick={() => setIsOpen(false)}
            />
            {/* Language menu */}
            <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[200px] z-50">
              <div className="px-4 py-2 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900">Select Language</h3>
                <p className="text-xs text-gray-500">भाषा चुनें</p>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageSelect(language.code)}
                    className={`w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center transition-colors duration-150 ${
                      currentLanguage === language.code ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3 ${language.color}`}>
                      {language.emoji}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">
                        {language.native}
                      </div>
                      <div className="text-xs text-gray-500">
                        {language.name}
                      </div>
                    </div>
                    {currentLanguage === language.code && (
                      <Check className="w-4 h-4 text-blue-600 ml-2" />
                    )}
                  </button>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
                <p className="text-xs text-gray-600 text-center">More languages coming soon</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LanguageSelector;
