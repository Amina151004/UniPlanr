import React, { useState, useEffect } from 'react';
import { User, Mail, Home, ChevronDown } from 'lucide-react';
import userImg from "../assets/user1.png";
import api from '../services/api';

const TeacherDashboard = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [niveaux, setNiveaux] = useState(["L1", "L2", "L3", "M1", "M2"]);
  const [niveauxData, setNiveauxData] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedDelegues, setSelectedDelegues] = useState({
    L1: "délégué",
    L2: "délégué",
    L3: "délégué",
    M1: "délégué",
    M2: "délégué",
  });

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch teacher profile
      const profileResponse = await api.get('/teacher/profile');
      setProfile(profileResponse.data);

      // Fetch niveaux with delegates
      const niveauxResponse = await api.get('/teacher/niveaux');
      setNiveauxData(niveauxResponse.data);

    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (niveau, delegue) => {
    setSelectedDelegues({ ...selectedDelegues, [niveau]: delegue });
    setOpenDropdown(null);
  };

  // Get delegates for a specific niveau
  const getDeleguesForNiveau = (niveau) => {
    const niveauData = niveauxData.find(n => n.niveau === niveau);
    return niveauData?.delegues || [];
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#eef0ff]">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className='flex gap-8 p-6 bg-[#eef0ff] min-h-screen'>

      {/* PROFILE */}
      <div className='flex'>
        <div className='flex flex-col justify-start mt-8'>
          <div className='flex justify-center p-5'>
            <img 
              src={profile?.profile_picture || userImg} 
              alt="Profile" 
              className="rounded-full w-28 h-28 mt-6" 
            />

            <div className='w-[15rem] h-min m-6'>
              <h2 className="w-full text-2xl font-semibold">
                {profile?.prenom} {profile?.nom}
              </h2>
              <h3 className="font-medium font-semibold opacity-50">Enseignant</h3>
            </div>
          </div>

          <div className='flex flex-col gap-6 mt-10 ml-10'>
            <div className='flex items-center gap-3 text-gray-600'>
              <User size={20} />
              <span className='text-gray-600 text-sm font-semibold'>
                {profile?.matricule || 'N/A'}
              </span>
            </div>
            <div className='flex items-center gap-3 text-gray-600'>
              <Mail size={20} />
              <a 
                href={`mailto:${profile?.email}`} 
                className='text-sm underline font-semibold'
              >
                {profile?.email}
              </a>
            </div>
            <div className='flex items-center gap-3 text-gray-600'>
              <Home size={20} />
              <span className='text-gray-600 text-sm font-semibold'>
                {profile?.departement || 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* NIVEAU */}
      <div className="flex-1 bg-white rounded-xl shadow-xl p-6">
        <h2 className="text-2xl font-semibold mb-6">Niveau</h2>
        <div className="flex flex-col gap-6 max-h-[400px] overflow-y-auto">
          {niveaux.map((niveau) => (
            <div key={niveau} className="relative">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-medium">{niveau}</h3>
                <div className="relative w-64">
                  <button
                    className="w-full bg-[#f7f7fb] px-5 py-3 rounded-xl flex justify-between items-center text-gray-700"
                    onClick={() =>
                      setOpenDropdown(openDropdown === niveau ? null : niveau)
                    }
                  >
                    {selectedDelegues[niveau]}
                    <ChevronDown className={`${openDropdown === niveau ? "rotate-180" : ""}`} />
                  </button>

                  {openDropdown === niveau && (
                    <div className="absolute right-0 top-full mt-2 w-full z-50 bg-white shadow-xl rounded-xl border max-h-60 overflow-y-auto">
                      {getDeleguesForNiveau(niveau).length > 0 ? (
                        getDeleguesForNiveau(niveau).map((delegue) => (
                          <button
                            key={delegue.id}
                            onClick={() => handleSelect(niveau, delegue.name)}
                            className="block w-full text-left px-5 py-3 hover:bg-gray-100"
                          >
                            {delegue.name}
                          </button>
                        ))
                      ) : (
                        <div className="px-5 py-3 text-gray-500 text-sm">
                          Aucun délégué disponible
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <hr className="mt-4 border-gray-200" />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default TeacherDashboard;