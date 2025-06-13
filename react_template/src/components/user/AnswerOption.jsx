import React from 'react';

const AnswerOption = ({ option, selected, onSelect, disabled, isCorrect, isSelected }) => {
  let containerClasses = 'flex items-center p-3 rounded-md border transition-all';
  
  // Base styles
  if (disabled) {
    if (isCorrect) {
      containerClasses += ' border-green-500 bg-green-50 dark:bg-green-900/20';
    } else if (isSelected && !isCorrect) {
      containerClasses += ' border-red-500 bg-red-50 dark:bg-red-900/20';
    } else {
      containerClasses += ' border-gray-300 dark:border-gray-600';
    }
  } else {
    containerClasses += selected
      ? ' border-blue-500 bg-blue-50 dark:bg-blue-900/20'
      : ' border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-700';
  }
  
  return (
    <div 
      className={containerClasses}
      onClick={disabled ? undefined : onSelect}
      role={disabled ? undefined : 'button'}
    >
      <div className="mr-3">
        <div className={`w-5 h-5 rounded-full border ${
          selected 
            ? 'border-blue-500 dark:border-blue-400'
            : 'border-gray-400 dark:border-gray-500'
        } flex items-center justify-center`}>
          {selected && (
            <div className="w-3 h-3 rounded-full bg-blue-500 dark:bg-blue-400"></div>
          )}
        </div>
      </div>
      <div className="flex-1">{option}</div>
      {isCorrect && (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      )}
      {isSelected && !isCorrect && disabled && (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      )}
    </div>
  );
};

export default AnswerOption;