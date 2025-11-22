import React from 'react';

import { useNavigate } from 'react-router-dom';
 // replace with your image path

export const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-5 bg-white">
      {/* Left: Text */}
      <div className="md:w-1/2 mb-10 md:mb-0 pl-10">
        <h1 className="text-2xl md:text-5xl font-bold text-gray-900 mb-6 leading-snug md:leading-tight">
          Welcome to <span className='bg-gradient-to-r from-cyan-900 to-blue-600 bg-clip-text text-transparent'>Uniplanr,</span><br />
          Your University Planning Starts Here
        </h1>
        <p className="text-gray-700 text-lg md:text-xl mb-6">
          Smart exam management for students, teachers, and faculty
        </p>
        <button type="button" onClick={() => navigate('/signup')} className="px-10 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-cyan-900 to-blue-600 rounded-full text-center leading-5">
                    Create your account
        </button>
      </div>

      {/* Right: Image */}
      <div className="md:w-1/2 flex justify-center">
        <img src="src/assets/home.png" alt="Hero Illustration" className="w-full p-7" />
      </div>
    </section>
  );
};

export default Hero;
