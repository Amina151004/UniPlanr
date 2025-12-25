import React, { useState, useEffect } from 'react';
import api from '/src/services/api.js';

export const DashEtud = () => {
  const [teachers, setTeachers] = useState([]);
  const [exams, setExams] = useState([]);
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await api.get('/student/dashboard');
      
      setTeachers(response.data.teachers || []);
      setExams(response.data.exams || []);
      setModules(response.data.modules || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // When module changes, filter teachers too
const handleModuleChange = async (e) => {
  const moduleId = e.target.value;
  setSelectedModule(moduleId);

  if (moduleId === 'all') {
    fetchDashboardData();
    return;
  }

  try {
    // Fetch both exams and teachers for the selected module
    const [examsResponse, teachersResponse] = await Promise.all([
      api.get(`/student/exams/module/${moduleId}`),
      api.get(`/teachers/module/${moduleId}`)
    ]);
    
    setExams(examsResponse.data.exams || []);
    setTeachers(teachersResponse.data.teachers || []);
  } catch (err) {
    console.error('Error fetching module data:', err);
  }
};

  const handleCopyPhone = async (teacher) => {
    if (!teacher.phone) {
      alert('No phone number available for this teacher');
      return;
    }

    try {
      await navigator.clipboard.writeText(teacher.phone);
      setCopiedId(teacher.id);
      
      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy phone number:', err);
      alert('Failed to copy phone number');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-lg text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex justify-between mt-6">
      {/* Teachers Section - Left Side */}
      <div className="w-[40rem] flex flex-col">
        <div className="flex mb-7 items-center justify-between">
          <div className="w-28">
            <h2 className="text-xl font-bold text-gray-900 ml-6">Teachers</h2>
          </div>
          <select 
            value={selectedModule}
            onChange={handleModuleChange}
            className="font-semibold px-2 py-2 bg-white rounded-full shadow-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Modules</option>
            {modules.map((module) => (
              <option key={module.id} value={module.id}>
                {module.name}
              </option>
            ))}
          </select>
        </div>

        {/* Teachers List */}
        <div className="h-[22rem] overflow-auto space-y-4 scroll-h overflow-y-scroll no-scrollbar">
          {teachers.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              No teachers found
            </div>
          ) : (
            teachers.map((teacher) => (
              <div
                key={teacher.id}
                className="flex items-center gap-4 rounded-3xl p-5 py-6 hover:shadow-lg hover:bg-white transition"
              >
                <img
                  src={
                    teacher.profile_picture ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(teacher.name)}&size=100&background=random`
                  }
                  className="h-14 w-14 rounded-full object-cover"
                  alt={teacher.name}
                />
                <div className="flex-1">
                  <p className="font-semibold text-lg text-gray-900">
                    {teacher.name}
                  </p>
                  <a
                    href={`mailto:${teacher.email}`}
                    className="text-gray-600 text-sm font-medium underline hover:text-blue-600 transition"
                  >
                    {teacher.email}
                  </a>
                </div>
                <button 
                  onClick={() => handleCopyPhone(teacher)}
                  className="relative text-gray-400 hover:text-blue-600 transition"
                  title={teacher.phone ? `Copy ${teacher.phone}` : 'No phone available'}
                >
                  {copiedId === teacher.id ? (
                    <span className="text-green-600 text-xs font-semibold">Copied!</span>
                  ) : (
                    <img
                      src="src/assets/message-circle-lines.svg"
                      alt="copy phone"
                    />
                  )}
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* My Exams Section - Right Side */}
      <div className="w-[21rem] bg-white rounded-2xl shadow-lg px-7">
        <h2 className="w-full text-xl font-bold mb-10">My Exams</h2>
        <div className="space-y-4 overflow-auto overflow-y-scroll no-scrollbar h-[23rem] mb-0">
          {exams.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              No upcoming exams
            </div>
          ) : (
            exams.map((exam) => (
              <div
                key={exam.id}
                className="border-b border-gray-100 pb-4 last:border-0"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${exam.color} mt-3 flex-shrink-0`}
                  ></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-extrabold text-xs text-gray-900">
                        {exam.subject}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {exam.date}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <p className="mt-3 text-sm font-medium text-gray-400 mb-2">
                        {exam.status}
                      </p>
                      <span className="text-xs mt-5 text-gray-400">
                        {exam.code}
                      </span>
                    </div>
                    {exam.time && (
                      <p className="text-xs text-gray-500 mt-1">{exam.time}</p>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DashEtud;