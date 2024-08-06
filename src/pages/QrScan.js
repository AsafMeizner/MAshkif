import React, { useState, useEffect } from 'react';
import { BarcodeScanner, BarcodeFormat } from '@capacitor-mlkit/barcode-scanning';
import '../App.css';

function QrScarn() {
    const [barcodeContent, setBarcodeContent] = useState(null);
    const [cameraAvailable, setCameraAvailable] = useState(false);

    useEffect(() => {
        const checkSupport = async () => {
        const { supported } = await BarcodeScanner.isSupported();
        setCameraAvailable(supported);
        };

        checkSupport();
    }, []);

    const startScan = async () => {
        try {
            // Request camera permissions
            const status = await BarcodeScanner.requestPermissions();
            if (status.camera === 'granted') {
                document.querySelector('body')?.classList.add('barcode-scanner-active');

                const listener = await BarcodeScanner.addListener('barcodeScanned', async result => {
                setBarcodeContent(result.barcode.displayValue);
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
    };

  return (
    <div className="App">
        <h1>QR Code Scanner</h1>
        {cameraAvailable ? (
            <div>
                <button onClick={startScan}>Start Scanning</button>
                {barcodeContent && <p>Scanned Content: {barcodeContent}</p>}
            </div>
        ) : (
            <p>Camera not supported on this device.</p>
        )}
    </div>
  );
}

export default QrScarn;