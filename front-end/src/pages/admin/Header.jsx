import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
function Header() {
  const [user, setUser] = useState({ firstname: "...", lastname: "...", role: "..." });
  const location = useLocation();

  // Map routes to their corresponding names
  const routeNames = {
    "/admin/appointments": "Appointments",
    "/admin/patients": "Patients",
    "/admin/doctor-schedule": "Schedule",
    "/admin/dashboard": "Dashboard",
    "/admin/departments": "Departments",
  };

  const activeRouteName = routeNames[location.pathname] || "Dashboard";

  useEffect(() => {
  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/users/user-info", {
        withCredentials: true,
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  fetchUserData();
}, []);

  return (
    <header className="flex items-center justify-between px-8 py-4">
      <div className="flex items-center gap-6">
        <button
          aria-label="Toggle sidebar"
          className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400 rounded-full"
        >
          {/* <i className="fas fa-chevron-left"></i> */}
        </button>
        <h1 className="text-2xl font-extrabold text-[#111827] select-none">{activeRouteName}</h1>
      </div>
      <div className="flex gap-6 max-w-lg w-full justify-end items-center">
        <div className="relative">
          {/* <input
            type="search"
            placeholder="Search"
            className="w-full rounded-full border border-gray-200 bg-[#F9FAFB] py-2.5 pl-10 pr-4 text-gray-500 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#2F4F2F] focus:border-transparent"
          />
          <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none"></i> */}
          <button
          aria-label="Notifications"
          className="p-2 rounded-lg bg-white border border-gray-200 text-gray-400 hover:text-gray-600 hover:border-gray-300 transition"
            >
            <i className="far fa-bell"></i>
            </button>
        </div>
        
        <div className="flex items-center gap-3 cursor-pointer select-none">
          {/* <img
            alt="Profile picture of Dr John Smith wearing white coat and tie"
            className="w-8 h-8 rounded-full object-cover"
            src="https://storage.googleapis.com/a1aa/image/c2bab0f3-f67d-4f8c-c5d7-4e715c9fe8eb.jpg"
            width="32"
            height="32"
          /> */}
          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-sm text-[#111827]">
              {user.firstname + " " + user.lastname}
            </span>
            <span className="text-xs text-gray-400">{user.role}</span>
          </div>
          <i className="fas fa-chevron-down text-gray-400"></i>
        </div>
      </div>
    </header>
  );
}

export default Header;