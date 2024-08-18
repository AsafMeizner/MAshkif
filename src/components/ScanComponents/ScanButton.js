import React from 'react';

const ScanButton = ({ isScanning, startScan, stopScan }) => {
  return (
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
  );
};

export default ScanButton;
