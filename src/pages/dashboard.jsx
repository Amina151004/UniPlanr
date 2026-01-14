import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DashEtud from "../components/dashEtud.jsx";
import Calendar from "../components/calendar.jsx";
import Chefdepartement from "../components/Chefdepartement.jsx";
import ChefProfile from "./Chefprofile.jsx";
import Etuprofile from "./Etuprofile.jsx";
import { useAuth } from "/src/context/AuthContext.jsx";
import TeacherDashbord from "./TeacherDashboard.jsx";
import ExamDashboard from "./ExamDashboard.jsx";
import Setting from "./settings.jsx";
import Responsabledash from "./responsabledash.jsx";
import ResponsableProfile from "./ResponsableProfile.jsx";

 


import {
  Bell,
  User,
  Menu,
  Home,
  CalendarDays,
  Settings,
  LogOut,
  X
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
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const iconClasses = (page) =>
    page === activePage
      ? "p-2 bg-white rounded-full text-[#0C1B4D]"
      : "p-2 text-white";

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await api.post('/logout');
      }
      
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('userRole');
      
      if (logout) {
        logout();
      }
      
      navigate('/login');
      
    } catch (error) {
      console.error('Logout error:', error);
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

  const handlePageChange = (page) => {
    setActivePage(page);
    setIsMobileSidebarOpen(false);
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
            return <TeacherDashbord />;
          case "settings":
            return <Setting />;
          case "calendar":
            return <Calendar />;
          default:
            return <ExamDashboard/>;
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
            return <Responsabledash />;
          case "profile":
            return <ResponsableProfile />;
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
    <div className="flex h-screen w-full bg-[#0C1B4D] overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Desktop */}
      <div
        className={`hidden lg:flex ${
          isSidebarOpen ? "w-28" : "w-16"
        } text-white flex-col items-center py-4 gap-8 transition-all duration-300`}
      >
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="mb-4"
        >
          <Menu size={32} className="text-white" />
        </button>

        {isSidebarOpen && (
          <>
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

              <li onClick={() => setActivePage("calendar")} className="cursor-pointer">
                <div className={iconClasses("calendar")}>
                  <CalendarDays size={22} />
                </div>
              </li>

              <li onClick={() => setActivePage("settings")} className="cursor-pointer">
                <div className={iconClasses("settings")}>
                  <Settings size={22} />
                </div>
              </li>
            </ul>

            <div className="mt-auto cursor-pointer">
              <button 
                onClick={handleLogout}
                className="p-2 text-white hover:bg-white hover:text-[#0C1B4D] rounded-full transition-colors"
                title="Logout"
              >
                <LogOut size={28} />
              </button>
            </div>
          </>
        )}
      </div>

      {/* Sidebar - Mobile */}
      <div
        className={`fixed lg:hidden top-0 left-0 h-full w-64 bg-[#0C1B4D] text-white z-50 transform transition-transform duration-300 ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-4 ">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-white">Menu</h2>
            <button onClick={() => setIsMobileSidebarOpen(false)}>
              <X size={24} />
            </button>
          </div>

          <ul className="flex flex-col gap-4">
            <li 
              onClick={() => handlePageChange("home")} 
              className="cursor-pointer flex items-center gap-3 p-3 rounded-lg hover:bg-white/10"
            >
              <Home size={22} />
              <span className="text-white">Home</span>
            </li>

            <li 
              onClick={() => handlePageChange("profile")} 
              className="cursor-pointer flex items-center gap-3 p-3 rounded-lg hover:bg-white/10"
            >
              <User size={22} />
              <span className="text-white">Profile</span>
            </li>

            <li 
              onClick={() => handlePageChange("calendar")} 
              className="cursor-pointer flex items-center gap-3 p-3 rounded-lg hover:bg-white/10"
            >
              <CalendarDays size={22} />
              <span className="text-white">Calendar</span>
            </li>

            <li 
              onClick={() => handlePageChange("settings")} 
              className="cursor-pointer flex items-center gap-3 p-3 rounded-lg hover:bg-white/10"
            >
              <Settings size={22} />
              <span className="text-white">Settings</span>
            </li>
          </ul>

          <div className="mt-auto">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/10"
            >
              <LogOut size={22} />
              <span className="text-white">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 m-2 lg:m-4 p-4 lg:p-8 bg-[#EEF0FF] rounded-3xl overflow-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <button 
              className="lg:hidden"
              onClick={() => setIsMobileSidebarOpen(true)}
            >
              <Menu size={24} className="text-[#0C1B4D]" />
            </button>
            <h1 className="text-xl lg:text-2xl font-bold">{pageTitles[activePage]}</h1>
          </div>

          <div className="flex items-center gap-2 lg:gap-4">
            <button>
              <Bell size={22} lg:size={26} className="text-[#0C1B4D]" />
            </button>

            <div className="flex items-center gap-2">
              <img
                src={
                  user?.profile_picture && user.profile_picture !== 'user.png'
                    ? `http://localhost:8000/storage/${user.profile_picture}`
                    : 'src/assets/user.png'
                }
                className="h-8 w-8 lg:h-10 lg:w-10 rounded-full"
                alt="profile"
              />
              <span className="hidden sm:block font-medium text-sm lg:text-base">
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