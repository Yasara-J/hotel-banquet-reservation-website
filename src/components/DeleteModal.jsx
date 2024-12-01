import React from 'react';

const DeleteModal = ({ showModal, handleClose, handleDelete }) => {
  return (
    <div
      className={`modal ${showModal ? 'show' : ''}`}
      style={{ display: showModal ? 'block' : 'none' }}
      tabIndex="-1"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Deletion</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <p className="delete-modal-txt">
              Are you sure you want to delete this reservation?
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
            >
              No
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
