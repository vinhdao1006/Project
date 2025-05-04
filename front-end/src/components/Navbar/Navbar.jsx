import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { ChevronDownIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const decodedToken = jwtDecode(token);
          const response = await axios.get(`http://localhost:3001/api/users/${decodedToken.email}`);
          setIsLoggedIn(true);
          setUserName(`${response.data.firstname} ${response.data.lastname}`);
          setUserRole(response.data.role);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        localStorage.removeItem('token');
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserName("");
    setUserRole("");
    setShowDropdown(false);
    navigate('/');
  };

  const handleProfileClick = () => {
    navigate('/profile');
    setShowDropdown(false);
  };

  const handleSettingsClick = () => {
    navigate('/settings');
    setShowDropdown(false);
  };

  // Function to determine the active link
  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-screen h-16">
      <header className="w-full h-16 bg-bimec-green flex items-center px-4 md:px-8 lg:px-16">
        {/* Logo */}
        <a href="/default/home" className="text-bimec-black font-bold text-lg md:text-xl">
          BIMEC
        </a>

        {/* Desktop Links */}
        <nav className="hidden lg:flex ml-10 space-x-6">
          <a
            href="/default/home"
            className={`${
              isActive("/default/home") ? "text-bimec-heavy-green font-bold" : "text-white"
            }`}
          >
            Home
          </a>
          <a
            href="/default/about-us"
            className={`${
              isActive("/default/about-us") ? "text-bimec-heavy-green font-bold" : "text-white"
            }`}
          >
            About Us
          </a>
          <a
            href="/default/services"
            className={`${
              isActive("/default/services") ? "text-bimec-heavy-green font-bold" : "text-white"
            }`}
          >
            Services
          </a>
          <a
            href="/default/doctors"
            className={`${
              isActive("/default/doctors") ? "text-bimec-heavy-green font-bold" : "text-white"
            }`}
          >
            Doctors
          </a>
          <a
            href="/default/news"
            className={`${
              isActive("/default/news") ? "text-bimec-heavy-green font-bold" : "text-white"
            }`}
          >
            News
          </a>
          <a
            href="/default/contact"
            className={`${
              isActive("/default/contact") ? "text-bimec-heavy-green font-bold" : "text-white"
            }`}
          >
            Contact
          </a>
        </nav>

        {/* Search Bar */}
        <div className="hidden lg:flex ml-auto items-center">
          <button className="ml-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
          <input
            type="text"
            className="rounded-full w-56 h-8 ml-5 pl-5 text-gray-700 focus:outline-none"
            placeholder="Search here..."
          />
        </div>

        {/* Auth Buttons */}
        <div className="hidden lg:flex items-center ml-6" ref={dropdownRef}>
          {isLoggedIn ? (
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
                <UserCircleIcon className="h-8 w-8" />
                <span className="text-sm font-medium">{userName}</span>
                <ChevronDownIcon className="h-4 w-4" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/profile"
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } block px-4 py-2 text-sm text-gray-700`}
                      >
                        Profile
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/settings"
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } block px-4 py-2 text-sm text-gray-700`}
                      >
                        Settings
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleLogout}
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                      >
                        Logout
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          ) : (
            <div className="flex items-center space-x-4">
              <a
                href="/login"
                className="text-white hover:text-bimec-heavy-green transition"
              >
                Login
              </a>
              <a
                href="/register"
                className="bg-bimec-heavy-green text-white px-4 py-2 rounded hover:bg-bimec-green transition"
              >
                Sign Up
              </a>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden ml-auto text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 5.25h16.5M3.75 12h16.5m-16.5 6.75h16.5"
            />
          </svg>
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 bg-bimec-green lg:hidden flex flex-col items-start px-4 py-4 space-y-4 
            h-[32vh] md:h-[28vh] overflow-y-auto">
            <a
              href="/default/home"
              className={`md:text-lg ${
                isActive("/default/home") ? "text-bimec-heavy-green font-bold" : "text-white"
              }`}
            >
              Home
            </a>
            <a
              href="/default/about-us"
              className={`md:text-lg ${
                isActive("/default/about-us") ? "text-bimec-heavy-green font-bold" : "text-white"
              }`}
            >
              About Us
            </a>
            <a
              href="/default/services"
              className={`md:text-lg ${
                isActive("/default/services") ? "text-bimec-heavy-green font-bold" : "text-white"
              }`}
            >
              Services
            </a>
            <a
              href="/default/doctors"
              className={`md:text-lg ${
                isActive("/default/doctors") ? "text-bimec-heavy-green font-bold" : "text-white"
              }`}
            >
              Doctors
            </a>
            <a
              href="/default/news"
              className={`md:text-lg ${
                isActive("/default/news") ? "text-bimec-heavy-green font-bold" : "text-white"
              }`}
            >
              News
            </a>
            <a
              href="/default/contact"
              className={`md:text-lg ${
                isActive("/default/contact") ? "text-bimec-heavy-green font-bold" : "text-white"
              }`}
            >
              Contact
            </a>
            {isLoggedIn ? (
              <>
                <button
                  onClick={handleProfileClick}
                  className="text-white hover:text-bimec-heavy-green transition md:text-lg"
                >
                  Profile
                </button>
                <button
                  onClick={handleSettingsClick}
                  className="text-white hover:text-bimec-heavy-green transition md:text-lg"
                >
                  Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-bimec-heavy-green transition md:text-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <a
                  href="/login"
                  className="text-white hover:text-bimec-heavy-green transition md:text-lg"
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="text-white hover:text-bimec-heavy-green transition md:text-lg"
                >
                  Sign Up
                </a>
              </>
            )}
            {/* Close Button */}
            <button
              className="mt-4 text-white md:text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Close
            </button>
          </div>
        )}
      </header>
    </div>
  );
};

export default Navbar;