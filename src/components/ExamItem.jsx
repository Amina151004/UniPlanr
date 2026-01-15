import React from 'react';

const ExamItem = ({ name }) => (
  <div className="flex justify-between items-center py-6 border-b border-gray-200">
    <span className="text-gray-900 font-medium">{name}</span>
    <div className="flex gap-1">
      <button className="px-6 py-2 rounded-full bg-[#1a2742] text-white font-medium text-sm">Sujet</button>
      <button className="px-6 py-2 rounded-full bg-[#1a2742] text-white font-medium text-sm">Correction</button>
      <button className="px-6 py-2 rounded-full bg-[#1a2742] text-white font-medium text-sm">liste etudiant</button>
    </div>
  </div>
);

export default ExamItem;
