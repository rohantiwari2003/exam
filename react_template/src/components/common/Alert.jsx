import React from 'react';

const alertStyles = {
  error: 'bg-red-100 border-red-400 text-red-700 dark:bg-red-900/50 dark:border-red-600 dark:text-red-400',
  success: 'bg-green-100 border-green-400 text-green-700 dark:bg-green-900/50 dark:border-green-600 dark:text-green-400',
  warning: 'bg-yellow-100 border-yellow-400 text-yellow-700 dark:bg-yellow-900/50 dark:border-yellow-600 dark:text-yellow-400',
  info: 'bg-blue-100 border-blue-400 text-blue-700 dark:bg-blue-900/50 dark:border-blue-600 dark:text-blue-400',
};

const Alert = ({ type = 'error', message, className = '', onDismiss }) => {
  if (!message) return null;
  
  return (
    <div className={`border-l-4 p-4 mb-4 rounded ${alertStyles[type]} ${className}`} role="alert">
      <div className="flex items-center">
        <div className="flex-grow">
          <p>{message}</p>
        </div>
        {onDismiss && (
          <button 
            onClick={onDismiss}
            className="ml-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 p-1.5 inline-flex h-8 w-8 hover:bg-opacity-25 focus:outline-none focus:ring-offset-1 dark:focus:ring-offset-gray-800"
            aria-label="Close"
          >
            <span className="sr-only">Dismiss</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;