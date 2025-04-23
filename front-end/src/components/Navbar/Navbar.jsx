import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to determine the active link
  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-screen h-16">
      <header className="w-full h-16 bg-bimec-green flex items-center px-4 sm:px-8 lg:px-16">
        {/* Logo */}
        <a href="/home" className="text-bimec-black font-bold text-lg sm:text-2xl">
          BIMEC
        </a>

        {/* Desktop Links */}
        <nav className="hidden lg:flex ml-10 space-x-6">
          <a
            href="/home"
            className={`${
              isActive("/home") ? "text-bimec-heavy-green font-bold" : "text-white"
            }`}
          >
            Home
          </a>
          <a
            href="/about-us"
            className={`${
              isActive("/about-us") ? "text-bimec-heavy-green font-bold" : "text-white"
            }`}
          >
            About Us
          </a>
          <a
            href="/services"
            className={`${
              isActive("/services") ? "text-bimec-heavy-green font-bold" : "text-white"
            }`}
          >
            Services
          </a>
          <a
            href="/doctors"
            className={`${
              isActive("/doctors") ? "text-bimec-heavy-green font-bold" : "text-white"
            }`}
          >
            Doctors
          </a>
          <a
            href="/news"
            className={`${
              isActive("/news") ? "text-bimec-heavy-green font-bold" : "text-white"
            }`}
          >
            News
          </a>
          <a
            href="/contact"
            className={`${
              isActive("/contact") ? "text-bimec-heavy-green font-bold" : "text-white"
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
          <div className="absolute top-16 left-0 w-full bg-bimec-green lg:hidden flex flex-col items-start px-4 py-4 space-y-4">
            <a
              href="/home"
              className={`${
                isActive("/home") ? "text-bimec-heavy-green font-bold" : "text-white"
              }`}
            >
              Home
            </a>
            <a
              href="/about-us"
              className={`${
                isActive("/about-us") ? "text-bimec-heavy-green font-bold" : "text-white"
              }`}
            >
              About Us
            </a>
            <a
              href="/services"
              className={`${
                isActive("/services") ? "text-bimec-heavy-green font-bold" : "text-white"
              }`}
            >
              Services
            </a>
            <a
              href="/doctors"
              className={`${
                isActive("/doctors") ? "text-bimec-heavy-green font-bold" : "text-white"
              }`}
            >
              Doctors
            </a>
            <a
              href="/news"
              className={`${
                isActive("/news") ? "text-bimec-heavy-green font-bold" : "text-white"
              }`}
            >
              News
            </a>
            <a
              href="/contact"
              className={`${
                isActive("/contact") ? "text-bimec-heavy-green font-bold" : "text-white"
              }`}
            >
              Contact
            </a>
          </div>
        )}
      </header>
    </div>
  );
};

export default Navbar;