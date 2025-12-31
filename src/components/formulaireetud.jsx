import {React,useState} from "react";
export default function FormulaireEtud(){
 const[ nomE,SetnomE]=useState("");
     const[ prenomE,SetprenomE]=useState("");  
      const[niveauE,SetniveauE]=useState("");
       const[ specialiteE,SetspecialiteE]=useState("");
       return(

        <div className="flex flex-col gap-4">
            <input type="text" value={nomE}
            onChange={(e)=>SetnomE(e.target.value)} 
            placeholder="Nom" 
            className="w-[400px] h-[60px] bg-slate-300 rounded-[25px]
             placeholder-blue-950 text-[24px] text-left pl-8 border border-blue-950"/>
            
            <input type="text" value={prenomE}
            onChange={(e)=>SetprenomE(e.target.value)} 
            placeholder="prenom" 
              className="w-[400px] h-[60px] bg-slate-300 rounded-[25px]
             placeholder-blue-950 text-[24px] text-left pl-8 border border-blue-950"/>
            
            <input type="text" value={niveauE}
            onChange={(e)=>SetniveauE(e.target.value)} 
            placeholder="niveau"
             className="w-[400px] h-[60px] bg-slate-300 rounded-[25px]
             placeholder-blue-950 text-[24px] text-left pl-8 border border-blue-950" />


                     <input type="text" value={specialiteE}
            onChange={(e)=>SetspecialiteE(e.target.value)} 
            placeholder="specialite" 
             className="w-[400px] h-[60px] bg-slate-300 rounded-[25px]
             placeholder-blue-950 text-[24px] text-left pl-8 border border-blue-950"/>

            


        </div> 

       )
      

}