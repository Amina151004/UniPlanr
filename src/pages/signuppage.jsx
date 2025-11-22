import React from "react";
import Signup_form from '../components/signupform';
import './signuppage.css';
import Logo from '../assets/logo.png';

import { useNavigate } from 'react-router-dom';


function Signup_page(){
    const navigate = useNavigate();
    return(
        <div  className="signup-page">
            <img src={Logo} className="logo"/>
            <h2>Create an account!</h2>
            <div className="Signup_container">
                <Signup_form/>

            </div>
            
            <p className="login-text">
        Already have an account? <a href="#" onClick={() => navigate('/login')}>Login</a>
      </p>





        </div>

    );
}
export default Signup_page ;