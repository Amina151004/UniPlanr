import React from 'react';

const NavIcon = ({ icon, active, onClick }) => (
  <div
    className={`w-11 h-11 rounded-xl flex items-center justify-center my-2 cursor-pointer transition-colors ${
      active ? 'bg-[#2d3c5f] text-white' : 'text-gray-400'
    }`}
    onClick={onClick}
  >
    {icon}
  </div>
);

export default NavIcon;
