import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import MCQForm from '../../components/admin/MCQForm';
import Alert from '../../components/common/Alert';
import Button from '../../components/common/Button';
import { useMCQ } from '../../context/MCQContext';

const EditMCQ = () => {
  const { id } = useParams();
  const { getMCQ, updateMCQ } = useMCQ();
  const [mcq, setMcq] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState('');
  const navigate = useNavigate();

  // Fetch the MCQ to edit
  useEffect(() => {
    const fetchMCQ = async () => {
      setIsLoading(true);
      try {
        const mcqData = await getMCQ(id);
        if (!mcqData) {
          setError('Question not found');
        } else {
          setMcq(mcqData);
        }
      } catch (err) {
        setError(`Failed to fetch question: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMCQ();
  }, [id, getMCQ]);

  const handleSubmit = async (mcqData) => {
    setIsSubmitting(true);
    try {
      await updateMCQ(id, mcqData);
      setStatusMessage('Question updated successfully!');
      setStatusType('success');
      
      // Redirect to dashboard after short delay
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1500);
    } catch (err) {
      setStatusMessage(`Failed to update question: ${err.message}`);
      setStatusType('error');
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto py-8">
        <Alert type="error" message={error} />
        <div className="mt-4">
          <Link to="/admin/dashboard">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Question</h1>
        <Link to="/admin/dashboard">
          <Button variant="outline">
            Back to Dashboard
          </Button>
        </Link>
      </div>
      
      {statusMessage && (
        <Alert 
          type={statusType} 
          message={statusMessage} 
          onDismiss={() => setStatusMessage('')} 
          className="mb-6"
        />
      )}
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        {mcq && (
          <MCQForm 
            mcq={mcq} 
            onSubmit={handleSubmit} 
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  );
};

export default EditMCQ;