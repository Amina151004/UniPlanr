import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChefProfile = () => {
  const [profile, setProfile] = useState({
    nom: '',
    prenom: '',
    name: '',
    role: '',
    phone: '',
    email: '',
    message: 'You are successfully managing your department.',
  });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const res = await axios.get('http://localhost:8000/api/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data;

        setProfile({
          nom: data.nom || '',
          prenom: data.prenom || '',
          name: `${data.prenom || ''} ${data.nom || ''}`,
          role: data.role === 'chef' ? 'Chef Département' : data.role || '',
          phone: data.tel || '',
          email: data.email || '',
          message: 'You are successfully managing your department.',
        });
      } catch (err) {
        console.error(err);
        alert('Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
      name: name === 'nom' || name === 'prenom'
        ? `${name === 'prenom' ? value : prev.prenom} ${name === 'nom' ? value : prev.nom}`
        : prev.name
    }));
  };

  const handleSave = async () => {
    if (!profile.nom.trim() || !profile.prenom.trim() || !profile.email.trim()) {
      alert('Nom, Prénom, and Email are required!');
      return;
    }

    try {
      const token = localStorage.getItem('token');

      await axios.put(
        'http://localhost:8000/api/user',
        {
          nom: profile.nom,
          prenom: profile.prenom,
          tel: profile.phone,
          email: profile.email,
          // Do not send role — user cannot change it
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert('Profile updated successfully!');
      setIsEditing(false);

      // Update name display without refetching
      setProfile((prev) => ({
        ...prev,
        name: `${prev.prenom} ${prev.nom}`,
      }));
    } catch (err) {
      console.error(err);
      alert('Failed to save profile. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-start min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <div className="relative bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md transform transition-transform duration-300 hover:scale-105 hover:shadow-3xl">
        <div className="flex justify-center -mt-20">
          <img
            className="w-36 h-36 rounded-full border-4 border-indigo-200 shadow-xl transition-all duration-300 hover:border-indigo-400 hover:shadow-2xl"
            src="https://i.pravatar.cc/150?img=3"
            alt={`Profile picture of ${profile.name}`}
          />
        </div>

        {!isEditing ? (
          <>
            <div className="text-center mt-6">
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">{profile.name}</h2>
              <div className="inline-block mt-2 px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-semibold uppercase tracking-wide rounded-full">
                {profile.role}
              </div>
              <div className="mx-auto mt-4 w-20 h-1 bg-gradient-to-r from-indigo-400 to-purple-500 rounded"></div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 text-gray-700 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer">
                <svg
                  className="w-6 h-6 mr-4 text-indigo-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-label="Phone icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="font-semibold">{profile.phone}</span>
              </div>
<div 
  className="flex items-center bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 text-gray-700 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
  title="Click to email"
>
  <svg
    className="w-6 h-6 mr-4 text-indigo-500"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    aria-label="Email icon"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m0 0v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8m18 0L12 13 3 8"
    />
  </svg>
  <span className="font-semibold">{profile.email}</span>
</div>

            </div>

            <div className="mt-8 text-center">
              <div className="flex items-center justify-center bg-indigo-50 rounded-lg p-4 shadow-inner">
                <svg className="w-5 h-5 mr-2 text-indigo-600" fill="currentColor" viewBox="0 0 20 20" aria-label="Quote icon">
                  <path d="M10 12l-2-2 2-2v4zm4-4l2 2-2 2V8z" />
                </svg>
                <span className="text-sm text-gray-700 italic font-medium">{profile.message}</span>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="mt-6 space-y-4">
              {['nom', 'prenom', 'phone', 'email'].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700">
                    {field === 'nom' ? 'Nom (Last Name)' :
                     field === 'prenom' ? 'Prénom (First Name)' :
                     field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    name={field}
                    value={profile[field]}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  name="message"
                  value={profile.message}
                  onChange={handleChange}
                  rows="3"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </>
        )}

        <div className="mt-8 text-center">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-full shadow-md transition-colors duration-200"
            >
              Edit Profile
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full shadow-md transition-colors duration-200"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChefProfile;
