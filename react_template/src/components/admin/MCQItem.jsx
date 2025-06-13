import React, { useState } from 'react';
import Button from '../common/Button';
import Modal from '../common/Modal';

const MCQItem = ({ mcq, onEdit, onDelete, onTogglePublish }) => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = () => {
    onDelete(mcq.id);
    setShowDeleteModal(false);
  };

  const togglePublish = () => {
    onTogglePublish(mcq.id, !mcq.isPublished);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 transition-all duration-200 hover:shadow-md">
      <div className="flex flex-col sm:flex-row justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
            {mcq.title}
          </h3>
          <div className="flex items-center mt-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              mcq.isPublished 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
            }`}>
              {mcq.isPublished ? 'Published' : 'Draft'}
            </span>
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
              {mcq.options.length} options
            </span>
          </div>
        </div>

        <div className="mt-3 sm:mt-0 flex flex-wrap gap-2 items-center">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowDetailsModal(true)}
          >
            View
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(mcq)}
          >
            Edit
          </Button>
          <Button
            variant={mcq.isPublished ? "warning" : "success"}
            size="sm"
            onClick={togglePublish}
          >
            {mcq.isPublished ? 'Unpublish' : 'Publish'}
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => setShowDeleteModal(true)}
          >
            Delete
          </Button>
        </div>
      </div>

      {/* Details Modal */}
      <Modal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        title={mcq.title}
      >
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Options:</h4>
            <ul className="list-disc list-inside space-y-1">
              {mcq.options.map((option, index) => (
                <li 
                  key={index} 
                  className={`${option === mcq.correctAnswer ? 'font-medium text-green-600 dark:text-green-400' : ''}`}
                >
                  {option} {option === mcq.correctAnswer && '(Correct Answer)'}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
            <Button onClick={() => setShowDetailsModal(false)} size="sm">
              Close
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Question"
      >
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            Are you sure you want to delete this question? This action cannot be undone.
          </p>
          
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setShowDeleteModal(false)}
              size="sm"
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
              size="sm"
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MCQItem;