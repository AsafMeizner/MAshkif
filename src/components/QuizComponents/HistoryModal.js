import React from 'react';
import Modal from 'react-modal';
import { decompressAndDecode } from '../utils';

const HistoryModal = ({ isOpen, closeModal, submissions, openQrModal, handleDelete, handleDeleteAll }) => (
  <Modal isOpen={isOpen} onRequestClose={closeModal} className="modal" overlayClassName="overlay">
    <div className="modal-content">
      <h2>Submission History</h2>
      <div className="history-content">
        {submissions.length === 0 ? (
          <p>No submissions found.</p>
        ) : (
          submissions.map((value, key) => {
            const decodedValue = JSON.parse(decompressAndDecode(value));
            return (
              <div key={key} className="submission-item">
                <p><strong>Match Number: </strong> {decodedValue.matchNumber} | ‎</p>
                <p><strong>Team Number: </strong> {decodedValue.teamNumber} | ‎</p>
                <p><strong>Submission Time: </strong> {new Date(decodedValue.submissionTime).toLocaleString()}‎ ‎</p>
                <button onClick={() => openQrModal(value)} className="view-button">View QR</button>
                <button onClick={() => handleDelete(key)} className="delete-button">Delete</button>
              </div>
            );
          })
        )}
      </div>
      <button onClick={handleDeleteAll} className="close-button" style={{marginLeft: "10px"}}>Delete All</button>
      <button onClick={closeModal} className="close-button" style={{marginLeft: "10px"}}>Close</button>
    </div>
  </Modal>
);

export default HistoryModal;
