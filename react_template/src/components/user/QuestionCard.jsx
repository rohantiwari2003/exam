import React, { useState } from 'react';
import AnswerOption from './AnswerOption';
import Button from '../common/Button';

const QuestionCard = ({ question, onAnswerSubmit, userAnswers = {}, showResults = false }) => {
  const [selectedOption, setSelectedOption] = useState(userAnswers[question.id] || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleOptionSelect = (option) => {
    if (!showResults) {
      setSelectedOption(option);
      setError('');
    }
  };

  const handleSubmit = () => {
    if (!selectedOption) {
      setError('Please select an answer.');
      return;
    }

    setIsSubmitting(true);
    onAnswerSubmit(question.id, selectedOption)
      .then(() => {
        setIsSubmitting(false);
      })
      .catch(() => {
        setError('Failed to submit answer. Please try again.');
        setIsSubmitting(false);
      });
  };

  const isCorrect = showResults && selectedOption === question.correctAnswer;
  const isIncorrect = showResults && selectedOption && selectedOption !== question.correctAnswer;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 mb-6">
      <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
        {question.title}
      </h3>

      {error && (
        <div className="mb-4 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => (
          <AnswerOption
            key={index}
            option={option}
            selected={selectedOption === option}
            onSelect={() => handleOptionSelect(option)}
            disabled={showResults}
            isCorrect={showResults && option === question.correctAnswer}
            isSelected={option === selectedOption}
          />
        ))}
      </div>

      {showResults ? (
        <div className={`p-3 rounded-md ${
          isCorrect 
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
            : isIncorrect 
              ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
        }`}>
          {isCorrect ? (
            <p>Correct! Well done.</p>
          ) : isIncorrect ? (
            <p>
              Incorrect. The correct answer is: <span className="font-medium">{question.correctAnswer}</span>
            </p>
          ) : (
            <p>You didn't answer this question.</p>
          )}
        </div>
      ) : (
        <div className="flex justify-end">
          <Button 
            onClick={handleSubmit} 
            disabled={!selectedOption || isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Answer'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;