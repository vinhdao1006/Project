import React from "react";

const Footer = () => {
  return (
    <footer className="bg-green-800 text-white py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Motto */}
        <div>
          <h1 className="text-3xl font-bold text-green-200">BIMEC</h1>
          <p className="mt-4 text-sm">
            Leading the Way in Medical Excellence, Trusted Care.
          </p>
        </div>

        {/* Important Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Important Links</h2>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Appointment</a></li>
            <li><a href="#" className="hover:underline">Doctors</a></li>
            <li><a href="#" className="hover:underline">Services</a></li>
            <li><a href="#" className="hover:underline">About Us</a></li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
          <ul className="space-y-2 text-sm">
            <li>Call: (237) 681-812-255</li>
            <li>Email: fildineesoe@gmail.com</li>
            <li>Address: 0123 Some place, Some country</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Newsletter</h2>
          <div className="flex items-center bg-white rounded-full overflow-hidden">
            <input
              type="email"
              placeholder="Enter your email address"
              className="px-4 py-2 w-full text-gray-700 focus:outline-none"
            />
            <button className="px-4 py-2 bg-green-600 text-white hover:bg-green-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12h15m0 0-6-6m6 6-6 6"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-green-700 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between text-sm">
        <p>&copy; 2024 BIMEC All Rights Reserved</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 3.75v16.5m0-16.5L12 7.5m4.5-3.75H3.75A2.25 2.25 0 001.5 6v12a2.25 2.25 0 002.25 2.25h16.5A2.25 2.25 0 0022.5 18V6a2.25 2.25 0 00-2.25-2.25H16.5z"
              />
            </svg>
          </a>
          <a href="#" className="hover:text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.75 6.75H5.25A2.25 2.25 0 003 9v6a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 15V9a2.25 2.25 0 00-2.25-2.25zM5.25 9v6M21 9v6M3 15a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 15H3z"
              />
            </svg>
          </a>
          <a href="#" className="hover:text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 3.75H9A5.25 5.25 0 003.75 9v6A5.25 5.25 0 009 20.25h6a5.25 5.25 0 005.25-5.25V9A5.25 5.25 0 0015 3.75zM9 13.5h6m-6-3.75h6"
              />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
