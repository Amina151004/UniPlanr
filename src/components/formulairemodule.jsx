import {React ,useState} from "react";


export default function Formulairemodule(){
    const[ nomM,SetnomM]=useState("");
     const[ codeM,SetcodeM]=useState("");  
      const[ semestreM,SetsemestreM]=useState("");
       const[ enseignantrespM,enseignantrespnomM]=useState("");
      


    return(
        <div className="flex flex-col gap-4">
            <input type="text" value={nomM}
            onChange={(e)=>SetnomM(e.target.value)} 
            placeholder="Nom" 
            className="w-[400px] h-[60px] bg-slate-300 rounded-[25px]
             placeholder-blue-950 text-[24px] text-left pl-8 border border-blue-950"/>
            
            <input type="number" value={codeM}
            onChange={(e)=>SetcodeM(Number(e.target.value))} 
            placeholder="code" 
              className="w-[400px] h-[60px] bg-slate-300 rounded-[25px]
             placeholder-blue-950 text-[24px] text-left pl-8 border border-blue-950"/>
            
            <input type="text" value={semestreM}
            onChange={(e)=>SetsemestreM(e.target.value)} 
            placeholder="semestre"
             className="w-[400px] h-[60px] bg-slate-300 rounded-[25px]
             placeholder-blue-950 text-[24px] text-left pl-8 border border-blue-950" />


                     <input type="text" value={enseignantrespM}
            onChange={(e)=>enseignantrespnomM(e.target.value)} 
            placeholder="enseignant responsable" 
             className="w-[400px] h-[60px] bg-slate-300 rounded-[25px]
             placeholder-blue-950 text-[24px] text-left pl-8 border border-blue-950"/>

            


        </div> 


    )
}