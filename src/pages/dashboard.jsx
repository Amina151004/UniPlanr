import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DashEtud from "../components/dashEtud.jsx";
import Calendar from "../components/calendar.jsx";
import Chefdepartement from "../components/Chefdepartement.jsx";
import ChefProfile from "./Chefprofile.jsx";
import Etuprofile from "./Etuprofile.jsx";
import { useAuth } from "/src/context/AuthContext.jsx";
import ExamDashboard from "./ExamDashboard.jsx";
import Setting from "./settings.jsx";

import {
  Bell,
  User,
  Menu,
  Home,
  CalendarDays,
  Settings,
  LogOut,
} from "lucide-react";

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

export const dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const iconClasses = (page) =>
    page === activePage
      ? "p-2 bg-white rounded-full text-[#0C1B4D]"
      : "p-2 text-white";

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (token) {
        // Set authorization header
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Call logout endpoint
        await api.post('/logout');
      }
      
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('userRole');
      
      // Call logout from context (if available)
      if (logout) {
        logout();
      }
      
      // Redirect to login page
      navigate('/login');
      
    } catch (error) {
      console.error('Logout error:', error);
      
      // Even if API call fails, clear local data and redirect
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('userRole');
      
      if (logout) {
        logout();
      }
      
      navigate('/login');
    }
  };

  const pageTitles = {
  home: "Dashboard",
  profile: "Profile",
  calendar: "Calendar",
  settings: "Settings"
};


  const renderContent = () => {
    switch (user?.role) {
      case "Étudiant":
      case "etudiant":
        switch (activePage) {
          case "home":
            return <DashEtud />;
          case "profile":
            return <Etuprofile/>;
          case "settings":
            return <Setting />;
          case "calendar":
            return <Calendar />;
          default:
            return <DashEtud />;
        }

      case "Enseignant":
      case "enseignant":
        switch (activePage) {
          case "home":
            return <ExamDashboard/>;
          case "profile":
            return <TeacherDashbord />;;
          case "settings":
            return <Setting />;
          case "calendar":
            return <Calendar />;
          default:
            return <ExamDashboard/>;;
        }

      case "Chef":
      case "chef_departement":
        switch (activePage) {
          case "home":
            return <Chefdepartement />;
          case "profile":
            return <ChefProfile />;
          case "settings":
            return <Setting />;
          case "calendar":
            return <Calendar />;
          default:
            return <Chefdepartement />;
        }

      case "Responsable":
      case "responsable_planning":
        switch (activePage) {
          case "home":
            return <div>Dashboard Planning</div>;
          case "profile":
            return <div>Profile Responsable</div>;
          case "settings":
            return <Setting />;
          case "calendar":
            return <Calendar />;
          default:
            return <div>Dashboard Planning</div>;
        }

      default:
        return <div>Role non reconnu</div>;
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#0C1B4D]">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-28" : "w-16"
        } text-white flex flex-col items-center py-4 gap-8 transition-all duration-300`}
      >
        {/* Menu */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="mb-4"
        >
          <Menu size={32} className="text-white" />
        </button>

        {/* Only show icons if sidebar open */}
        {isSidebarOpen && (
          <ul className="flex flex-col gap-3">
            <li onClick={() => setActivePage("home")} className="cursor-pointer">
              <div className={iconClasses("home")}>
                <Home size={22} />
              </div>
            </li>

            <li onClick={() => setActivePage("profile")} className="cursor-pointer">
              <div className={iconClasses("profile")}>
                <User size={22} />
              </div>
            </li>

            <li
              onClick={() => setActivePage("calendar")}
              className="cursor-pointer"
            >
              <div className={iconClasses("calendar")}>
                <CalendarDays size={22} />
              </div>
            </li>

            <li
              onClick={() => setActivePage("settings")}
              className="cursor-pointer"
            >
              <div className={iconClasses("settings")}>
                <Settings size={22} />
              </div>
            </li>
          </ul>
        )}

        {/* Logout */}
        {isSidebarOpen && (
          <div className="mt-auto cursor-pointer">
            <button 
              onClick={handleLogout}
              className="p-2 text-white hover:bg-white rounded-full transition-colors"
              title="Logout"
            >
              <LogOut size={28} />
            </button>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="w-full m-4 p-8 bg-[#EEF0FF] rounded-3xl overflow-auto transition-all duration-300">
        {/* Header */}
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold m-1 ml-8">{pageTitles[activePage]}</h1>

          <div className="flex items-center gap-4">
            <button>
              <Bell size={26} className="text-[#0C1B4D]" />
            </button>

            <div className="flex items-center gap-2">
              <img
  src={
    user?.profile_picture && user.profile_picture !== 'user.png'
      ? `http://localhost:8000/storage/${user.profile_picture}`
      : 'src/assets/user.png'
  }
  className="h-10 w-10 rounded-full"
  alt="profile"
/>
              <span className="font-medium text-base">
                {user?.prenom} {user?.nom}
              </span>
            </div>
          </div>
        </div>

        {/* Page Content */}
        {renderContent()}
      </div>
    </div>
  );
};

export default dashboard;