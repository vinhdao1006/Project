import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { jwtDecode } from "jwt-decode";
import {
  MagnifyingGlassIcon,
  HomeIcon,
  InformationCircleIcon,
  BriefcaseIcon,
  UserGroupIcon,
  NewspaperIcon,
  PhoneIcon,
  UserIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  CalendarDateRangeIcon,
} from "@heroicons/react/24/outline";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const dropdownRef = useRef(null);

  // Scroll to top when location changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const decodedToken = jwtDecode(token);
          const response = await axios.get(
            `http://localhost:3001/api/users/${decodedToken.email}`
          );
          setIsLoggedIn(true);
          setUserName(`${response.data.firstname} ${response.data.lastname}`);
          setUserRole(response.data.role);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        localStorage.removeItem("token");
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserName("");
    setUserRole("");
    navigate("/default/home");
  };

  // Custom link handler to ensure page scrolls to top
  const handleNavClick = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: "/default/home", label: "Home", icon: HomeIcon },
    { path: "/default/about-us", label: "About", icon: InformationCircleIcon },
    { path: "/default/services", label: "Services", icon: BriefcaseIcon },
    { path: "/default/doctors", label: "Doctors", icon: UserGroupIcon },
    { path: "/default/news", label: "News", icon: NewspaperIcon },
    { path: "/default/contact", label: "Contact", icon: PhoneIcon },
  ];

  return (
    <>
      {/* Spacer for fixed navbar */}
      <div className="h-20"></div>

      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-lg ${
          isScrolled
            ? "bg-white/95 shadow-lg border-b border-gray-100"
            : "bg-white/90"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo with Animation */}
            <button
              onClick={() => handleNavClick("/default/home")}
              className="group flex items-center space-x-2 transform transition-all duration-300 hover:scale-105"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-bimec-green to-bimec-heavy-green rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="text-2xl font-bold text-bimec-heavy-green">
                BIMEC
              </span>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link, index) => (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`group relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg
                    ${
                      isActive(link.path)
                        ? "text-bimec-green"
                        : "text-gray-700 hover:text-bimec-heavy-green"
                    }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="relative z-10">{link.label}</span>

                  {/* Active/Hover Background */}
                  <div
                    className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                      isActive(link.path)
                        ? "bg-bimec-light-green scale-100 opacity-100"
                        : "bg-gray-100 scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100"
                    }`}
                  />
                </button>
              ))}
            </nav>

            {/* Desktop Right Section */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Animated Search Bar */}
              <div
                className={`relative transition-all duration-300 ${
                  searchFocused ? "w-64" : "w-56"
                }`}
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className="w-full h-10 pl-10 pr-4 text-sm border-2 border-gray-200 rounded-full focus:outline-none focus:border-bimec-green transition-all duration-300"
                  placeholder="Search..."
                />
                <MagnifyingGlassIcon
                  className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                    searchFocused ? "text-bimec-green" : "text-gray-400"
                  }`}
                />
              </div>

              {/* Auth Section */}
              {isLoggedIn ? (
                <Menu as="div" className="relative">
                  <Menu.Button className="group flex items-center space-x-3 px-4 py-2 rounded-full bg-gray-50 hover:bg-bimec-light-green transition-all duration-300">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-bimec-green to-bimec-heavy-green flex items-center justify-center text-white font-medium shadow-sm group-hover:shadow-md transition-shadow duration-300">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {userName}
                    </span>
                    <svg
                      className="w-4 h-4 text-gray-500 group-hover:rotate-180 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-150"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">
                          {userName}
                        </p>
                        <p className="text-xs text-gray-500">{userRole}</p>
                      </div>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => handleNavClick("/profile")}
                            className={`flex items-center space-x-3 px-4 py-3 text-sm transition-colors duration-200 w-full text-left ${
                              active
                                ? "bg-bimec-light-green text-bimec-heavy-green"
                                : "text-gray-700"
                            }`}
                          >
                            <UserIcon className="w-5 h-5" />
                            <span>Profile</span>
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() =>
                              handleNavClick("/default/appointments")
                            }
                            className={`flex items-center space-x-3 px-4 py-3 text-sm transition-colors duration-200 w-full text-left ${
                              active
                                ? "bg-bimec-light-green text-bimec-heavy-green"
                                : "text-gray-700"
                            }`}
                          >
                            <CalendarDateRangeIcon className="w-5 h-5" />
                            <span>My Appointments</span>
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => handleNavClick("/settings")}
                            className={`flex items-center space-x-3 px-4 py-3 text-sm transition-colors duration-200 w-full text-left ${
                              active
                                ? "bg-bimec-light-green text-bimec-heavy-green"
                                : "text-gray-700"
                            }`}
                          >
                            <Cog6ToothIcon className="w-5 h-5" />
                            <span>Settings</span>
                          </button>
                        )}
                      </Menu.Item>
                      <div className="border-t border-gray-100">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleLogout}
                              className={`flex items-center space-x-3 w-full px-4 py-3 text-sm transition-colors duration-200 text-left ${
                                active
                                  ? "bg-red-50 text-red-600"
                                  : "text-gray-700"
                              }`}
                            >
                              <ArrowRightOnRectangleIcon className="w-5 h-5" />
                              <span>Logout</span>
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleNavClick("/login")}
                    className="text-sm font-medium text-gray-700 hover:text-bimec-heavy-green transition-colors duration-200"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleNavClick("/register")}
                    className="text-sm font-medium text-white bg-gradient-to-r from-bimec-green to-bimec-heavy-green px-5 py-2.5 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <XMarkIcon className="w-6 h-6 text-gray-700" />
              ) : (
                <Bars3Icon className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <Transition
            show={isMenuOpen}
            enter="transition ease-out duration-300"
            enterFrom="opacity-0 -translate-y-4"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-4"
          >
            <div className="lg:hidden py-4 border-t border-gray-100">
              {/* Mobile Search */}
              <div className="px-4 pb-4">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-10 pl-10 pr-4 text-sm border-2 border-gray-200 rounded-full focus:outline-none focus:border-bimec-green transition-colors duration-200"
                    placeholder="Search..."
                  />
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <nav className="flex flex-col">
                {navLinks.map((link, index) => (
                  <button
                    key={link.path}
                    onClick={() => handleNavClick(link.path)}
                    className={`flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-all duration-200 text-left w-full
                      ${
                        isActive(link.path)
                          ? "text-bimec-green bg-bimec-light-green border-l-4 border-bimec-green"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <link.icon className="w-5 h-5" />
                    <span>{link.label}</span>
                  </button>
                ))}

                {/* Mobile Auth Section */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  {isLoggedIn ? (
                    <>
                      <div className="px-4 py-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-bimec-green to-bimec-heavy-green flex items-center justify-center text-white font-medium">
                            {userName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {userName}
                            </p>
                            <p className="text-xs text-gray-500">{userRole}</p>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleNavClick("/profile")}
                        className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
                      >
                        <UserIcon className="w-5 h-5" />
                        <span>Profile</span>
                      </button>
                      <button
                        onClick={() => handleNavClick("/settings")}
                        className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
                      >
                        <Cog6ToothIcon className="w-5 h-5" />
                        <span>Settings</span>
                      </button>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 text-left"
                      >
                        <ArrowRightOnRectangleIcon className="w-5 h-5" />
                        <span>Logout</span>
                      </button>
                    </>
                  ) : (
                    <div className="px-4 space-y-3">
                      <button
                        onClick={() => handleNavClick("/login")}
                        className="block w-full text-center px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50"
                      >
                        Login
                      </button>
                      <button
                        onClick={() => handleNavClick("/register")}
                        className="block w-full text-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-bimec-green to-bimec-heavy-green rounded-full"
                      >
                        Sign Up
                      </button>
                    </div>
                  )}
                </div>
              </nav>
            </div>
          </Transition>
        </div>
      </header>
    </>
  );
};

export default Navbar;
