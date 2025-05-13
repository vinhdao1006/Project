import React from "react";
import facebook_icon from '../../assets/icon/facebook_icon.png';
import linkedin_icon from '../../assets/icon/linkedin_icon.png';
import instagram_icon from '../../assets/icon/instagram_icon.png';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#2F4F2F] to-[#1A3C1A] backdrop-blur-lg text-white py-5 font-sans">
      {/* Top Section */}
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Logo and Motto */}
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-white">
            BIMEC
          </h1>
          <p className="text-sm text-gray-200 leading-relaxed">
            Leading the Way in Medical Excellence, Trusted Care.
          </p>
        </div>

        {/* Important Links */}
        <div>
          <h2 className="text-xl font-semibold mb-5 text-gray-100">Important Links</h2>
          <ul className="space-y-3">
            {["Appointment", "Doctors", "Services", "About Us"].map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="text-sm text-gray-300 hover:text-[#698C55] hover:underline transition-all duration-300"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h2 className="text-xl font-semibold mb-5 text-gray-100">Contact Us</h2>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-center gap-2">
              <i className="fas fa-phone-alt text-[#698C55]"></i>
              <span>(028) 3864-7256</span>
            </li>
            <li className="flex items-center gap-2">
              <i className="fas fa-envelope text-[#698C55]"></i>
              <span>@hcmut.edu.vn.com</span>
            </li>
            <li className="flex items-center gap-2">
              <i className="fas fa-map-marker-alt text-[#698C55]"></i>
              <span>268 Lý Thường Kiệt St., Ward 14, District 10, Hồ Chí Minh city</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="text-xl font-semibold mb-5 text-gray-100">Newsletter</h2>
          <div className="flex items-center bg-white rounded-full h-12 shadow-lg transition-all duration-300 hover:shadow-xl">
            <input
              type="email"
              placeholder="Enter your email address"
              className="px-5 py-2 w-full text-gray-700 rounded-l-full focus:outline-none placeholder-gray-400 text-sm"
            />
            <button className="px-5 bg-[#FFFFFF] hover:scale-110 text-white rounded-r-full h-full transition-transform duration-300">
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
      <div className="border-t border-gray-500/30 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between text-sm px-12">
        <p className="text-gray-300 text-center md:text-left">
          © 2025 BIMEC. All Rights Reserved.
        </p>
        <div className="flex space-x-5 mt-3 md:mt-0">
          {[facebook_icon, linkedin_icon, instagram_icon].map((icon, index) => (
            <a
              key={index}
              href="#"
              className="transform hover:scale-110 transition-transform duration-300"
            >
              <img src={icon} alt="Social Icon" className="w-6 h-6 opacity-80 hover:opacity-100" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;