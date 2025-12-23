/* --- Scrollbar Hidden (Transparent) --- */
const hiddenScrollbarStyle = {
  scrollbarWidth: "none",
  msOverflowStyle: "none",
};

const hideScrollbarCSS = `
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    background: transparent;
  }
`;

import React, { useState } from 'react';


import NavIcon from '../components/NavIcon';
import ExamItem from '../components/ExamItem';
import ExamCard from '../components/ExamCard';

const ExamDashboard = () => {
  const [activeNav, setActiveNav] = useState('home');

  const exams = [
    { id: 1, name: 'Controle continue' },
    { id: 2, name: 'Examen' },
    { id: 3, name: 'Test Tp' },
    { id: 4, name: 'Examen de remplacement' },
    { id: 5, name: 'Rattrapage' }
  ];

  const myExams = [
     { subject: "UX", date: "2 Oct 2025", status: "Controle continue", code: "S204", color: "bg-blue-500" },
    { subject: "UX", date: "11 Oct 2025", status: "Examen", code: "N001", color: "bg-purple-500" },
    { subject: "UX", date: "20 Oct 2025", status: "Test Tp", code: "N001", color: "bg-gray-800" },
    { subject: "UX", date: "24 Oct 2025", status: "Examen de remplacement", code: "L001", color: "bg-cyan-400" },
    { subject: "UX", date: "30Oct 2025", status: "Rattrapage", code: "L001", color: "bg-cyan-600" },
  
  ];

  return (
    <>
      {/* Inject CSS to hide scrollbar */}
      <style>{hideScrollbarCSS}</style>

    

        {/* Main content */}
        <main className="flex-1 p-8">


          {/* Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">

            {/* Exam List (scroll hidden) */}
            <div
              className="bg-white rounded-2xl p-10 shadow-lg max-h-[calc(100vh-150px)] overflow-y-auto"
              style={hiddenScrollbarStyle}
            >
              {exams.map(exam => (
                <ExamItem key={exam.id} name={exam.name} />
              ))}
            </div>

            {/* My Exams Section - Right Side */}
<div
  className="bg-white rounded-2xl p-8 shadow-lg max-h-[calc(100vh-150px)] overflow-y-auto"
  style={hiddenScrollbarStyle}
>
  <h2 className="w-full text-xl font-bold mb-10">
              My Exams
            </h2>

  <div className="space-y-4">
    {myExams.map((exam, i) => (
      <div key={i} className="border-b border-gray-100 pb-4 last:border-0">
        <div className="flex items-start gap-3">

          {/* Dot color */}
          <div
            className={`w-3 h-3 rounded-full ${exam.color} mt-1.5 flex-shrink-0`}
          ></div>

          <div className="flex-1">
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-semibold text-gray-900">{exam.subject}</h3>
              <span className="text-xs text-gray-500">{exam.date}</span>
            </div>

            <p className="text-sm text-gray-600 mb-2">{exam.status}</p>
            <span className="text-xs text-gray-400">{exam.code}</span>
          </div>

        </div>
      </div>
    ))}
  </div>
</div>

          </div>

        </main>
      
    </>
  );
};

export default ExamDashboard;
