'use client';

import React, { useRef, useState, useEffect } from 'react';
import CameraButton from './CameraButton';
import { getDominantColor } from '../../utils/camaraColor/getDominantColor';
import { getPantoneName } from '../../utils/camaraColor/getPantoneName';

export default function CameraCapture() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [dominant, setDominant] = useState(null);

  // Iniciar cámara al montar el componente
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setIsActive(true);
    } catch (err) {
      alert('No se pudo acceder a la cámara.');
      console.error(err);
    }
  };

  // Capturar imagen y obtener color dominante
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

  // Detener cámara al desmontar
  useEffect(() => {
    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {!isActive ? (
        <CameraButton onClick={startCamera} label="Abrir cámara" />
      ) : (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            width="320"
            height="240"
            className="rounded-lg shadow-md"
          />
          <canvas
            ref={canvasRef}
            width="320"
            height="240"
            className="hidden"
          />
          <CameraButton onClick={captureImage} label="Capturar color" />

          {dominant && (
            <div className="mt-4 text-center">
              <div
                className="w-24 h-24 mx-auto rounded-full border"
                style={{
                  backgroundColor: `rgb(${dominant.color.r}, ${dominant.color.g}, ${dominant.color.b})`,
                }}
              ></div>
              <p className="mt-2 font-semibold">
                RGB: ({dominant.color.r}, {dominant.color.g}, {dominant.color.b})
              </p>
              <p className="text-gray-600">{dominant.pantone}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
