import React, { useState } from "react";
import DashEtud from "../components/dashEtud.jsx";
import Calendar from "../components/calendar.jsx";
import Chefdepartement from "../components/Chefdepartement.jsx";
import ChefProfile from "./Chefprofile.jsx";
import Etuprofile from "./Etuprofile.jsx";
import { useAuth } from "/src/context/AuthContext.jsx";

import {
  Bell,
  User,
  Menu,
  Home,
  CalendarDays,
  Settings,
  LogOut,
} from "lucide-react";

export const dashboard = () => {
  const { user } = useAuth();
  const [activePage, setActivePage] = useState("Chefdartement"); // content control
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // sidebar open/close

  const iconClasses = (page) =>
    page === activePage
      ? "p-2 bg-white rounded-full text-[#0C1B4D]"
      : "p-2 text-white";

  const renderContent = () => {
    switch (user.role) {
      case "etudiant":
        switch (activePage) {
          case "home":
            return <DashEtud />;
          case "grades":
            return <div>Mes Notes - Étudiant</div>;
          case "profile":
            return <Etuprofile/>;
          case "settings":
            return <div>Settings Étudiant</div>;
          case "calendar":
            return <Calendar />;
          default:
            return <DashEtud />;
        }

      case "enseignant":
        switch (activePage) {
          case "home":
            return <div>Dashboard Enseignant</div>;
          case "classes":
            return <div>Mes Classes</div>;
          case "profile":
            return <div>Profile Enseignant</div>;
          case "settings":
            return <div>Settings Enseignant</div>;
          case "calendar":
            return <Calendar />;
          default:
            return <div>Dashboard Enseignant</div>;
        }

      case "chef_departement":
        switch (activePage) {
          case "home":
            return <Chefdepartement />;
          case "profile":
            return <ChefProfile />;
          case "department":
            return <div>Gestion Département</div>;
          case "settings":
            return <div>Settings Chef</div>;
          case "calendar":
            return <Calendar />;
          default:
            return <Chefdepartement />;
        }

      case "responsable_planning":
        switch (activePage) {
          case "home":
            return <div>Dashboard Planning</div>;
          case "schedules":
            return <div>Gestion des Plannings</div>;
          case "profile":
            return <div>Profile Responsable</div>;
          case "settings":
            return <div>Settings Planning</div>;
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
            <button className="p-2 text-white">
              <LogOut size={28} />
            </button>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="w-full m-4 p-8 bg-[#EEF0FF] rounded-3xl overflow-auto transition-all duration-300">
        {/* Header */}
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold m-1 ml-8">Dashboard</h1>

          <div className="flex items-center gap-4">
            <button>
              <Bell size={26} className="text-[#0C1B4D]" />
            </button>

            <div className="flex items-center gap-2 m-1">
              <img
                src="src/assets/user.png"
                className="h-10 w-10 rounded-full"
                alt="profile"
              />
              <span className="font-medium text-base">Username</span>
            </div>
          </div>
        </div>

        {/* Page Content */}
        { renderContent() }

      </div>
    </div>
  );
};

export default dashboard;
