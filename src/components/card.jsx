import React from "react";

function Card({ title, onModifier, onAjouter, modifierText = "Modifier", ajouterText = "Ajouter" }) {
  return (
    <div className="h-[200px] w-[320px] bg-[#E3F2FD] m-10 rounded-[20px] relative shadow-[0_2px_5px_rgba(0,0,0,0.2)] flex flex-col justify-between">
      <h6 className="text-black font-bold text-center text-[30px] py-4">{title}</h6>

      <div className="absolute bottom-4 left-0 w-full flex justify-between px-6">
        {onModifier && (
          <button
            onClick={onModifier}
            className="px-6 py-2 rounded-[20px] bg-gradient-to-r from-blue-600 via-blue-800 to-blue-900 text-white text-[16px] font-semibold shadow-md"
          >
            {modifierText}
          </button>
        )}

        {onAjouter && (
          <button
            onClick={onAjouter}
            className="px-6 py-2 rounded-[20px] bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 text-white text-[16px] font-semibold shadow-md"
          >
            {ajouterText}
          </button>
        )}
      </div>
    </div>
  );
}

export default Card;
