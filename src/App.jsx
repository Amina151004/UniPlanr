import React from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Footer from "./components/Footer.jsx";
import Signup_page from "./pages/signuppage.jsx";
import Signin from "./pages/Signin.jsx";
import { Welcomepg } from "./pages/Welcomepg.jsx";
import { Routes, Route } from 'react-router-dom';
import Dashboard from "./pages/dashboard.jsx";
import Chefdepartement from "./pages/Chefdepartement.jsx";
import ChefProfile from "./pages/Chefprofile.jsx";  


function App() {
  return (
    <>
    <Routes>
      <Route path="*" element={<Welcomepg />} />
      <Route path="/login" element={<Signin />} />
      <Route path="/signup" element={<Signup_page />} />
      <Route path="/home" element={<Dashboard />} />
      <Route path="/Chefdepartement" element={<Chefdepartement />} />
      <Route path="/chefprofile" element={<ChefProfile />} />
    </Routes>
    </>
  );
}

export default App;
