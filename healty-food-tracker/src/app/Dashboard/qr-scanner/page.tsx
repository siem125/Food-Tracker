'use client'

// app/qr-scanner/page.tsx
//import QRCodeScanner from '@/app/components/QRCodeScanner';
import QRCodeScanner from '@/app/components/OwnScanner/OwnQRCodeScanner';

export default function QRScannerPage() {
  return (
    <div>
      <h1>Welcome to the QR Code Scanner</h1>
      <QRCodeScanner />
    </div>
  );
}
