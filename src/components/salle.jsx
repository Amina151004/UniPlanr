import {React,useState} from "react";

export default function Salle(){
    const[ numero,Setnumero]=useState("");
             const[ typeS,SettypeS]=useState("");  
              const[capacite,Setcapacite]=useState("");

    return(
         <div className="flex flex-col gap-4">
            <input type="text" value={numero}
            onChange={(e)=>Setnumero(e.target.value)} 
            placeholder="Numero" 
            className="w-[400px] h-[60px] bg-slate-300 rounded-[25px]
             placeholder-blue-950 text-[24px] text-left pl-8 border border-blue-950"/>
            
            <input type="text" value={typeS}
            onChange={(e)=>SettypeS(e.target.value)} 
            placeholder="Type" 
              className="w-[400px] h-[60px] bg-slate-300 rounded-[25px]
             placeholder-blue-950 text-[24px] text-left pl-8 border border-blue-950"/>
            
            <input type="text" value={capacite}
            onChange={(e)=>Setcapacite(e.target.value)} 
            placeholder="capacite"
             className="w-[400px] h-[60px] bg-slate-300 rounded-[25px]
             placeholder-blue-950 text-[24px] text-left pl-8 border border-blue-950" />


        </div> 


    )
}
