import {React,useState} from "react";

export default function Formulaireexamen(){
    const[ nomEx,SetnomEx]=useState("");
         const[ typeEx,SetTypeEx]=useState("");  
          const[datedebut,Setdatedebut]=useState("");
           const[datefin,Setdatefin]=useState("");
    return(

        <div className="flex flex-col gap-4">
            <input type="text" value={nomEx}
            onChange={(e)=>SetnomEx(e.target.value)} 
            placeholder="Nom" 
            className="w-[400px] h-[60px] bg-slate-300 rounded-[25px]
             placeholder-blue-950 text-[24px] text-left pl-8 border border-blue-950"/>
            
            <input type="text" value={typeEx}
            onChange={(e)=>SetTypeEx(e.target.value)} 
            placeholder="Type" 
              className="w-[400px] h-[60px] bg-slate-300 rounded-[25px]
             placeholder-blue-950 text-[24px] text-left pl-8 border border-blue-950"/>
            
            <input type="text" value={datedebut}
            onChange={(e)=>Setdatedebut(e.target.value)} 
            placeholder="date debut"
             className="w-[400px] h-[60px] bg-slate-300 rounded-[25px]
             placeholder-blue-950 text-[24px] text-left pl-8 border border-blue-950" />


                     <input type="text" value={datefin}
            onChange={(e)=>Setdatefin(e.target.value)} 
            placeholder="date fin" 
             className="w-[400px] h-[60px] bg-slate-300 rounded-[25px]
             placeholder-blue-950 text-[24px] text-left pl-8 border border-blue-950"/>

            


        </div> 

    )



}