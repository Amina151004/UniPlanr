import React from "react";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* الخلفية السوداء */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      ></div>

      {/* محتوى المودال */}
      <div className="relative bg-white rounded-xl p-6 w-[1400px] shadow-lg">
        
        {/* زر الغلق */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-xl font-bold text-gray-600 hover:text-black"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}
