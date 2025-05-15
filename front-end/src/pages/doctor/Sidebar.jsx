// Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ClipboardList, Users, Calendar } from 'lucide-react';
import BimecLogo from '../../assets/icon/Bimec_logo.png';

function Sidebar() {
  const navItems = [
    { path: "/doctor/appointments", label: "Appointments", icon: ClipboardList },
    { path: "/doctor/patients", label: "Patients", icon: Users },
    { path: "/doctor/schedule", label: "Schedule", icon: Calendar },
  ];

  return (
    <aside className="w-64 bg-white border-r border-bimec-gray/20 flex flex-col h-screen">
      <div className="flex items-center gap-3 px-6 py-7">
        <img
          alt="BIMEC logo"
          className="w-8 h-8"
          src={BimecLogo}
          width="32"
          height="32"
        />
        <span className="font-bold text-xl text-bimec-heavy-green tracking-tight">
          BIMEC
        </span>
      </div>
      
      <nav className="flex flex-col mt-2 space-y-1 px-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                ${isActive 
                  ? "bg-bimec-light-green text-bimec-green shadow-sm" 
                  : "text-bimec-black/70 hover:bg-bimec-light-green/50 hover:text-bimec-heavy-green"
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span className={`text-sm font-medium`}>
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;