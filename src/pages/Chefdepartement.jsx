import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Search, 
  Check, 
  X, 
  ChevronDown, 
  Filter, 
  Eye, 
  MoreVertical, 
  Download 
} from 'lucide-react';

const Chefdepartement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [examStatus, setExamStatus] = useState({});
  const [selectedExamType, setSelectedExamType] = useState('ALL');
  const [selectedLevel, setSelectedLevel] = useState('ALL');
  const [selectedSpecialite, setSelectedSpecialite] = useState('ALL');
  const [isExamTypeOpen, setIsExamTypeOpen] = useState(false);
  const [isLevelOpen, setIsLevelOpen] = useState(false);
  const [isSpecialiteOpen, setIsSpecialiteOpen] = useState(false);
  const [publishedExam, setPublishedExam] = useState(null);
  const [exams, setExams] = useState([]);

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = () => {
    axios.get('http://localhost:8000/api/exams')
      .then(res => setExams(res.data))
      .catch(err => console.log(err));
  };

  const examTypes = [
    'ALL',
    'Test TP',
    'Controle Continue',
    'Remplacement de Controle',
    'Examen',
    'Remplacement de Examen',
    'Rattrapage'
  ];

  const levels = ['ALL', 'L1', 'L2', 'L3', 'M1', 'M2'];
  const specialites = ['ALL', 'GL', 'AI', 'RSD', 'SIC'];

  const avatarColors = ['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-orange-500', 'bg-pink-500'];

  const showSpecialiteFilter = selectedLevel === 'M1' || selectedLevel === 'M2';

  const handleLevelChange = (level) => {
    setSelectedLevel(level);
    if (level !== 'M1' && level !== 'M2') {
      setSelectedSpecialite('ALL');
    }
    setIsLevelOpen(false);
  };

  const filteredExams = exams.filter(exam => {
    const matchesSearch = 
      exam.module.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.group.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.room.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedExamType === 'ALL' || exam.type === selectedExamType;
    const matchesLevel = selectedLevel === 'ALL' || exam.level === selectedLevel;
    const matchesSpecialite = selectedSpecialite === 'ALL' || exam.specialite === selectedSpecialite;
    
    return matchesSearch && matchesType && matchesLevel && matchesSpecialite;
  });

  const handleApprove = (examId, index) => {
    axios.post(`http://localhost:8000/api/exams/${examId}/approve`)
      .then(() => setExamStatus(prev => ({ ...prev, [index]: 'approved' })))
      .catch(err => console.log(err));
  };

  const handleReject = (examId, index) => {
    axios.post(`http://localhost:8000/api/exams/${examId}/reject`)
      .then(() => setExamStatus(prev => ({ ...prev, [index]: 'rejected' })))
      .catch(err => console.log(err));
  };

  const handlePublish = (examId, index) => {
    axios.post(`http://localhost:8000/api/exams/${examId}/publish`)
      .then(() => {
        setPublishedExam(index);
        setTimeout(() => setPublishedExam(null), 3000);
      })
      .catch(err => console.log(err));
  };

  // ✅ CSV Download Function
  const downloadCSV = () => {
    if (filteredExams.length === 0) return;

    const headers = ['Module', 'Group', 'Level', 'Specialite', 'Type', 'Date', 'Time', 'Room', 'Invigilator'];
    
    const rows = filteredExams.map(exam => [
      `"${exam.module}"`,
      `"${exam.group}"`,
      `"${exam.level}"`,
      `"${exam.specialite || ''}"`,
      `"${exam.type}"`,
      `"${exam.date}"`,
      `"${exam.time}"`,
      `"${exam.room}"`,
      `"${exam.invigilator}"`
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'exams_schedule.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const activeFiltersCount = [
    selectedExamType !== 'ALL',
    selectedLevel !== 'ALL',
    selectedSpecialite !== 'ALL'
  ].filter(Boolean).length;

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white px-8 py-6 shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Overall Exam Overview</h1>
              <p className="text-gray-500 mt-1">Track schedules, approvals, and invigilation status</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{filteredExams.length}</div>
              <div className="text-sm text-gray-500">Total Exams</div>
            </div>
          </div>
        </div>

        {/* Success Banner */}
        {publishedExam !== null && (
          <div className="bg-green-50 border-b border-green-200 px-8 py-3">
            <div className="flex items-center space-x-2 text-green-800">
              <Check size={18} />
              <span className="font-medium">Exam "{exams[publishedExam].module}" has been published successfully!</span>
            </div>
          </div>
        )}

        {/* Filters Section */}
        <div className="bg-white border-b border-gray-200">
          <div className="px-8 py-5">
            {/* Search Bar */}
            <div className="mb-4">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by module, group, or room..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center flex-wrap space-x-3">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Filter size={16} />
                <span className="font-medium">Filters:</span>
                {activeFiltersCount > 0 && (
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    {activeFiltersCount}
                  </span>
                )}
              </div>

              {/* Exam Type Filter */}
              <div className="relative">
                <button 
                  className={`px-4 py-2 rounded-lg flex items-center space-x-2 text-sm font-medium transition-colors ${
                    selectedExamType !== 'ALL' 
                      ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                  onClick={() => setIsExamTypeOpen(!isExamTypeOpen)}
                >
                  <span>Type: {selectedExamType}</span>
                  <ChevronDown size={16} className={isExamTypeOpen ? 'transform rotate-180' : ''} />
                </button>
                
                {isExamTypeOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsExamTypeOpen(false)} />
                    <div className="absolute top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl z-20 max-h-64 overflow-auto">
                      {examTypes.map((type) => (
                        <button
                          key={type}
                          className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                            selectedExamType === type 
                              ? 'bg-blue-50 text-blue-700 font-medium' 
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                          onClick={() => {
                            setSelectedExamType(type);
                            setIsExamTypeOpen(false);
                          }}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
              
              {/* Level Filter */}
              <div className="relative">
                <button 
                  className={`px-4 py-2 rounded-lg flex items-center space-x-2 text-sm font-medium transition-colors ${
                    selectedLevel !== 'ALL' 
                      ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                  onClick={() => setIsLevelOpen(!isLevelOpen)}
                >
                  <span>Level: {selectedLevel}</span>
                  <ChevronDown size={16} className={isLevelOpen ? 'transform rotate-180' : ''} />
                </button>
                
                {isLevelOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsLevelOpen(false)} />
                    <div className="absolute top-full mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-xl z-20">
                      {levels.map((level) => (
                        <button
                          key={level}
                          className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                            selectedLevel === level 
                              ? 'bg-blue-50 text-blue-700 font-medium' 
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                          onClick={() => handleLevelChange(level)}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Specialite Filter */}
              {showSpecialiteFilter && (
                <div className="relative">
                  <button 
                    className={`px-4 py-2 rounded-lg flex items-center space-x-2 text-sm font-medium transition-colors ${
                      selectedSpecialite !== 'ALL' 
                        ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-300'
                    }`}
                    onClick={() => setIsSpecialiteOpen(!isSpecialiteOpen)}
                  >
                    <span>Specialite: {selectedSpecialite}</span>
                    <ChevronDown size={16} className={isSpecialiteOpen ? 'transform rotate-180' : ''} />
                  </button>
                  
                  {isSpecialiteOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setIsSpecialiteOpen(false)} />
                      <div className="absolute top-full mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-xl z-20">
                        {specialites.map((spec) => (
                          <button
                            key={spec}
                            className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                              selectedSpecialite === spec 
                                ? 'bg-blue-50 text-blue-700 font-medium' 
                                : 'text-gray-700 hover:bg-gray-50'
                            }`}
                            onClick={() => {
                              setSelectedSpecialite(spec);
                              setIsSpecialiteOpen(false);
                            }}
                          >
                            {spec}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Clear Filters */}
              {activeFiltersCount > 0 && (
                <button
                  onClick={() => {
                    setSelectedExamType('ALL');
                    setSelectedLevel('ALL');
                    setSelectedSpecialite('ALL');
                  }}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear all
                </button>
              )}

              {/* ✅ Download Button */}
              <button
                onClick={downloadCSV}
                className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 flex items-center space-x-1 transition-colors"
              >
                <Download size={16} />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="flex-1 px-8 py-6 overflow-auto">
          {filteredExams.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="text-gray-400 mb-2">
                  <Search size={48} className="mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No exams found</h3>
                <p className="text-gray-500">Try adjusting your filters or search query</p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Module</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Group</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Level</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Date & Time</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Room</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Invigilator</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredExams.map((exam, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{exam.module}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{exam.group}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-1">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              {exam.level}
                            </span>
                            {exam.specialite && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                {exam.specialite}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-600">{exam.type}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 font-medium">{exam.date}</div>
                          <div className="text-xs text-gray-500">{exam.time}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700">
                            {exam.room}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <div className={`w-8 h-8 ${avatarColors[index % avatarColors.length]} rounded-full flex items-center justify-center text-white text-xs font-semibold`}>
                              {exam.avatar}
                            </div>
                            <span className="text-sm text-gray-700">{exam.invigilator}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {examStatus[index] === 'approved' ? (
                            <div className="flex items-center space-x-2">
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                <Check size={14} className="mr-1" />
                                Approved
                              </span>
                              <button
                                className="px-4 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                                onClick={() => handlePublish(exam.id_examen, index)}
                              >
                                Publish
                              </button>
                            </div>
                          ) : examStatus[index] === 'rejected' ? (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              <X size={14} className="mr-1" />
                              Rejected
                            </span>
                          ) : (
                            <div className="flex items-center space-x-2">
                              <button
                                className="p-2 text-green-600 hover:bg-green-50 rounded-md transition-colors"
                                onClick={() => handleApprove(exam.id_examen, index)}
                                title="Approve"
                              >
                                <Check size={18} />
                              </button>
                              <button
                                className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                onClick={() => handleReject(exam.id_examen, index)}
                                title="Reject"
                              >
                                <X size={18} />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chefdepartement;