import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MCQList from '../../components/admin/MCQList';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Alert from '../../components/common/Alert';
import { useMCQ } from '../../context/MCQContext';

const Dashboard = () => {
  const { mcqs, loading, error, fetchMCQs, deleteMCQ, toggleMCQPublish } = useMCQ();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [mcqToDelete, setMcqToDelete] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState('');

  // Fetch all MCQs when component mounts
  useEffect(() => {
    fetchMCQs();
  }, [fetchMCQs]);

  const handleDeleteConfirm = (mcqId) => {
    setMcqToDelete(mcqId);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await deleteMCQ(mcqToDelete);
      setShowDeleteModal(false);
      setMcqToDelete(null);
      setStatusMessage('Question deleted successfully');
      setStatusType('success');
      
      // Clear status message after 3 seconds
      setTimeout(() => {
        setStatusMessage('');
      }, 3000);
    } catch (err) {
      setStatusMessage(`Failed to delete question: ${err.message}`);
      setStatusType('error');
    }
  };
  
  const handleTogglePublish = async (mcqId, isPublished) => {
    try {
      await toggleMCQPublish(mcqId, isPublished);
      setStatusMessage(`Question ${isPublished ? 'published' : 'unpublished'} successfully`);
      setStatusType('success');
      
      // Clear status message after 3 seconds
      setTimeout(() => {
        setStatusMessage('');
      }, 3000);
    } catch (err) {
      setStatusMessage(`Failed to update question: ${err.message}`);
      setStatusType('error');
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
        <Link to="/admin/create-mcq">
          <Button>
            Create New Question
          </Button>
        </Link>
      </div>
      
      {statusMessage && (
        <Alert 
          type={statusType} 
          message={statusMessage} 
          onDismiss={() => setStatusMessage('')} 
          className="mb-4"
        />
      )}
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-6">
          Manage Questions
        </h2>
        
        <MCQList 
          mcqs={mcqs} 
          loading={loading} 
          error={error}
          onEdit={(mcq) => window.location.href = `/admin/edit-mcq/${mcq.id}`}
          onDelete={handleDeleteConfirm}
          onTogglePublish={handleTogglePublish}
        />
      </div>
      
      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirm Deletion"
      >
        <div className="mb-6">
          <p className="text-gray-700 dark:text-gray-300">
            Are you sure you want to delete this question? This action cannot be undone.
          </p>
        </div>
        <div className="flex justify-end space-x-2">
          <Button 
            variant="outline" 
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;