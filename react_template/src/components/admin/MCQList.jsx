import React from 'react';
import MCQItem from './MCQItem';
import Alert from '../common/Alert';

const MCQList = ({ mcqs, onEdit, onDelete, onTogglePublish, loading, error }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <Alert type="error" message={error} />;
  }

  if (!mcqs || mcqs.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
        <p className="text-gray-600 dark:text-gray-400">No questions created yet.</p>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
          Create your first multiple-choice question to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {mcqs.map(mcq => (
        <MCQItem 
          key={mcq.id} 
          mcq={mcq}
          onEdit={onEdit}
          onDelete={onDelete}
          onTogglePublish={onTogglePublish}
        />
      ))}
    </div>
  );
};

export default MCQList;