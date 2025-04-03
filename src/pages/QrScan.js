import React, { useState, useEffect } from 'react';
import { BarcodeScanner, BarcodeFormat } from '@capacitor-mlkit/barcode-scanning';
import Modal from 'react-modal';
import { useZxing } from 'react-zxing';
import '../App.css';
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
    <div className="qr-scanner-page" style={{ 
      height: '100vh', 
      width: '100vw', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'flex-start', 
      alignItems: 'center', 
      backgroundColor: '#111217', 
      position: 'relative', 
      overflow: 'auto' // Allow scrolling if needed
    }}>
      <div className="qr-scanner-container" style={{
        marginTop: '5%', 
        textAlign: 'center',
        padding: '15px',
        backgroundColor: '#181b1f',
        borderRadius: '15px',
        boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)',
        width: '90vw',
        maxWidth: '400px',
        boxSizing: 'border-box',
        zIndex: 5
      }}>
        <h1 className="qr-scanner-title" style={{ 
          color: '#e74c3c', 
          marginBottom: '15px', 
          fontSize: '22px' // Slightly smaller
        }}>QR Code Scanner</h1>
        <div className="scan-options">
          {cameraAvailable && (
            <div className="mode-toggle" style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '15px', // Reduced from 20px
              backgroundColor: '#181b1f',
              padding: '8px', // Reduced from 10px
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                margin: '0 8px', // Reduced from 10px
                padding: '6px 10px', // Reduced from 8px 12px
                borderRadius: '6px',
                backgroundColor: useNative ? '#e74c3c' : 'transparent',
                color: useNative ? 'white' : '#e74c3c',
                border: '1px solid #e74c3c',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontSize: '14px' // Smaller font
              }}>
                <input
                  type="radio"
                  name="scanMode"
                  checked={useNative}
                  onChange={() => setUseNative(true)}
                  style={{ marginRight: '6px' }} // Reduced from 8px
                />
                Native Scan
              </label>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                margin: '0 8px', // Reduced from 10px
                padding: '6px 10px', // Reduced from 8px 12px
                borderRadius: '6px',
                backgroundColor: !useNative ? '#e74c3c' : 'transparent',
                color: !useNative ? 'white' : '#e74c3c',
                border: '1px solid #e74c3c',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontSize: '14px' // Smaller font
              }}>
                <input
                  type="radio"
                  name="scanMode"
                  checked={!useNative}
                  onChange={() => setUseNative(false)}
                  style={{ marginRight: '6px' }} // Reduced from 8px
                />
                Web Scan
              </label>
            </div>
          )}
          {/* Inline scan button */}
          <button 
            className="scan-button" 
            onClick={isScanning ? stopScan : startScan}
            style={{
              padding: '8px 16px', // Reduced padding
              fontSize: '16px' // Smaller font
            }}
          >
            {isScanning ? 'Stop Scanning' : 'Start Scanning'}
          </button>
        </div>
        
        {/* Always show camera selection for web mode, even if there's only one camera */}
        {!useNative && (
          <div className="device-selector" style={{
            marginTop: '10px', // Reduced from 15px
            marginBottom: '10px', // Reduced from 15px
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#181b1f',
            padding: '8px', // Reduced from 10px
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
          }}>
            <label htmlFor="videoDeviceSelect" style={{
              marginBottom: '5px', // Reduced from 8px
              color: '#e74c3c',
              fontWeight: 'bold',
              fontSize: '14px' // Smaller font
            }}>Select Camera: </label>
            <select
              id="videoDeviceSelect"
              className="device-select"
              value={selectedDeviceId || ''}
              onChange={(e) => setSelectedDeviceId(e.target.value)}
              style={{
                padding: '6px 10px', // Reduced from 8px 12px
                borderRadius: '6px',
                border: '1px solid #e74c3c',
                backgroundColor: '#111217',
                color: 'white',
                width: '80%',
                maxWidth: '300px',
                cursor: 'pointer',
                fontSize: '14px' // Smaller font
              }}
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

      {/* Fallback scanner rendered when native scanning is not used */}
      {(!useNative && isScanning) && (
        <div 
          className="fallback-scanner-container" 
          style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            width: '100%', 
            maxWidth: '600px', 
            margin: '10px auto', // Reduced from 20px
            position: 'relative',
            flex: '1',
            minHeight: '0' // Allow container to shrink
          }}
        >
          <video
            ref={scannerRef}
            className="fallback-video"
            autoPlay
            playsInline
            muted
            style={{
              width: '100%',
              maxHeight: '60vh', // Reduced from 70vh
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
            }}
          />
          
          {/* Scanner controls */}
          <div style={{
            position: 'absolute',
            bottom: '10px', // Reduced from 20px
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '8px', // Reduced from 10px
            zIndex: 10
          }}>
            <button 
              onClick={toggleFlashlight}
              style={{
                backgroundColor: flashlightOn ? '#e74c3c' : '#181b1f',
                color: 'white',
                border: '1px solid #e74c3c',
                borderRadius: '50%',
                width: '36px', // Reduced from 40px
                height: '36px', // Reduced from 40px
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                fontSize: '16px' // Smaller font
              }}
            >
              {flashlightOn ? '💡' : '🔦'}
            </button>
            <button 
              onClick={toggleScanningGuide}
              style={{
                backgroundColor: showScanningGuide ? '#e74c3c' : '#181b1f',
                color: 'white',
                border: '1px solid #e74c3c',
                borderRadius: '50%',
                width: '36px', // Reduced from 40px
                height: '36px', // Reduced from 40px
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                fontSize: '16px' // Smaller font
              }}
            >
              {showScanningGuide ? '👁️' : '👁️‍🗨️'}
            </button>
            <button 
              onClick={toggleTips}
              style={{
                backgroundColor: showTips ? '#e74c3c' : '#181b1f',
                color: 'white',
                border: '1px solid #e74c3c',
                borderRadius: '50%',
                width: '36px', // Reduced from 40px
                height: '36px', // Reduced from 40px
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                fontSize: '16px' // Smaller font
              }}
            >
              {showTips ? '💡' : '❓'}
            </button>
          </div>
          
          {/* Scanning guide overlay */}
          {showScanningGuide && (
            <div 
              className="scanner-overlay"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                pointerEvents: 'none'
              }}
            >
              <div 
                style={{
                  width: '70%',
                  height: '70%',
                  border: '2px solid #e74c3c',
                  borderRadius: '8px',
                  boxShadow: '0 0 0 9999px rgba(0,0,0,0.5)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative'
                }}
              >
                <div 
                  style={{
                    width: '20px',
                    height: '20px',
                    border: '2px solid #e74c3c',
                    borderRadius: '50%'
                  }}
                />
                <div 
                  style={{
                    position: 'absolute',
                    top: '-30px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#e74c3c',
                    color: 'white',
                    padding: '5px 10px',
                    borderRadius: '4px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }}
                >
                  Scanning...
                </div>
              </div>
            </div>
          )}
          
          {/* Scanning tips */}
          {showTips && (
            <div style={{
              position: 'absolute',
              top: '10px', // Reduced from 20px
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(0,0,0,0.7)',
              color: 'white',
              padding: '8px 12px', // Reduced from 10px 15px
              borderRadius: '8px',
              fontSize: '12px', // Reduced from 14px
              maxWidth: '80%',
              textAlign: 'center',
              zIndex: 10
            }}>
              <p style={{ margin: '0 0 3px 0' }}>Tips for better scanning:</p>
              <ul style={{ margin: '0', paddingLeft: '20px', textAlign: 'left' }}>
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