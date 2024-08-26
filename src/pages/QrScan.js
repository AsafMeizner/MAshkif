import React, { useState, useEffect } from 'react';
import { BarcodeScanner, BarcodeFormat } from '@capacitor-mlkit/barcode-scanning';
import Modal from 'react-modal';
import '../App.css';
import ScanButton from '../components/ScanComponents/ScanButton';
import CameraWarning from '../components/ScanComponents/CameraWarning';
import ScanModal from '../components/ScanComponents/ScanModal';
import HapticFeedback from '../components/HapticFeedback'; 
import { compressAndEncode, decompressAndDecode } from '../components/utils';

Modal.setAppElement('#root');

function QrScannerPage() {
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
          <ScanButton isScanning={isScanning} startScan={startScan} stopScan={stopScan} />
        ) : (
          <CameraWarning />
        )}
      </div>

      {decodedContent && <HapticFeedback />} 

      <ScanModal
        isOpen={modalIsOpen}
        handleCloseModal={handleCloseModal}
        decodedContent={decodedContent}
        handleSave={handleSave}
      />
    </div>
  );
}

export default QrScannerPage;
