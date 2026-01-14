import React, { useState, useEffect } from 'react';
import { User, Mail, Home } from 'lucide-react';
import { useAuth } from '/src/context/AuthContext.jsx';
import api from '/src/services/api.js';

export const Etuprofile = () => {
  const { user, token, loading: authLoading } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [exams, setExams] = useState([]);
  const [semester, setSemester] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Wait for auth context to load first
    if (authLoading) {
      return;
    }
    
    // Wait for token to be loaded before fetching
    if (token) {
      fetchProfileData();
    } else {
      setError('Not authenticated. Please log in.');
      setLoading(false);
    }
  }, [token, authLoading]);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      
      console.log('Fetching profile...');
      
      // Fetch student profile and exams
      const response = await api.get('/student/profile');
      
      console.log('Profile data received:', response.data);
      
      setProfileData(response.data.student);
      setExams(response.data.exams);
      setSemester(response.data.semester);
      setError(null);
      
    } catch (err) {
      console.error('Error fetching profile:', err);
      console.error('Error response:', err.response?.data);
      console.error('Error status:', err.response?.status);
      
      if (err.response?.status === 401) {
        setError('Session expired. Please log in again.');
      } else {
        const errorMessage = err.response?.data?.error || err.response?.data?.message || err.message || 'Failed to load profile data';
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const formatTime = (timeString) => {
    return timeString ? timeString.substring(0, 5) : '';
  };


  const handleDownload = async (examId, fileType) => {
    try {
      const response = await api.get(`/examen/${examId}/${fileType}/download`, {
        responseType: 'blob'
      });
      
      // Create a download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${fileType}_exam_${examId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
    } catch (err) {
      console.error(`Error downloading ${fileType}:`, err);
      alert(`Failed to download ${fileType}. File may not be available.`);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-lg">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-96 p-4">
        <div className="text-lg text-red-500 mb-4">{error}</div>
        <button 
          onClick={fetchProfileData}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className='flex'>
      <div className='flex flex-col justify-start mt-8'>
        {/* Left profile */}
        <div className='flex justify-center p-5'>
          {/* img + name */}
          <img 
            src="src/assets/user.png" 
            alt="Profile" 
            className="rounded-full w-28 h-28 mt-6" 
          />
          <div className='w-[15rem] h-min m-6'>
            <h2 className="w-full text-2xl font-semibold">
              {profileData?.nom} {profileData?.prenom}
            </h2>
            <h3 className="font-medium font-semibold opacity-50">
              {profileData?.role || 'Student'}
            </h3>
          </div>
        </div>

        <div className='flex flex-col gap-6 mt-10 ml-10'>
          {/* Info section */}
          <div className='flex items-center gap-3 text-gray-600'>
            <User size={20} />
            <span className='text-gray-600 text-sm font-semibold'>
              {profileData?.id_utilisateur || 'N/A'}
            </span>
          </div>
          <div className='flex items-center gap-3 text-gray-600'>
            <Mail size={20} />
            <a 
              href={`mailto:${profileData?.email}`} 
              className='text-sm underline font-semibold'
            >
              {profileData?.email}
            </a>
          </div>
          <div className='flex items-center gap-3 text-gray-600'>
            <Home size={20} />
            <span className='text-gray-600 text-sm font-semibold'>
              {profileData?.niveau || 'Not assigned'}
            </span>
          </div>
        </div>
      </div>

      {/* Right Content Section */}
      <div className='flex-1 mt-5'>
        <div className='bg-white rounded-xl shadow-xl p-6'>
          {/* Header */}
          <div className='flex justify-between items-start mb-6'>
            <div>
              <h1 className='text-xl font-bold mb-1'>
                {profileData?.niveau || 'Not assigned'}{' '}
                <span className='text-gray-500 text-lg ml-2'>
                  G-{profileData?.num_groupe || 'N/A'}
                </span>
              </h1>
              <p className='text-gray-600'>Exams Schedule</p>
            </div>
            <span className='text-gray-500'>{semester?.annee_universitaire || '2024-2025'}</span>
          </div>

          {/* Exams List */}
          <div className='h-[22rem] scroll-h overflow-y-scroll no-scrollbar'>
            {exams.length === 0 ? (
              <div className='text-center text-gray-500 mt-10'>
                No exams scheduled yet
              </div>
            ) : (
              exams.map((exam) => (
                <div key={exam.id_examen} className='rounded-lg p-4 border-b'>
                  <div className='flex items-center justify-between'>
                    <div className='flex-1'>
                      <h3 className='font-semibold text-base mb-1'>
                        {exam.subject || 'Unknown Subject'}
                      </h3>
                      <p className='text-gray-600 text-[0.7rem]'>{exam.type}</p>
                    </div>
                    
                    <button 
                      onClick={() => handleDownload(exam.id_examen, 'sujet')}
                      disabled={!exam.sujet_file}
                      className={`m-3 text-white px-6 py-1 rounded-full font-medium transition ${
                        exam.sujet_file 
                          ? 'nrml-btn hover:bg-slate-700' 
                          : 'bg-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Sujet
                    </button>
                    <button 
                      onClick={() => handleDownload(exam.id_examen, 'correction')}
                      disabled={!exam.correction_file}
                      className={`m-3 text-white px-6 py-1 rounded-full font-medium transition ${
                        exam.correction_file 
                          ? 'nrml-btn hover:bg-slate-700' 
                          : 'bg-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Correction
                    </button>
                    
                    <div className='flex items-center gap-4'>
                      <div className='text-right mr-4'>
                        <p className='text-[0.7rem] mb-2 text-gray-500'>
                          {formatDate(exam.date)}
                        </p>
                        <p className='text-[0.7rem] mb-2 text-gray-500'>
                          {formatTime(exam.heure_debut)} - {formatTime(exam.heure_fin)}
                        </p>
                        <p className='text-[0.7rem] text-gray-500'>
                          Room: {exam.room || 'TBA'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Etuprofile;