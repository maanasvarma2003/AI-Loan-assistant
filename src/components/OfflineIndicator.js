import React from 'react';
import { FiWifiOff as WifiOff, FiRefreshCw as RefreshCw } from 'react-icons/fi';

const OfflineIndicator = () => {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="offline-indicator flex items-center justify-between px-4 py-2 bg-yellow-500 text-yellow-900">
      <div className="flex items-center space-x-2">
        <WifiOff className="w-4 h-4" />
        <span className="text-sm font-medium">
          No internet connection. Your data is being saved locally.
        </span>
      </div>
      
      <button
        onClick={handleRetry}
        className="flex items-center space-x-1 text-sm hover:underline"
        aria-label="Retry connection"
      >
        <RefreshCw className="w-3 h-3" />
        <span>Retry</span>
      </button>
    </div>
  );
};

export default OfflineIndicator;
