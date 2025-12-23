import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Lock, Camera, Save, X } from 'lucide-react';
import { useAuth } from '/src/context/AuthContext.jsx';
import api from '/src/services/api.js';

export const Settings = () => {
  const { user, login } = useAuth();
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    tel: '',
    current_password: '',
    new_password: '',
    new_password_confirmation: ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('src/assets/user.png');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' or 'password'

  useEffect(() => {
    if (user) {
      setFormData({
        nom: user.nom || '',
        prenom: user.prenom || '',
        email: user.email || '',
        tel: user.tel || '',
        current_password: '',
        new_password: '',
        new_password_confirmation: ''
      });
      
      // Set profile picture preview
      if (user.profile_picture && user.profile_picture !== 'user.png') {
        setImagePreview(`http://localhost:8000/storage/${user.profile_picture}`);
      } else {
        setImagePreview('src/assets/user.png');
      }
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        setErrors({ profileImage: 'Image size must be less than 2MB' });
        return;
      }
      
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setErrors({ ...errors, profileImage: null });
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setSuccess('');

    try {
      // First, upload profile picture if changed
      if (profileImage) {
        const imageFormData = new FormData();
        imageFormData.append('profile_picture', profileImage);
        
        const imageResponse = await api.post('/user/profile-picture', imageFormData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        
        // Update user context with new profile picture
        if (imageResponse.data.user) {
          login(imageResponse.data.user, localStorage.getItem('token'));
        }
      }

      // Then update profile info
      const response = await api.put('/user/profile', {
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        tel: formData.tel
      });

      // Update user in context
      login(response.data.user, localStorage.getItem('token'));
      
      setSuccess('Profile updated successfully!');
      setProfileImage(null); // Clear the file after upload
      setTimeout(() => setSuccess(''), 3000);
      
    } catch (error) {
      console.error('Update error:', error);
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors || {});
      } else {
        setErrors({ general: 'Failed to update profile' });
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    
    if (formData.new_password !== formData.new_password_confirmation) {
      setErrors({ new_password_confirmation: ['Passwords do not match'] });
      return;
    }

    setLoading(true);
    setErrors({});
    setSuccess('');

    try {
      await api.put('/user/password', {
        current_password: formData.current_password,
        new_password: formData.new_password,
        new_password_confirmation: formData.new_password_confirmation
      });

      setSuccess('Password updated successfully!');
      setFormData(prev => ({
        ...prev,
        current_password: '',
        new_password: '',
        new_password_confirmation: ''
      }));
      setTimeout(() => setSuccess(''), 3000);
      
    } catch (error) {
      console.error('Password update error:', error);
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors || {});
      } else {
        setErrors({ general: 'Failed to update password' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6">
      

      {/* Success Message */}
      {success && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          {success}
        </div>
      )}

      {/* General Error */}
      {errors.general && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {errors.general}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 px-6 py-4 font-semibold transition-colors ${
              activeTab === 'profile'
                ? 'bg-[#0C1B4D] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Profile Information
          </button>
          <button
            onClick={() => setActiveTab('password')}
            className={`flex-1 px-6 py-4 font-semibold transition-colors ${
              activeTab === 'password'
                ? 'bg-[#0C1B4D] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Change Password
          </button>
        </div>

        <div className="p-8">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <form onSubmit={handleProfileUpdate}>
              {/* Profile Picture */}
              <div className="flex flex-col items-center mb-8">
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                  />
                  <label className="absolute bottom-0 right-0 bg-[#0C1B4D] text-white p-2 rounded-full cursor-pointer hover:bg-[#1a2d6b] transition">
                    <Camera size={20} />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
                {errors.profileImage && (
                  <p className="text-red-500 text-sm mt-2">{errors.profileImage}</p>
                )}
                <p className="text-gray-500 text-sm mt-2">Click camera icon to change picture</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <User size={16} className="inline mr-2" />
                    First Name
                  </label>
                  <input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0C1B4D]"
                    required
                  />
                  {errors.prenom && (
                    <p className="text-red-500 text-sm mt-1">{errors.prenom[0]}</p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <User size={16} className="inline mr-2" />
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0C1B4D]"
                    required
                  />
                  {errors.nom && (
                    <p className="text-red-500 text-sm mt-1">{errors.nom[0]}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Mail size={16} className="inline mr-2" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0C1B4D]"
                    required
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Phone size={16} className="inline mr-2" />
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="tel"
                    value={formData.tel}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0C1B4D]"
                    required
                  />
                  {errors.tel && (
                    <p className="text-red-500 text-sm mt-1">{errors.tel[0]}</p>
                  )}
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 bg-[#0C1B4D] text-white px-6 py-3 rounded-lg hover:bg-[#1a2d6b] transition disabled:opacity-50"
                >
                  <Save size={20} />
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          )}

          {/* Password Tab */}
          {activeTab === 'password' && (
            <form onSubmit={handlePasswordUpdate}>
              <div className="space-y-6 max-w-md mx-auto">
                {/* Current Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Lock size={16} className="inline mr-2" />
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="current_password"
                    value={formData.current_password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0C1B4D]"
                    required
                  />
                  {errors.current_password && (
                    <p className="text-red-500 text-sm mt-1">{errors.current_password[0]}</p>
                  )}
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Lock size={16} className="inline mr-2" />
                    New Password
                  </label>
                  <input
                    type="password"
                    name="new_password"
                    value={formData.new_password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0C1B4D]"
                    required
                    minLength={6}
                  />
                  {errors.new_password && (
                    <p className="text-red-500 text-sm mt-1">{errors.new_password[0]}</p>
                  )}
                </div>

                {/* Confirm New Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Lock size={16} className="inline mr-2" />
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    name="new_password_confirmation"
                    value={formData.new_password_confirmation}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0C1B4D]"
                    required
                    minLength={6}
                  />
                  {errors.new_password_confirmation && (
                    <p className="text-red-500 text-sm mt-1">{errors.new_password_confirmation[0]}</p>
                  )}
                </div>

                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-[#0C1B4D] text-white px-6 py-3 rounded-lg hover:bg-[#1a2d6b] transition disabled:opacity-50"
                  >
                    <Save size={20} />
                    {loading ? 'Updating...' : 'Update Password'}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;