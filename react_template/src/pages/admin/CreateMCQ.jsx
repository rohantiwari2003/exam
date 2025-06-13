import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MCQForm from '../../components/admin/MCQForm';
import Alert from '../../components/common/Alert';
import Button from '../../components/common/Button';
import { useMCQ } from '../../context/MCQContext';

const CreateMCQ = () => {
  const { createMCQ } = useMCQ();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (mcqData) => {
    setIsSubmitting(true);
    try {
      await createMCQ(mcqData);
      setStatusMessage('Question created successfully!');
      setStatusType('success');
      
      // Redirect to dashboard after short delay
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1500);
    } catch (err) {
      setStatusMessage(`Failed to create question: ${err.message}`);
      setStatusType('error');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create New Question</h1>
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
        <MCQForm 
          onSubmit={handleSubmit} 
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default CreateMCQ;