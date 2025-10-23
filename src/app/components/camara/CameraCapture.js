'use client';
import { useRef, useState } from 'react';
import CameraButton from './CameraButton';
import { getDominantColor, getPantoneName } from '../utils/colorUtils';

export default function CameraCapture() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [dominant, setDominant] = useState(null);

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setIsActive(true);
    } catch (err) {
      alert('No se pudo acceder a la cámara.');
    }
  };

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const color = getDominantColor(imageData);
    const pantone = getPantoneName(color);
    setDominant({ color, pantone });
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {!isActive && <CameraButton onOpen={openCamera} />}

      {isActive && (
        <>
          <video ref={videoRef} autoPlay playsInline className="rounded-xl shadow-md w-full max-w-sm" />
          <canvas ref={canvasRef} width={300} height={300} className="hidden" />
          <button
            onClick={captureImage}
            className="bg-green-600 text-white px-4 py-2 rounded-xl shadow hover:bg-green-700 transition"
          >
            Capturar
          </button>
        </>
      )}

      {dominant && (
        <div className="mt-4 text-center">
          <div
            className="w-16 h-16 mx-auto rounded-full border"
            style={{ backgroundColor: dominant.color }}
          />
          <p className="mt-2 font-semibold">{dominant.pantone}</p>
          <p className="text-gray-600 text-sm">{dominant.color}</p>
        </div>
      )}
    </div>
  );
}
