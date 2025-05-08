import React from 'react';
import { NavLink } from 'react-router-dom';
import BimecLogo from '../../assets/icon/Bimec_logo.png';

function Sidebar() {
  return (
    <aside className="w-48 bg-white border-r border-gray-200 flex flex-col">
      <div className="flex items-center gap-2 px-6 py-6 border-b border-gray-200">
        <img
          alt="BIMEC logo"
          className="w-6 h-6"
          src={BimecLogo}
          width="24"
          height="24"
        />
        <span className="font-extrabold text-xl text-[#2F4F2F] select-none">
          BIMEC
        </span>
      </div>
      <nav className="flex flex-col mt-6 space-y-1 px-2">
        <NavLink
          to="/doctor/appointments"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-3 px-4 py-3 rounded-xl text-[#2F4F2F] bg-[#E6F6FF] font-semibold select-none"
              : "flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition"
          }
        >
          <i className="far fa-clipboard text-lg"></i>
          <span className="text-sm font-bold select-none">Appointments</span>
        </NavLink>
        <NavLink
          to="/doctor/patients"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-3 px-4 py-3 rounded-xl text-[#2F4F2F] bg-[#E6F6FF] font-semibold select-none"
              : "flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition"
          }
        >
          <i className="fas fa-users text-lg"></i>
          <span className="text-sm font-bold select-none">Patients</span>
        </NavLink>
        <NavLink
          to="/doctor/schedule"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-3 px-4 py-3 rounded-xl text-[#2F4F2F] bg-[#E6F6FF] font-semibold select-none"
              : "flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition"
          }
        >
          <i className="far fa-calendar-alt text-lg"></i>
          <span className="text-sm font-bold select-none">Schedule</span>
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;