import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '/src/context/AuthContext.jsx';
import './singupform.css';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

function Signup_form() {
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from context
  
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    tel: "",
    email: "",
    motdepasse: "",
    motdepasse_confirmation: "",
    role: "Étudiant", // Set default role
    id_groupe: null,
    id_sessionexamen: null,
    terms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.terms) {
      setErrors({ terms: 'You must accept the terms and conditions' });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      console.log('Sending registration data:', formData);
      
      const response = await api.post('/register', {
        nom: formData.nom,
        prenom: formData.prenom,
        tel: formData.tel,
        email: formData.email,
        motdepasse: formData.motdepasse,
        motdepasse_confirmation: formData.motdepasse_confirmation,
        role: formData.role,
        id_groupe: formData.id_groupe,
        id_sessionexamen: formData.id_sessionexamen,
      });

      console.log('Registration successful:', response.data);

      // Use the login function from context to store user data
      login(response.data.user, response.data.token);

      alert('Registration successful!');
      navigate('/home'); // Navigate to home
      
    } catch (error) {
      console.error('Registration error:', error);
      console.error('Error response:', error.response?.data);
      
      if (error.response?.status === 422) {
        const backendErrors = error.response.data.errors || {};
        setErrors(backendErrors);
        
        // Show validation errors in alert
        const errorMessages = Object.entries(backendErrors)
          .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages[0] : messages}`)
          .join('\n');
        
        alert(`Validation failed:\n\n${errorMessages}`);
      } else {
        setErrors({ general: 'Registration failed. Please try again.' });
        alert('Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      {errors.general && (
        <div className="error-message" style={{color: 'red', marginBottom: '10px'}}>
          {errors.general}
        </div>
      )}
      
      <div className="left">
        <input 
          type="text" 
          name="nom"
          placeholder="Nom" 
          value={formData.nom} 
          onChange={handleChange}
          required
        />
        {errors.nom && <span className="error" style={{color: 'red', fontSize: '12px'}}>{errors.nom[0]}</span>}
        
        <input 
          type="text" 
          name="prenom"
          placeholder="Prénom" 
          value={formData.prenom} 
          onChange={handleChange}
          required
        />
        {errors.prenom && <span className="error" style={{color: 'red', fontSize: '12px'}}>{errors.prenom[0]}</span>}
        
        <input 
          type="tel" 
          name="tel"
          placeholder="Téléphone" 
          value={formData.tel} 
          onChange={handleChange}
          required
        />
        {errors.tel && <span className="error" style={{color: 'red', fontSize: '12px'}}>{errors.tel[0]}</span>}
        
        <input 
          type="email" 
          name="email"
          placeholder="Email" 
          value={formData.email} 
          onChange={handleChange}
          required
        />
        {errors.email && <span className="error" style={{color: 'red', fontSize: '12px'}}>{errors.email[0]}</span>}
      </div>
      
      <div className="right">
        <input 
          type="password" 
          name="motdepasse"
          placeholder="Mot de passe" 
          value={formData.motdepasse} 
          onChange={handleChange}
          required
        />
        {errors.motdepasse && <span className="error" style={{color: 'red', fontSize: '12px'}}>{errors.motdepasse[0]}</span>}
        
        <input 
          type="password" 
          name="motdepasse_confirmation"
          placeholder="Confirmer mot de passe"
          value={formData.motdepasse_confirmation} 
          onChange={handleChange}
          required
        />
        
        <div className="role-input">
          <select name="role" value={formData.role} onChange={handleChange} required>
            <option value="">Sélectionner un rôle</option>
            <option value="Chef">Chef</option>
            <option value="Responsable">Responsable</option>
            <option value="Enseignant">Enseignant</option>
            <option value="Étudiant">Étudiant</option>
          </select>
          {errors.role && <span className="error" style={{color: 'red', fontSize: '12px'}}>{errors.role[0]}</span>}
        </div>
        
        <label className="terms">
          <input 
            type="checkbox" 
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
          />
          <p>I accept all the terms and conditions</p>
        </label>
        {errors.terms && <span className="error" style={{color: 'red', fontSize: '12px'}}>{errors.terms}</span>}

        <button 
          type="submit" 
          className="signup-btn"
          disabled={isLoading}
        >
          {isLoading ? 'Signing up...' : 'Sign Up'}
        </button>
      </div>
    </form>
  );
}

export default Signup_form;