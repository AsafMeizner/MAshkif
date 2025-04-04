import React, { useState, useEffect } from 'react';
import { BarcodeScanner, BarcodeFormat } from '@capacitor-mlkit/barcode-scanning';
import Modal from 'react-modal';
import { useZxing } from 'react-zxing';
import '../App.css';
import './QrScan.css';
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
  // flashlight state for web scanning
  const [flashlightOn, setFlashlightOn] = useState(false);
  // scanning guide state
  const [showScanningGuide, setShowScanningGuide] = useState(true);
  // tips visibility state
  const [showTips, setShowTips] = useState(true);
  // manual tips toggle state (to prevent auto-hide when manually toggled)
  const [manualTipsToggle, setManualTipsToggle] = useState(false);

  const { ref: scannerRef } = useZxing({
    deviceId: selectedDeviceId,
    onDecodeResult: (result) => {
      console.log('Decoded using react-zxing:', result.getText());
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
    constraints: { 
      video: { 
        facingMode: 'environment', 
        width: { ideal: 1920 },
        height: { ideal: 1080 },
        aspectRatio: { ideal: 1.777777778 }
      }, 
      audio: false 
    },
    // Add more scanning options for better performance
    timeBetweenDecodingAttempts: 100,
    maxScansPerSecond: 10,
  });

  useEffect(() => {
    const checkSupport = async () => {
      try {
        const { supported } = await BarcodeScanner.isSupported();
        console.log('Native BarcodeScanner supported:', supported);
        setCameraAvailable(supported);
        if (!supported) {
          setUseNative(false);
        }
      } catch (err) {
        console.error('Error checking native support:', err);
        setCameraAvailable(false);
        setUseNative(false);
      }
    };
    checkSupport();

    const savedSubmissions = JSON.parse(localStorage.getItem('submissions')) || [];
    setSubmissions(savedSubmissions);

    if (navigator.mediaDevices?.enumerateDevices) {
      navigator.mediaDevices.enumerateDevices().then((devices) => {
        const videoInputs = devices.filter(device => device.kind === 'videoinput');
        console.log('Available video devices:', videoInputs);
        setVideoDevices(videoInputs);
        
        // Try to find the main/back camera instead of defaulting to the first one
        // This helps avoid selecting ultra-wide cameras which are harder to scan with
        const mainCamera = videoInputs.find(device => 
          device.label.toLowerCase().includes('back') || 
          device.label.toLowerCase().includes('main') ||
          device.label.toLowerCase().includes('rear')
        );
        
        if (mainCamera) {
          setSelectedDeviceId(mainCamera.deviceId);
        } else if (videoInputs.length > 0) {
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
    console.log('startScan triggered. useNative:', useNative, 'cameraAvailable:', cameraAvailable);
    if (useNative && cameraAvailable) {
      try {
        const status = await BarcodeScanner.requestPermissions();
        console.log('Native requestPermissions status:', status);
        if (status.camera === 'granted') {
          setIsScanning(true);
          document.querySelector('body')?.classList.add('barcode-scanner-active');
          
          // Add a visual indicator for native scanning
          const indicator = document.createElement('div');
          indicator.className = 'native-scan-indicator';
          indicator.style.position = 'fixed';
          indicator.style.top = '20px';
          indicator.style.left = '50%';
          indicator.style.transform = 'translateX(-50%)';
          indicator.style.backgroundColor = '#e74c3c';
          indicator.style.color = 'white';
          indicator.style.padding = '8px 16px';
          indicator.style.borderRadius = '4px';
          indicator.style.zIndex = '9999';
          indicator.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
          indicator.style.fontWeight = 'bold';
          indicator.textContent = 'Native Scanner Active';
          document.body.appendChild(indicator);

          const listener = await BarcodeScanner.addListener('barcodeScanned', async result => {
            const scannedContent = result.barcode.displayValue;
            console.log('Scanned Content (native):', scannedContent);
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
      console.log('Starting fallback scan (react-zxing)');
      setIsScanning(true);
      
      // Auto-hide tips after 5 seconds if not manually toggled
      if (!manualTipsToggle) {
        setTimeout(() => {
          setShowTips(false);
        }, 5000);
      }
    }
  };

  const stopScan = async () => {
    console.log('Stop scan triggered');
    document.querySelector('body')?.classList.remove('barcode-scanner-active');
    
    // Remove the native scan indicator if it exists
    const indicator = document.querySelector('.native-scan-indicator');
    if (indicator) {
      indicator.remove();
    }
    
    try {
      await BarcodeScanner.removeAllListeners();
      await BarcodeScanner.stopScan();
    } catch (err) {
      console.error('Error stopping native scan:', err);
    }
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
      if (decodedContent.form === ':princess:') {
        const princessSubs = JSON.parse(localStorage.getItem('princessSubmissions')) || [];
        const newPrincessSubs = [...princessSubs, newContent];
        localStorage.setItem('princessSubmissions', JSON.stringify(newPrincessSubs));
        toast.success('Submission saved successfully to Princess Submissions!');
      } else {
        const newSubmissions = [...submissions, newContent];
        setSubmissions(newSubmissions);
        localStorage.setItem('submissions', JSON.stringify(newSubmissions));
        toast.success('Submission saved successfully!');
      }
    }
    handleCloseModal();
  };

  // Toggle flashlight for web scanning
  const toggleFlashlight = async () => {
    if (!scannerRef.current) return;
    
    try {
      const track = scannerRef.current.srcObject?.getVideoTracks()[0];
      if (!track) return;
      
      const capabilities = track.getCapabilities();
      if (capabilities.torch) {
        setFlashlightOn(!flashlightOn);
        await track.applyConstraints({
          advanced: [{ torch: !flashlightOn }]
        });
      } else {
        toast.info('Flashlight not supported on this device');
      }
    } catch (error) {
      console.error('Error toggling flashlight:', error);
      toast.error('Could not toggle flashlight');
    }
  };

  // Toggle scanning guide
  const toggleScanningGuide = () => {
    setShowScanningGuide(!showScanningGuide);
  };
  
  // Toggle tips visibility
  const toggleTips = () => {
    setShowTips(!showTips);
    setManualTipsToggle(true); // Mark as manually toggled
  };

  return (
    <div className="qr-scanner-page">
      <div className="qr-scanner-container">
        <h1 className="qr-scanner-title">QR Code Scanner</h1>
        <div className="scan-options">
          {cameraAvailable && (
            <div className="mode-toggle">
              <label className={useNative ? 'active' : ''}>
                <input
                  type="radio"
                  name="scanMode"
                  checked={useNative}
                  onChange={() => setUseNative(true)}
                />
                Native Scan
              </label>
              <label className={!useNative ? 'active' : ''}>
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
          <button 
            className="scan-button" 
            onClick={isScanning ? stopScan : startScan}
          >
            {isScanning ? 'Stop Scanning' : 'Start Scanning'}
          </button>
        </div>
        
        {!useNative && (
          <div className="device-selector">
            <label htmlFor="videoDeviceSelect">Select Camera: </label>
            <select
              id="videoDeviceSelect"
              className="device-select"
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
        <div className="fallback-scanner-container">
          <video
            ref={scannerRef}
            className="fallback-video"
            autoPlay
            playsInline
            muted
          />
          
          <div className="scanner-controls">
            <button 
              onClick={toggleFlashlight}
              className={`control-button ${flashlightOn ? 'active' : ''}`}
            >
              {flashlightOn ? '💡' : '🔦'}
            </button>
            <button 
              onClick={toggleScanningGuide}
              className={`control-button ${showScanningGuide ? 'active' : ''}`}
            >
              {showScanningGuide ? '👁️' : '👁️‍🗨️'}
            </button>
            <button 
              onClick={toggleTips}
              className={`control-button ${showTips ? 'active' : ''}`}
            >
              {showTips ? '💡' : '❓'}
            </button>
          </div>
          
          {showScanningGuide && (
            <div className="scanner-overlay">
              <div className="scanner-guide">
                <div className="scanner-center" />
                <div className="scanner-label">
                  Scanning...
                </div>
              </div>
            </div>
          )}
          
          {showTips && (
            <div className="scanner-tips">
              <p>Tips for better scanning:</p>
              <ul>
                <li>Hold steady and close to the QR code</li>
                <li>Ensure good lighting</li>
                <li>Try different angles if scanning fails</li>
                <li>Use the flashlight in low light</li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default QrScannerPage;