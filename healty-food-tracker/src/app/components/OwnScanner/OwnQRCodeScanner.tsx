import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from '@zxing/library';

const BarcodeScanner: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<string>("");
  const [isVideoVisible, setIsVideoVisible] = useState<boolean>(true); // State to manage video visibility

  const getCameras = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter((device) => device.kind === "videoinput");
    setCameras(videoDevices);
    if (videoDevices.length > 0) {
      setSelectedCamera(videoDevices[0].deviceId);
      startCamera(videoDevices[0].deviceId);
    }
  };

  const startCamera = async (deviceId: string) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: { exact: deviceId } },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute("playsinline", "true");
        videoRef.current.play();
        videoRef.current.onloadedmetadata = () => {
          requestAnimationFrame(scanFrame);
        };
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const scanFrame = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    if (video.videoWidth === 0 || video.videoHeight === 0) {
      requestAnimationFrame(scanFrame);
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    const img = new Image();
    img.src = canvas.toDataURL();

    img.onload = async () => {
      const codeReader = new BrowserMultiFormatReader();
      try {
        const result = await codeReader.decodeFromImage(img);
        setScannedData(result.getText());
        stopCamera(); // Stop the camera feed after successful scan
        setIsVideoVisible(false); // Hide the video feed
      } catch (error) {
        console.error("Error decoding barcode:", error);
        requestAnimationFrame(scanFrame);
      }
    };
  };

  useEffect(() => {
    getCameras();

    return () => {
      stopCamera(); // Cleanup on unmount
    };
  }, []);

  const handleCameraChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const deviceId = event.target.value;
    setSelectedCamera(deviceId);
    stopCamera(); // Stop the current camera before starting a new one
    startCamera(deviceId);
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  const handleRetry = () => {
    setScannedData(null); // Reset scanned data
    setIsVideoVisible(true); // Show the video feed again
    getCameras(); // Re-initialize the camera
  };

  return (
    <div>
      <div>
        <label htmlFor="camera-select">Select Camera: </label>
        <select className="p-4 bg-BTBlue text-white rounded-lg shadow-lg hover:bg-BTBlue-dark" id="camera-select" onChange={handleCameraChange} value={selectedCamera}>
          {cameras.map((camera) => (
            <option key={camera.deviceId} value={camera.deviceId}>
              {camera.label || `Camera ${camera.deviceId}`}
            </option>
          ))}
        </select>
      </div>

      {isVideoVisible && (
        <video ref={videoRef} style={{ width: "100%", height: "auto" }}></video>
      )}
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

      {scannedData && (
        <div>
          <h2>Scanned Data:</h2>
          <p>{scannedData}</p>
          <button className="p-4 bg-BTBlue text-white rounded-lg shadow-lg hover:bg-BTBlue-dark" onClick={handleRetry}>Retry</button> {/* Button to retry scanning */}
        </div>
      )}
    </div>
  );
};

export default BarcodeScanner;
