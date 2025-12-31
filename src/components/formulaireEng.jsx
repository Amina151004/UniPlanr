import {React,useState} from "react";

export default function Formulaireenseig(){
    const[ nomEn,SetnomEn]=useState("");
         const[ prenomEn,SetprenomEn]=useState("");  
          const[email,Setemail]=useState("");
           const[module,Setmodule]=useState("");

    return(
        <div className="flex flex-col gap-4">
            <input type="text" value={nomEn}
            onChange={(e)=>SetnomEn(e.target.value)} 
            placeholder="Nom" 
            className="w-[400px] h-[60px] bg-slate-300 rounded-[25px]
             placeholder-blue-950 text-[24px] text-left pl-8 border border-blue-950"/>
            
            <input type="text" value={prenomEn}
            onChange={(e)=>SetprenomEn(e.target.value)} 
            placeholder="prenom" 
              className="w-[400px] h-[60px] bg-slate-300 rounded-[25px]
             placeholder-blue-950 text-[24px] text-left pl-8 border border-blue-950"/>
            
            <input type="text" value={email}
            onChange={(e)=>Setemail(e.target.value)} 
            placeholder="email"
             className="w-[400px] h-[60px] bg-slate-300 rounded-[25px]
             placeholder-blue-950 text-[24px] text-left pl-8 border border-blue-950" />


                     <input type="text" value={module}
            onChange={(e)=>Setmodule(e.target.value)} 
            placeholder="module" 
             className="w-[400px] h-[60px] bg-slate-300 rounded-[25px]
             placeholder-blue-950 text-[24px] text-left pl-8 border border-blue-950"/>

            


        </div> 

    )
}