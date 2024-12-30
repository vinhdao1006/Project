import React from "react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  // Function to determine the active link
  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-screen h-16">
      <header className="w-full h-16 bg-bimec-green flex items-center">
        <a
          href="/home"
          className={`relative ml-5 pl-44 font-bold ${
            isActive("/home") ? "text-bimec-heavy-green" : "text-white"
          }`}
        >
          Home
        </a>
        <a
          href="/about-us"
          className={`relative ml-5 ${
            isActive("/about-us") ? "text-bimec-heavy-green font-bold" : "text-white"
          }`}
        >
          About us
        </a>
        <a
          href="/services"
          className={`relative ml-5 ${
            isActive("/services") ? "text-bimec-heavy-green font-bold" : "text-white"
          }`}
        >
          Services
        </a>
        <a
          href="/doctors"
          className={`relative ml-5 ${
            isActive("/doctors") ? "text-bimec-heavy-green font-bold" : "text-white"
          }`}
        >
          Doctors
        </a>
        <a
          href="/news"
          className={`relative ml-5 ${
            isActive("/news") ? "text-bimec-heavy-green font-bold" : "text-white"
          }`}
        >
          News
        </a>
        <a
          href="/contact"
          className={`relative ml-5 ${
            isActive("/contact") ? "text-bimec-heavy-green font-bold" : "text-white"
          }`}
        >
          Contact
        </a>

        <div className="ml-auto flex mr-32 items-center">
          <button className="ml-5 submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-white"
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
            className="rounded-full w-56 h-8 ml-5 pl-5"
            placeholder="Search here..."
          />
        </div>
      </header>
    </div>
  );
};

export default Navbar;
