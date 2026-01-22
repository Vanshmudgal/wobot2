import React from 'react';
import { AlertTriangle } from 'lucide-react';
import './Hello.css'; // Ensure CSS is imported

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Warning Icon */}
        <div className="modal-icon-wrapper">
          <AlertTriangle size={24} strokeWidth={2} />
        </div>

        {/* Text */}
        <h3 className="modal-title">Delete Camera</h3>
        <p className="modal-description">
          Are you sure you want to delete this camera? This action cannot be undone.
        </p>

        {/* Buttons */}
        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-delete" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;