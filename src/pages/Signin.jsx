import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '/src/context/AuthContext.jsx';

// Configure axios
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

export default function Signin() {
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from context
  
  const [email, setEmail] = useState('');
  const [motdepasse, setMotdepasse] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!motdepasse) {
      newErrors.motdepasse = 'Password is required';
    } else if (motdepasse.length < 6) {
      newErrors.motdepasse = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setErrors({});
    
    try {
      console.log('Attempting login with:', { email });
      
      const response = await api.post('/login', {
        email,
        motdepasse,
      });

      console.log('Login successful:', response.data);

      // Use the login function from context to store user data
      login(response.data.user, response.data.token);

      // Set default authorization header for future requests
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

      alert('Login successful!');
      navigate('/home');
      
    } catch (error) {
      console.error('Login error:', error);
      console.error('Error response:', error.response?.data);
      
      if (error.response?.status === 422) {
        const backendErrors = error.response.data.errors || {};
        setErrors(backendErrors);
        
        // Show error message
        const errorMessages = Object.entries(backendErrors)
          .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages[0] : messages}`)
          .join('\n');
        
        alert(`Login failed:\n\n${errorMessages}`);
      } else {
        setErrors({ general: error.response?.data?.message || 'Login failed. Please try again.' });
        alert(error.response?.data?.message || 'Login failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#153474] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-10">
        <div className="flex justify-center mb-8">
          <img 
            src="src/assets/logo.png" 
            alt="School Logo" 
            className="w-32 h-24 object-contain"
          />
        </div>

        <h2 className="w-full font-inter font-bold text-[32px] leading-[100%] tracking-[0%] text-center text-[#0F224B] mb-8">
          Welcome Back!
        </h2>

        {errors.general && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 bg-gray-50 border ${
                errors.email ? 'border-red-500' : 'border-gray-200'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all`}
              placeholder="Email"
              required
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {Array.isArray(errors.email) ? errors.email[0] : errors.email}
              </p>
            )}
          </div>

          <div>
            <input
              id="motdepasse"
              type="password"
              value={motdepasse}
              onChange={(e) => setMotdepasse(e.target.value)}
              className={`w-full px-4 py-3 bg-gray-50 border ${
                errors.motdepasse ? 'border-red-500' : 'border-gray-200'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all`}
              placeholder="Password"
              required
            />
            {errors.motdepasse && (
              <p className="mt-1 text-sm text-red-500">
                {Array.isArray(errors.motdepasse) ? errors.motdepasse[0] : errors.motdepasse}
              </p>
            )}
          </div>

          <div className="flex items-center">
            <input
              id="remember"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 text-blue-900 border-gray-300 rounded focus:ring-blue-900 focus:ring-2"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
              Remember me
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Logging in...
              </span>
            ) : (
              'Login'
            )}
          </button>

          <p className="text-center text-sm text-gray-600 mt-8">
            You don't have an account?{' '}
            <a href="#" onClick={() => navigate('/signup')} className="text-blue-900 hover:text-blue-700 font-semibold transition-colors">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}