import React from 'react';
import Modal from 'react-modal';
import { QRCodeCanvas } from 'qrcode.react';
import { decompressAndDecode } from '../utils';

Modal.setAppElement('#root');

const ModalComponent = ({ isOpen, closeModal, qrContent }) => (
  <Modal isOpen={isOpen} onRequestClose={closeModal} className="modal" overlayClassName="overlay">
    <div className="modal-content">
      <QRCodeCanvas
        value={qrContent}
        size={256}
        level="L" 
        includeMargin={true} 
      />
      {/* <p>{qrContent}</p> */}
      <p>Decompressed and Decoded: {decompressAndDecode(qrContent)}</p>
      <button onClick={closeModal} className="close-button">Close</button>
    </div>
  </Modal>
);

export default ModalComponent;

const PrincessModalComponent = ({ isOpen, closeModal, qrContent }) => (
  <Modal isOpen={isOpen} onRequestClose={closeModal} className="modal" overlayClassName="overlay">
    <div className="modal-content">
      <QRCodeCanvas
        value={qrContent}
        size={256}
        level="L" 
        includeMargin={true} 
      />
      {/* <p>{qrContent}</p> */}
      <p>Decompressed and Decoded: {decompressAndDecode(qrContent)}</p>
      <button onClick={closeModal} className="close-button">Close</button>
    </div>
  </Modal>
);

export {PrincessModalComponent};