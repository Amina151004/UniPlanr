import React , {useState,} from "react";
import './singupform.css'

function Signup_form(){
  const [name, setName]=useState ("");
   const [email, setEmail]=useState ("");
   const [Password, setpassword]=useState ("");
    const [Confirm, setconfirmpassword]=useState ("");
    const [role, setRole]=useState ("");
       const [speciality, setSpeciality]=useState ("");
  
  
  function HandleSubmit(e) {
    e.preventDefault(); // يمنع إعادة تحميل الصفحة
    console.log("Nom:", name); // هنا يمكن ترسل الاسم للـ backend
  }

  

return (

<form  className="signup-form" onSubmit={HandleSubmit}>
    <div  className="left">
        <input type="text" placeholder="Full Name " value={name} 
        onChange={(e)=>setName(e.target.value)}
         />
      
          
        <input type="text" placeholder="Email" 
         value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input type="text" placeholder="Password" 
        value={Password} onChange={(e)=>setpassword(e.target.value)}/>
        <input type="text" placeholder="Confirm Password"
        value={Confirm} onChange={(e)=>setconfirmpassword(e.target.value)} />
    </div>
  <div  className="right">

     <input type="date" placeholder="Date of Birth" />
     <div  className="role-input">
      
     
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Role</option>
            <option value="Chef">Chef</option>
            <option value="Responsable">Responsable</option>
            <option value="Enseignant">Enseignant</option>
            <option value="Étudiant">Étudiant</option>
          </select>
        
      
      </div>
        <div className="role-input">
          <select value={speciality} onChange={(e) => setSpeciality(e.target.value)}>
            <option value="">Speciality</option>
            <option value="informatique">informatique</option>
            <option value="physique ">physique </option>
            <option value="biologie">biologie</option>
          </select>
        </div>
        <label  className="terms">
            <input type="checkbox" />
         <p>  I accept all the terms and conditions</p> 
        </label>

        <button onClick={() => navigate('/home')} type="submit" className="signup-btn">Sign Up</button>
  </div>
  






</form>
);

}
export default Signup_form;