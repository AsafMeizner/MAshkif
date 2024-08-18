import React from 'react';
import Modal from 'react-modal';

const ScanModal = ({ isOpen, handleCloseModal, decodedContent, handleSave }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      className="modal"
      overlayClassName="overlay"
    >
      <div className="modal-content">
        <h2>Scanned Content</h2>
        {decodedContent?.error ? (
          <>
            <p>
              <strong>Error:</strong> {decodedContent.error}
            </p>
            <p>
              <strong>Raw Content:</strong> {decodedContent.raw}
            </p>
          </>
        ) : (
          <>
            <p>
              <strong>Match Number:</strong> {decodedContent?.matchNumber}
            </p>
            <p>
              <strong>Team Number:</strong> {decodedContent?.teamNumber}
            </p>
            <p>
              <strong>Submission Time:</strong>{' '}
              {new Date(decodedContent?.submissionTime).toLocaleString()}
            </p>
          </>
        )}

        <div className="form-buttons">
          <button className="close-button" onClick={handleCloseModal}>
            Close
          </button>
          <button className="save-button" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ScanModal;
