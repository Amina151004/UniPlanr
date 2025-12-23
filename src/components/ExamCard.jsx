import React from 'react';

const ExamCard = ({ subject, date, description, code, color }) => (
  <div className={`flex flex-col p-4 mb-4 rounded-lg border-l-4 ${color} bg-gray-100 cursor-pointer`}>
    <div className="flex justify-between mb-2">
      <span className="font-semibold text-gray-900 text-sm">{subject}</span>
      <span className="text-gray-400 text-xs">{date}</span>
    </div>
    <div className="text-gray-600 text-sm mb-2">{description}</div>
    <span className="text-gray-400 text-xs bg-white px-2 py-1 rounded">{code}</span>
  </div>
);

export default ExamCard;
