import { useState, useEffect } from 'react';
import Button from '../common/Button';
import Alert from '../common/Alert';

const MCQForm = ({ mcq = null, onSubmit, isSubmitting }) => {
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [error, setError] = useState('');

  // If editing, populate form with mcq data
  useEffect(() => {
    if (mcq) {
      setTitle(mcq.title || '');
      setOptions(mcq.options?.length ? mcq.options : ['', '', '', '']);
      setCorrectAnswer(mcq.correctAnswer || '');
      setIsPublished(mcq.isPublished || false);
    }
  }, [mcq]);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    if (options.length < 8) { // Limiting to 8 options max
      setOptions([...options, '']);
    }
  };

  const removeOption = (index) => {
    if (options.length > 2) { // Minimum 2 options
      const newOptions = [...options];
      newOptions.splice(index, 1);
      setOptions(newOptions);
      
      // If the deleted option was the correct answer, reset the correctAnswer
      if (options[index] === correctAnswer) {
        setCorrectAnswer('');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!title.trim()) {
      setError('Question title is required');
      return;
    }
    
    // Check for empty options
    if (options.some(option => !option.trim())) {
      setError('All options must be filled');
      return;
    }
    
    // Check for duplicate options
    const uniqueOptions = new Set(options.map(opt => opt.trim()));
    if (uniqueOptions.size !== options.length) {
      setError('Options must be unique');
      return;
    }
    
    if (!correctAnswer) {
      setError('Please select the correct answer');
      return;
    }
    
    // Submit form
    onSubmit({
      id: mcq?.id,
      title,
      options,
      correctAnswer,
      isPublished
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mb-6">
      {error && <Alert type="error" message={error} />}
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Question Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="Enter your question here"
          required
        />
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Options
          </label>
          <Button 
            type="button" 
            variant="outline" 
            size="xs" 
            onClick={addOption}
            disabled={options.length >= 8}
          >
            Add Option
          </Button>
        </div>
        
        <div className="space-y-3">
          {options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="radio"
                id={`option-${index}`}
                name="correctAnswer"
                checked={option === correctAnswer}
                onChange={() => setCorrectAnswer(option)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              />
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder={`Option ${index + 1}`}
                required
              />
              {options.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeOption(index)}
                  className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600"
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Publish this question
            </span>
          </label>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : (mcq ? 'Update Question' : 'Create Question')}
        </Button>
      </div>
    </form>
  );
};

export default MCQForm;