// filepath: /c:/Users/User/Documents/GitHub/scoutingApp/src/pages/QrScan.js
import React, { useState, useEffect } from 'react';
import { BarcodeScanner, BarcodeFormat } from '@capacitor-mlkit/barcode-scanning';
import Modal from 'react-modal';
import { useZxing } from 'react-zxing';
import '../App.css';
import ScanButton from '../components/ScanComponents/ScanButton'; // Un-commented!
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
  // scanning mode: true = native scan, false = fallback (web) scanning
  const [useNative, setUseNative] = useState(true);
  // video device selection for fallback scanning
  const [videoDevices, setVideoDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);

  const { ref: scannerRef } = useZxing({
    deviceId: selectedDeviceId,
    onDecodeResult: (result) => {
      processScannedContent(result.getText());
      setIsScanning(false);
    },
    onDecodeError: (error) => {
      // Optionally ignore decode errors.
    },
    onError: (error) => {
      console.error('react-zxing error:', error);
      toast.error('Error accessing camera.');
      setIsScanning(false);
    },
    paused: !isScanning,
    constraints: { video: { facingMode: 'environment' }, audio: false },
  });

  useEffect(() => {
    const checkSupport = async () => {
      const { supported } = await BarcodeScanner.isSupported();
      setCameraAvailable(supported);
      if (!supported) {
        setUseNative(false);
      }
    };
    checkSupport();

    const savedSubmissions = JSON.parse(localStorage.getItem('submissions')) || [];
    setSubmissions(savedSubmissions);

    if (navigator.mediaDevices?.enumerateDevices) {
      navigator.mediaDevices.enumerateDevices().then((devices) => {
        const videoInputs = devices.filter(device => device.kind === 'videoinput');
        setVideoDevices(videoInputs);
        if (videoInputs.length > 0) {
          setSelectedDeviceId(videoInputs[0].deviceId);
        }
      }).catch(err => console.error('Error enumerating devices', err));
    }
  }, []);

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

  const startScan = async () => {
    console.log('startScan triggered, useNative:', useNative, 'cameraAvailable:', cameraAvailable);
    if (useNative && cameraAvailable) {
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
        console.error('Error starting native scan:', error);
      }
    } else {
      // Activate fallback scanning via react-zxing.
      setIsScanning(true);
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
        <div className="scan-options">
          {cameraAvailable && (
            <div className="mode-toggle">
              <label>
                <input
                  type="radio"
                  name="scanMode"
                  checked={useNative}
                  onChange={() => setUseNative(true)}
                />
                Native Scan
              </label>
              <label>
                <input
                  type="radio"
                  name="scanMode"
                  checked={!useNative}
                  onChange={() => setUseNative(false)}
                />
                Web Scan
              </label>
            </div>
          )}
          {/* Use our ScanButton component */}
          <ScanButton isScanning={isScanning} startScan={startScan} stopScan={stopScan} />
        </div>
        {(!useNative && videoDevices.length > 1) && (
          <div className="device-selector">
            <label htmlFor="videoDeviceSelect">Select Camera: </label>
            <select
              id="videoDeviceSelect"
              value={selectedDeviceId || ''}
              onChange={(e) => setSelectedDeviceId(e.target.value)}
            >
              {videoDevices.map(device => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label || `Camera ${device.deviceId}`}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {decodedContent && <HapticFeedback />}

      <ScanModal
        isOpen={modalIsOpen}
        handleCloseModal={handleCloseModal}
        decodedContent={decodedContent}
        handleSave={handleSave}
      />

      {(!useNative && isScanning) && (
        <div className="fallback-scanner-container" style={{ width: '100%', maxWidth: '400px', margin: 'auto' }}>
          <video
            ref={scannerRef}
            style={{ width: '100%' }}
            autoPlay
            playsInline
            muted
          />
        </div>
      )}
    </div>
  );
}

export default QrScannerPage;