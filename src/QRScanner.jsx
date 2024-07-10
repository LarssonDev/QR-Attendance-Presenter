// src/QRScanner.jsx

import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';

const QRScanner = () => {
  const [name, setName] = useState('');
  const [result, setResult] = useState('');
  const [showScanner, setShowScanner] = useState(false);

  const handleScan = (data) => {
    if (data) {
      console.log("Scanned Data: ", data.text);
      setResult(data.text);
      setShowScanner(false);
    }
  };

  const handleError = (err) => {
    console.error("QR Scanner Error: ", err);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Name: ${name}, Scanned Data: ${result}`);
    setResult('');
    setName('');
  };

  const openScanner = () => {
    setShowScanner(true);
  };

  const previewStyle = {
    height: 240,
    width: 320,
  };

  return (
    <div>
      <button onClick={openScanner}>Open QR Scanner</button>
      {showScanner && (
        <div>
          <QrScanner
            delay={300}
            style={previewStyle}
            onError={handleError}
            onScan={handleScan}
          />
        </div>
      )}
      {result && (
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input type="text" value={name} onChange={handleNameChange} required />
            </label>
            <button type="submit">Submit</button>
          </form>
          <p>Scanned Data: {result}</p>
        </div>
      )}
    </div>
  );
};

export default QRScanner;
