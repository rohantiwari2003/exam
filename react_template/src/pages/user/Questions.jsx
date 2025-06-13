import React, { useState, useEffect } from 'react';
import Alert from '../../components/common/Alert';
import QuestionCard from '../../components/user/QuestionCard';
import Button from '../../components/common/Button';
import { useMCQ } from '../../context/MCQContext';

const Questions = () => {
  const { getPublishedMCQs, submitAnswer } = useMCQ();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const data = await getPublishedMCQs();
        setQuestions(data);
      } catch (err) {
        setError(`Failed to fetch questions: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [getPublishedMCQs]);

  const handleAnswerSubmit = async (questionId, answer) => {
    try {
      // Store the user's answer
      const newAnswers = { ...userAnswers, [questionId]: answer };
      setUserAnswers(newAnswers);
      
      // Submit to backend
      await submitAnswer(questionId, answer);
      
      return true;
    } catch (err) {
      console.error('Error submitting answer:', err);
      return false;
    }
  };

  const handleViewResults = () => {
    // Calculate score
    let correctCount = 0;
    
    questions.forEach(question => {
      if (userAnswers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });
    
    setScore({
      correct: correctCount,
      total: questions.length,
      percentage: Math.round((correctCount / questions.length) * 100)
    });
    
    setShowResults(true);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetryQuiz = () => {
    setUserAnswers({});
    setShowResults(false);
    setScore({ correct: 0, total: 0 });
  };

  const answeredQuestionsCount = Object.keys(userAnswers).length;
  const allQuestionsAnswered = questions.length > 0 && answeredQuestionsCount === questions.length;

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <Alert type="error" message={error} />;
  }

  if (questions.length === 0) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            No Questions Available
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            There are currently no published questions available. Please check back later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Multiple Choice Questions
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Select the correct answer for each question below.
        </p>
      </div>

      {showResults && (
        <div className={`mb-8 p-6 rounded-lg shadow-md ${
          score.percentage >= 70 
            ? 'bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
            : score.percentage >= 40 
              ? 'bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800' 
              : 'bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
        }`}>
          <h2 className="text-2xl font-semibold mb-4">Your Results</h2>
          <div className="text-lg mb-2">
            Score: <span className="font-bold">{score.correct}</span> out of <span className="font-bold">{score.total}</span>
          </div>
          <div className="text-lg mb-4">
            Percentage: <span className="font-bold">{score.percentage}%</span>
          </div>
          <Button onClick={handleRetryQuiz}>Try Again</Button>
        </div>
      )}

      <div className="space-y-8">
        {questions.map(question => (
          <QuestionCard 
            key={question.id}
            question={question}
            onAnswerSubmit={handleAnswerSubmit}
            userAnswers={userAnswers}
            showResults={showResults}
          />
        ))}
      </div>

      {!showResults && questions.length > 0 && (
        <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow flex justify-between items-center">
          <div>
            <span className="font-medium">{answeredQuestionsCount}</span> of <span className="font-medium">{questions.length}</span> questions answered
          </div>
          <Button 
            disabled={!allQuestionsAnswered} 
            onClick={handleViewResults}
          >
            {allQuestionsAnswered ? 'View Results' : 'Answer All Questions'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Questions;