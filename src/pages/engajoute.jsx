import React from "react";
import Cadre from '../components/cadre';
import Formulaireenseig from '../components/formulaireEng'

export default function Engajoute() {
  return (
  
   
      <div className="w-[1300px] bg-[#d8efff] rounded-[20px] shadow-lg p-6 flex flex-col gap-6 overflow-hidden">
        
        {/* Titre upload */}
        <h2 className="text-black text-2xl font-bold text-left px-4">
          Télécharger des fichiers
        </h2>

        {/* Conteneur pour Cadre + Formulaire */}
        <div className="flex flex-row justify-between items-start gap-6">
          
          {/* Cadre (à gauche) */}
          <div className="flex-1 max-w-[650px]">
            <Cadre />
          </div>

          {/* Formulaire (à droite) */}
          <div className="flex-1 max-w-[600px] flex flex-col items-center">
            <h2 className="text-black text-2xl font-bold py-10 mr-48">
              Remplir le formulaire
            </h2>
            <Formulaireenseig/>
          </div>

        </div>

      </div>
    
  );
}
