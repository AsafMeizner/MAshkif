import React, { useState, useEffect } from 'react';
import { BarcodeScanner, BarcodeFormat } from '@capacitor-mlkit/barcode-scanning';
import Modal from 'react-modal';
import jsQR from 'jsqr';
import '../App.css';
import ScanButton from '../components/ScanComponents/ScanButton';
import ScanModal from '../components/ScanComponents/ScanModal';
import HapticFeedback from '../components/HapticFeedback';
import { toast } from 'react-toastify';
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

  // Common processing for scanned content
  const processScannedContent = (scannedContent) => {
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
    toast.success('QR code scanned successfully!');
  };

  // Fallback scan using getUserMedia and jsQR
  const fallbackScan = async () => {
    setIsScanning(true);
    // Create a container for the video preview
    const videoContainer = document.createElement('div');
    videoContainer.className = 'video-preview-container';
    // You can add custom styling via CSS for .video-preview-container if needed
  
    const video = document.createElement('video');
    video.className = 'video-preview';
    // Adjust size as needed
    video.style.width = '100%';
    video.style.maxHeight = '400px';
    videoContainer.appendChild(video);
    document.body.appendChild(videoContainer);
  
    document.querySelector('body')?.classList.add('barcode-scanner-active');
  
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      video.srcObject = stream;
      await video.play();
  
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      let scanning = true;
  
      const scanLoop = () => {
        if (!scanning) return;
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, canvas.width, canvas.height);
          if (code) {
            scanning = false;
            processScannedContent(code.data);
            stream.getTracks().forEach((track) => track.stop());
            document.querySelector('body')?.classList.remove('barcode-scanner-active');
            setIsScanning(false);
            videoContainer.remove();
            return;
          }
        }
        requestAnimationFrame(scanLoop);
      };
  
      scanLoop();
    } catch (error) {
      console.error('Fallback scanning error:', error);
      toast.error('Error accessing camera for scanning.');
      setIsScanning(false);
      document.querySelector('body')?.classList.remove('barcode-scanner-active');
      videoContainer.remove();
    }
  };

  const startScan = async () => {
    // Use Capacitor MLKit when available; otherwise, fallback to web scanning
    if (cameraAvailable) {
      try {
        const status = await BarcodeScanner.requestPermissions();
        if (status.camera === 'granted') {
          setIsScanning(true);
          document.querySelector('body')?.classList.add('barcode-scanner-active');

          const listener = await BarcodeScanner.addListener('barcodeScanned', async result => {
            const scannedContent = result.barcode.displayValue;
            console.log('Scanned Content:', scannedContent);

            processScannedContent(scannedContent);

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
    } else {
      // Fallback for non-supported platforms (e.g., website)
      await fallbackScan();
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
      toast.success('Submission saved successfully!');
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
          // When the native API isn’t available, show a fallback scan button.
          <button onClick={startScan} className="fallback-scan-button">
            Start Web Scan
          </button>
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