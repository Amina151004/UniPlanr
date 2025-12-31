import React from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Footer from "./components/Footer.jsx";
import Signup_page from "./pages/signuppage.jsx";
import Signin from "./pages/Signin.jsx";
import { Welcomepg } from "./pages/Welcomepg.jsx";
import { Routes, Route } from 'react-router-dom';
import Dashboard from "./pages/dashboard.jsx";
import Chefdepartement from "./components/Chefdepartement.jsx";
import ChefProfile from "./pages/Chefprofile.jsx";  
import { AuthProvider } from "/src/context/AuthContext.jsx";
import Etudajoute from '../src/pages/etudajouter.jsx'
import Engajoute from '../src/pages/engajoute.jsx'
import EnseigTable from '../src/pages/Enseigtable.jsx'
import EtudTable from '../src/pages/Etudianttable.jsx'
import Examjoute from '../src/pages/examajoute.jsx'
import ExamenTable from '../src/pages/examentable.jsx'
import Modulajout from '../src/pages/modulajoute.jsx'
import ModuleTable from '../src/pages/Moduletable.jsx'
import Salleajout from '../src/pages/salleajout.jsx'
import SalleTable from '../src/pages/Salletable.jsx'

function App() {
  return (
    <>
    <AuthProvider>
      <Routes>
      <Route path="*" element={<Welcomepg />} />
      <Route path="/login" element={<Signin />} />
      <Route path="/signup" element={<Signup_page />} />
      <Route path="/home" element={<Dashboard />} />
      <Route path="/Chefdepartement" element={<Chefdepartement />} />
      <Route path="/chefprofile" element={<ChefProfile />} />
      <Route path="/etudajout" element={<Etudajoute/>} />
      <Route path="/moduleajout" element={<Modulajout/>} />
      <Route path="/ensgajout" element={<Engajoute/>} />
      <Route path="/salleajout" element={<Salleajout/>} />
      <Route path="/examenajout" element={<Examjoute/>} />
      <Route path="/etudmodf" element={<EtudTable/>} />
      <Route path="/modulemodf" element={<ModuleTable/>} />
      <Route path="/ensgmodf" element={<EnseigTable/>} />
      <Route path="/sallemodf" element={<SalleTable/>} />
      <Route path="/examenmodf" element={<ExamenTable/>} />

    </Routes>
    </AuthProvider>
    
    </>
   
  );
}

export default App;
