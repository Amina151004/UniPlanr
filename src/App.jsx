import React from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Footer from "./components/Footer.jsx";
import Signup_page from "./pages/signuppage.jsx";
import Signin from "./pages/Signin.jsx";
import { Welcomepg } from "./pages/Welcomepg.jsx";
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <>
    <Routes>
      <Route path="*" element={<Welcomepg />} />
      <Route path="/login" element={<Signin />} />
      <Route path="/signup" element={<Signup_page />} />
    </Routes>
    </>
  );
}

export default App;
