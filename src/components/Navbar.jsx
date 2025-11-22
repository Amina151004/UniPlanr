import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const navigate = useNavigate();
  return (

    <div className='flex justify-between items-center p-4'>
        <img src="src/assets/logo.png" className='w-20 mx-5' alt="Logo" />
        <ul className='flex'>
            <li className='p-4'>
                <button onClick={() => navigate('/login')} className="px-6 py-2.5 text-sm font-bold text-cyan-950 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-full text-center leading-5" >
                    
                        Login
                    
                </button>
            </li>
            <li className='p-4'>
                <button type="button" onClick={() => navigate('/signup')} className="px-10 py-2.5 text-sm font-medium text-white nrml-btn rounded-full text-center leading-5">
                    Signup
                </button>
            </li>
        </ul>
    </div>
  );
}

export default Navbar;
