import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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