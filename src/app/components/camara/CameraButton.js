'use client';
import { Camera } from 'lucide-react';



const handleOpenCamera = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    // Aquí podrías pasar el stream a un <video> para mostrarlo
    console.log("Cámara abierta", stream);
  } catch (err) {
    console.error("No se pudo abrir la cámara", err);
  }
};


export default function CameraButton({ onOpen }) {
  return (
    <button
      onClick = {handleOpenCamera}
      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-2xl shadow-md hover:bg-blue-700 transition"
    >
      <Camera size={20} />
      <span>Abrir cámara</span>
    </button>
  );
}
