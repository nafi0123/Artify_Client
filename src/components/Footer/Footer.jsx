import React from "react";
import Logo from "../../assets/logo1.jpg";
import { FaFacebook, FaInstagram, FaYoutube, FaEnvelope, FaPhone } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0F3D36] text-white py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
        
        {/* ===== Left: Logo & Brand ===== */}
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={Logo}
              alt="Artify Logo"
              className="w-12 h-12 rounded-full object-cover"
            />
            <h2 className="text-2xl font-bold text-white">Artify</h2>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            Discover, share, and showcase your creativity with Artify — a community
            for artists and art lovers.
          </p>
        </div>

        {/* ===== Middle: Contact Info ===== */}
        <div>
          <h4 className="text-lg font-semibold mb-3 border-b border-gray-500 pb-1 w-fit">
            Contact Us
          </h4>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="flex items-center gap-2">
              <FaEnvelope /> <span>support@artify.com</span>
            </li>
            <li className="flex items-center gap-2">
              <FaPhone /> <span>+880 1234-567890</span>
            </li>
          </ul>
        </div>

        {/* ===== Right: Social Media ===== */}
        <div>
          <h4 className="text-lg font-semibold mb-3 border-b border-gray-500 pb-1 w-fit">
            Follow Us
          </h4>
          <div className="flex gap-5 text-2xl">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-[#3b82f6] transition">
              <FaFacebook />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#E4405F] transition">
              <FaInstagram />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-[#FF0000] transition">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* ===== Bottom Line ===== */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Artify. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
