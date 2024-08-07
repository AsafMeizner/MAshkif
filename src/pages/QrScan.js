import React, { useState, useEffect } from 'react';
import { BarcodeScanner, BarcodeFormat } from '@capacitor-mlkit/barcode-scanning';
import Modal from 'react-modal';
import '../App.css';

Modal.setAppElement('#root');

const LZUTF8 = require('lzutf8');

const decompressAndDecode = (content) => {
  try {
    return LZUTF8.decompress(content, { inputEncoding: 'Base64', outputEncoding: 'String' });
  } catch (error) {
    console.error('Decompression error:', error);
    return null;
  }
};

const compressAndEncode = (content) => {
  return LZUTF8.compress(content, { outputEncoding: 'Base64' });
};

function QrScan() {
  const [cameraAvailable, setCameraAvailable] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [decodedContent, setDecodedContent] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [, setRawContent] = useState(null);

  useEffect(() => {
    const checkSupport = async () => {
      const { supported } = await BarcodeScanner.isSupported();
      setCameraAvailable(supported);
    };

    checkSupport();
    const savedSubmissions = JSON.parse(localStorage.getItem('submissions')) || [];
    setSubmissions(savedSubmissions);
  }, []);

  const startScan = async () => {
    try {
      const status = await BarcodeScanner.requestPermissions();
      if (status.camera === 'granted') {
        setIsScanning(true);
        document.querySelector('body')?.classList.add('barcode-scanner-active');

        const listener = await BarcodeScanner.addListener('barcodeScanned', async result => {
          const scannedContent = result.barcode.displayValue;
          console.log('Scanned Content:', scannedContent);

          setRawContent(scannedContent);

          const decodedData = decompressAndDecode(scannedContent);

          if (decodedData) {
            try {
              const parsedData = JSON.parse(decodedData);
              console.log('Parsed Data:', parsedData);

              if (parsedData && parsedData.submissionTime) {
                setDecodedContent(parsedData);
              } else {
                console.warn('Invalid QR content structure');
                setDecodedContent({ error: 'Invalid structure', raw: decodedData });
              }
            } catch (error) {
              console.error('Error parsing QR content:', error);
              setDecodedContent({ error: 'Parsing error', raw: decodedData });
            }
          } else {
            setDecodedContent({ error: 'Decompression error', raw: scannedContent });
          }

          setModalIsOpen(true);

          await listener.remove();
          stopScan();
        });

        await BarcodeScanner.startScan({
          formats: [BarcodeFormat.QrCode],
          lensFacing: 'BACK',
        });
      } else {
        alert('Camera permission is required to scan QR codes');
      }
    } catch (error) {
      console.error('Error starting scan:', error);
    }
  };

  const stopScan = async () => {
    document.querySelector('body')?.classList.remove('barcode-scanner-active');
    await BarcodeScanner.removeAllListeners();
    await BarcodeScanner.stopScan();
    setIsScanning(false);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setDecodedContent(null);
    setRawContent(null);
  };

  const handleSave = () => {
    if (decodedContent) {
      const newContent = compressAndEncode(JSON.stringify(decodedContent));
      const newSubmissions = [...submissions, newContent];
      setSubmissions(newSubmissions);
      localStorage.setItem('submissions', JSON.stringify(newSubmissions));
    }
    handleCloseModal();
  };

  return (
    <div className="qr-scanner-page">
      <div className="qr-scanner-container">
        <h1 className="qr-scanner-title">QR Code Scanner</h1>
        {cameraAvailable ? (
          <div>
            {isScanning ? (
              <button className="scan-button" onClick={stopScan}>
                Stop Scanning
              </button>
            ) : (
              <button className="scan-button" onClick={startScan}>
                Start Scanning
              </button>
            )}
          </div>
        ) : (
          <p className="camera-warning">Camera not supported on this device.</p>
        )}
      </div>

      <Modal
        isOpen={modalIsOpen}
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
    </div>
  );
}

export default QrScan;
