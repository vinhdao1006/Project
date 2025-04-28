import React from "react";
import facebook_icon from '../../assets/icon/facebook_icon.png';
import linkedin_icon from '../../assets/icon/linkedin_icon.png';
import instagram_icon from '../../assets/icon/instagram_icon.png';

const Footer = () => {
  return (
    <footer className="bg-bimec-heavy-green text-white py-10">
      {/* Top Section */}
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo and Motto */}
        <div>
          <h1 className="text-3xl font-bold text-bimec-green">BIMEC</h1>
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
          <div className="flex items-center bg-white rounded-full overflow-hidden h-10">
            <input
              type="email"
              placeholder="Enter your email address"
              className="px-4 py-2 w-full text-gray-700 focus:outline-none"
            />
            <button className="px-4 bg-bimec-green text-white flex items-center justify-center h-full">
              <img
                src="/src/assets/icon/send_icon.png"
                alt="Send"
                className="w-5 h-5"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-white mt-8 pt-6 flex flex-col md:flex-row items-center justify-between text-sm px-6">
        <p className="text-center md:text-left">&copy; 2024 BIMEC All Rights Reserved</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="hover:opacity-80">
            <img src={facebook_icon} alt="Facebook" className="w-5 h-5" />
          </a>
          <a href="#" className="hover:opacity-80">
            <img src={linkedin_icon} alt="LinkedIn" className="w-5 h-5" />
          </a>
          <a href="#" className="hover:opacity-80">
            <img src={instagram_icon} alt="Instagram" className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;