import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
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
  const location = useLocation();
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
    <aside
      className="w-64 bg-white border-r border-bimec-gray/20 flex flex-col h-screen overflow-hidden shadow-sm fixed left-0 top-0 z-20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Logo Section */}
      <div
        className="flex items-center px-6 py-6 relative overflow-hidden"
        style={{
          background: `linear-gradient(to right, rgba(244, 255, 243, 0.1), rgba(244, 255, 243, ${
            isHovered ? 0.4 : 0.1
          }))`,
          transition: "background 0.5s ease-out",
        }}
      >
        <div
          className="group flex items-center space-x-2 transition-all duration-500 transform hover:scale-105"
          style={{ transformOrigin: "left center" }}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-bimec-green to-bimec-heavy-green rounded-lg flex items-center justify-center shadow-md transition-all duration-300 group-hover:shadow-lg relative overflow-hidden">
            <span className="text-white font-bold text-lg relative z-10">
              B
            </span>
            {/* Animated gradient overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-tr from-bimec-green via-bimec-green to-bimec-heavy-green opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{
                backgroundSize: "200% 200%",
                animation: "gradientShift 3s ease infinite",
              }}
            ></div>
          </div>
          <span className="text-2xl font-bold text-bimec-heavy-green tracking-tight">
            <span className="inline-block transform transition-transform duration-300 group-hover:translate-y-0">
              B
            </span>
            <span className="inline-block transform transition-transform duration-300 delay-75 group-hover:translate-y-0">
              I
            </span>
            <span className="inline-block transform transition-transform duration-300 delay-100 group-hover:translate-y-0">
              M
            </span>
            <span className="inline-block transform transition-transform duration-300 delay-150 group-hover:translate-y-0">
              E
            </span>
            <span className="inline-block transform transition-transform duration-300 delay-200 group-hover:translate-y-0">
              C
            </span>
          </span>
        </div>

        {/* Subtle animated indicator */}
        <div
          className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-bimec-green to-bimec-heavy-green transition-all duration-700 ease-in-out ${
            isHovered ? "w-full" : "w-0"
          }`}
        ></div>
      </div>

      <nav className="flex flex-col mt-6 space-y-1 px-3 flex-grow overflow-y-auto">
        {navItems.map((item, index) => {
          const Icon = item.icon;

          // Check if this item should be considered active
          const isActive =
            location.pathname === item.path ||
            location.pathname.startsWith(item.path + "/");

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                ${
                  isActive
                    ? "bg-bimec-light-green text-bimec-green shadow-sm"
                    : "text-bimec-black/70 hover:bg-bimec-light-green/50 hover:text-bimec-heavy-green"
                }
              `}
              style={{
                transform: `translateX(${isHovered ? "0" : "-4px"})`,
                opacity: isHovered ? 1 : 0.95,
                transition: `transform 0.3s ease-out ${
                  index * 0.05
                }s, opacity 0.3s ease-out ${
                  index * 0.05
                }s, background-color 0.3s, color 0.3s, box-shadow 0.3s`,
              }}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-300 ${
                    isActive ? "scale-110" : ""
                  }`}
                />
                {isActive && (
                  <span
                    className="absolute -top-1 -right-1 w-2 h-2 bg-bimec-green rounded-full"
                    style={{
                      boxShadow: "0 0 0 2px rgba(95, 141, 77, 0.2)",
                      animation: "pulse 2s infinite",
                    }}
                  ></span>
                )}
              </div>
              <span
                className={`text-sm font-medium transition-all duration-300 ${
                  isActive ? "font-semibold" : ""
                }`}
              >
                {item.label}
              </span>

              {isActive && (
                <ChevronRight className="w-4 h-4 ml-auto transition-opacity duration-300" />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Global CSS for animations */}
      <style jsx>{`
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(95, 141, 77, 0.4);
          }
          70% {
            box-shadow: 0 0 0 6px rgba(95, 141, 77, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(95, 141, 77, 0);
          }
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </aside>
  );
};

export default SideBar;
