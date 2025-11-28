import React, { useState } from "react";
import DashEtud from "../components/dashEtud.jsx";
import Calendar from "../components/calendar.jsx";

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
  const [activePage, setActivePage] = useState("home"); // 👈 controls content + active icon

  // icon styles
  const iconClasses = (page) =>
    page === activePage
      ? "p-2 bg-white rounded-full text-[#0C1B4D]"
      : "p-2 text-white";

  // 👇 the content that changes based on sidebar
  const renderContent = () => {
    switch (activePage) {
      case "home":
        return <DashEtud />;
      case "calendar":
        return <Calendar />;
      default:
        return <DashEtud />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#0C1B4D]">
      {/* Sidebar */}
      <div className="w-28 text-white flex flex-col items-center py-4 gap-8">
        <button>
          <Menu size={32} className="text-white" />
        </button>

        <ul className="flex flex-col gap-3">

          {/* HOME */}
          <li
            onClick={() => setActivePage("home")}
            className="cursor-pointer"
          >
            <div className={iconClasses("home")}>
              <Home size={22} />
            </div>
          </li>

          {/* USER */}
          <li
            onClick={() => setActivePage("user")}
            className="cursor-pointer"
          >
            <div className={iconClasses("user")}>
              <User size={22} />
            </div>
          </li>

          {/* CALENDAR */}
          <li
            onClick={() => setActivePage("calendar")}
            className="cursor-pointer"
          >
            <div className={iconClasses("calendar")}>
              <CalendarDays size={22} />
            </div>
          </li>

          {/* SETTINGS */}
          <li
            onClick={() => setActivePage("settings")}
            className="cursor-pointer"
          >
            <div className={iconClasses("settings")}>
              <Settings size={22} />
            </div>
          </li>

        </ul>

        <div className="mt-auto cursor-pointer">
          <button className="p-2 text-white">
            <LogOut size={28} />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="w-full m-4 p-8 bg-[#EEF0FF] rounded-3xl overflow-auto">
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

        {/* 👇 THIS is where the page switches */}
        {renderContent()}
      </div>
    </div>
  );
};

export default dashboard;
