// Cadre.jsx
import React, { useRef } from "react";
import Upload from '../assets/upload-removebg-preview.png';

export default function Cadre() {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="w-full h-[450px] border-2 border-dashed border-blue-950 rounded-xl flex flex-col items-center justify-center gap-4 p-14">
      
      {/* Image au centre */}
      <img
        src={Upload}
        alt="Upload"
        className="w-[200px] h-[200px] grayscale brightness-110 opacity-60"
      />

      {/* Texte sous l'image */}
      <h2 className="text-black text-2xl font-bold text-center mr-52 pl-24">
        Glissez-déposez les fichiers ici
      </h2>

      {/* Bouton pour upload */}
      <button
        className="w-[340px] py-3 bg-gradient-to-r from-[#1E88E5] to-[#114B7F] text-white rounded-[25px] text-[20px] mb-16"
        type="button"
        onClick={handleButtonClick}
      >
        Télécharger des fichiers
      </button>

      {/* Input file caché */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
      />
    </div>
  );
}
