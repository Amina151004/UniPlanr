import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // SET THE CURRENT ROLE HERE - Just change this variable!
  const CURRENT_ROLE = 'enseignant'; 
  // Options: 'etudiant', 'enseignant', 'chef_departement', 'responsable_planning'
  
  const [user] = useState({
    id: 1,
    name: 'Test User',
    email: 'user@example.com',
    role: CURRENT_ROLE
  });

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};