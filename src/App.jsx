import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";
import "./App.css";

const targetQrCode = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

function App() {
  const [scanResult, setScanResult] = useState(null);
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [presented, setPresented] = useState(false);
  const [scanDate, setScanDate] = useState('');
  const [scanTime, setScanTime] = useState('');

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    scanner.render(success, error);

    function success(result) {
      scanner.clear();
      setScanResult(result);

      if (result === targetQrCode) {
        setShowForm(true);
      }
    }

    function error(err) {
      console.warn(err);
    }
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleRollNumberChange = (e) => {
    setRollNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPresented(true);
    setShowForm(false);

    const now = new Date();
    setScanDate(now.toLocaleDateString());
    setScanTime(now.toLocaleTimeString());
  };

  return (
    <>
      <div className="Heading">
        <h1>QR Code Scanner</h1>
        {scanResult ? (
          <div>
            {showForm ? (
              <form className="Form" onSubmit={handleSubmit}>
                <div className="FormGroup">
                  <label>
                    Name:
                    <input type="text" value={name} onChange={handleNameChange} required />
                  </label>
                </div>
                <div className="FormGroup">
                  <label>
                    Roll Number:
                    <input type="text" value={rollNumber} onChange={handleRollNumberChange} required />
                  </label>
                </div>
                <button type="submit">Submit</button>
              </form>
            ) : (
              presented && (
                <div className="FormOutput">
                  <p>Presented</p>
                  <p>Name: {name}</p>
                  <p>Roll Number: {rollNumber}</p>
                  {scanDate && <p>Date: {scanDate}</p>}
                  {scanTime && <p>Time: {scanTime}</p>}
                </div>
              )
            )}
          </div>
        ) : (
          <div id="reader"></div>
        )}
      </div>
    </>
  );
}

export default App;
