import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const QRCodeScanner: React.FC = () => {
  // State to hold the scanned QR code data
  const [scannedData, setScannedData] = useState<string | null>(null);

  useEffect(() => {
    const qrCodeScanner = new Html5QrcodeScanner(
      "qr-reader", // The ID of the div where the scanner will render
      {
        fps: 10, // Frames per second
        qrbox: { width: 250, height: 250 }, // Scanning box dimensions
      },
      false // Verbose mode (optional)
    );

    qrCodeScanner.render(
      (decodedText: string) => {
        console.log("Scanned QR code:", decodedText);
        setScannedData(decodedText); // Update state with scanned data
      },
      (error: any) => {
        console.error("Error scanning QR code:", error);
      }
    );

    // Cleanup when the component unmounts
    return () => {
      qrCodeScanner.clear().catch((error: any) => {
        console.error("Error clearing QR scanner:", error);
      });
    };
  }, []);

  return (
    <div>
      <h1>QR Code Scanner</h1>
      <div id="qr-reader" style={{ width: "100%" }}></div>
      {scannedData && ( // Conditionally render the scanned data
        <div>
          <h2>Scanned Data:</h2>
          <p>{scannedData}</p> {/* Display the scanned data */}
        </div>
      )}
    </div>
  );
};

export default QRCodeScanner;
