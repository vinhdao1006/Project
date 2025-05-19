import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  Users,
  UserRound,
  Building2,
  ClipboardList,
  ChevronRight,
} from "lucide-react";

const SideBar = () => {
  const [isHovered, setIsHovered] = useState(false);

  const navItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/admin/appointments", label: "Appointments", icon: Calendar },
    { path: "/admin/patients", label: "Patients", icon: Users },
    { path: "/admin/doctors", label: "Doctors", icon: UserRound },
    { path: "/admin/departments", label: "Departments", icon: Building2 },
    {
      path: "/admin/doctor-schedule",
      label: "Doctor's Schedule",
      icon: ClipboardList,
    },
  ];

  return (
    <div
      className="w-50 h-screen bg-white border-r border-gray-100 flex flex-col py-6 shadow-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo Section */}
      <div className="px-6 mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-bimec-green to-bimec-heavy-green rounded-lg flex items-center justify-center shadow-sm transition-shadow duration-300 hover:shadow-md">
            <span className="text-white font-bold text-lg">B</span>
          </div>
          <span className="text-2xl font-bold text-bimec-heavy-green">
            BIMEC
          </span>
        </div>
        <div className="mt-2 h-0.5 bg-gradient-to-r from-bimec-green/80 to-transparent rounded-full"></div>
      </div>

      {/* Navigation */}
      <nav className="space-y-1 px-3 flex-grow overflow-y-auto">
        {navItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
        flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
        ${
          isActive
            ? "bg-bimec-light-green text-bimec-green font-medium"
            : "text-gray-600 hover:bg-gray-50 hover:text-bimec-green"
        }
      `}
              style={{
                transform: `translateX(${isHovered ? "0" : "-4px"})`,
                opacity: isHovered ? 1 : 0.97,
                transition: `transform 0.3s ease ${
                  index * 0.04
                }s, opacity 0.3s ease ${
                  index * 0.04
                }s, background-color 0.2s, color 0.2s`,
              }}
            >
              {({ isActive }) => (
                <>
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                  {isActive && (
                    <ChevronRight className="w-4 h-4 ml-auto text-bimec-green" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default SideBar;
