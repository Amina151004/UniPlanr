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

import React, { useState, useEffect } from 'react';
import NavIcon from '../components/NavIcon';
import ExamItem from '../components/ExamItem';
import ExamCard from '../components/ExamCard';
import api from '../services/api';

const ExamDashboard = () => {
  const [activeNav, setActiveNav] = useState('home');
  const [exams, setExams] = useState([]);
  const [myExams, setMyExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState(null);

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch exam types
      const typesResponse = await api.get('/exams/types');
      setExams(typesResponse.data);

      // Fetch teacher's exams
      const examsResponse = await api.get('/teacher/exams');
      setMyExams(examsResponse.data);

    } catch (err) {
      console.error('Error fetching exam data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle exam type click to filter
  const handleExamTypeClick = async (examType) => {
    try {
      setSelectedType(examType.name);
      const response = await api.get(`/teacher/exams/type/${encodeURIComponent(examType.name)}`);
      setMyExams(response.data);
    } catch (err) {
      console.error('Error filtering exams:', err);
    }
  };

  // Reset to show all exams
  const handleShowAllExams = async () => {
    try {
      setSelectedType(null);
      const response = await api.get('/teacher/exams');
      setMyExams(response.data);
    } catch (err) {
      console.error('Error fetching all exams:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

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
              <div
                key={exam.id}
                onClick={() => handleExamTypeClick(exam)}
                className="cursor-pointer"
              >
                <ExamItem name={exam.name} />
              </div>
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