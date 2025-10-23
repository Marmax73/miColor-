'use client';
import { Camera } from 'lucide-react';

export default function CameraButton({ onOpen }) {
  return (
    <button
      onClick={onOpen}
      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-2xl shadow-md hover:bg-blue-700 transition"
    >
      <Camera size={20} />
      <span>Abrir cámara</span>
    </button>
  );
}
