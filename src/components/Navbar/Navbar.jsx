import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router";
import Logo from "../../assets/logo1.jpg";
import {
  FaHome,
  FaImages,
  FaPlusCircle,
  FaHeart,
  FaUserCircle,
  FaTimes,
  FaInfoCircle,
  FaTachometerAlt,
} from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  const navItemStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 dark:border-gray-700 ${
      isActive
        ? "text-[#137A63] bg-[#E6F4F1] shadow-sm dark:text-[#21c997] dark:bg-[#113832]"
        : "text-slate-700 hover:text-[#137A63] hover:bg-slate-100 dark:text-gray-200 dark:hover:text-[#21c997] dark:hover:bg-[#1c1c1c]"
    }`;

  const links = (
    <>
      <NavLink to="/" className={navItemStyle}>
        <FaHome /> Home
      </NavLink>

      <NavLink to="/explore-artworks" className={navItemStyle}>
        <FaImages /> Explore Artworks
      </NavLink>

      <NavLink to="/about-us" className={navItemStyle}>
      <FaInfoCircle /> About Us
    </NavLink>
      
    

      {user && (
        <>
        <NavLink to="/dashboard" className={navItemStyle}>
          <FaTachometerAlt /> Dashboard
        </NavLink>


          
        </>
      )}
    </>
  );

  return (
    <>
      {/* Top Navbar */}
      <div className="navbar bg-white dark:bg-[#0d0d0d] shadow-sm  px-4 flex justify-between items-center">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            className="btn btn-ghost lg:hidden"
            onClick={() => setIsOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 dark:text-gray-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <Link to="/" className="flex items-center gap-2">
            <img src={Logo} className="w-10 h-10 rounded-full object-cover" />
            <span className="text-2xl font-bold text-[#137A63] dark:text-[#21c997]">
              Artify
            </span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-4">{links}</ul>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          {/* Theme */}
          <input
            onChange={(e) => handleTheme(e.target.checked)}
            type="checkbox"
            defaultChecked={theme === "dark"}
            className="toggle dark:border-gray-700"
          />

          {/* User */}
          {!user ? (
            <>
              <Link
                to="/login"
                className="btn btn-sm bg-[#137A63] text-white hidden sm:inline-flex dark:border-gray-700"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-sm btn-outline text-[#137A63] hidden sm:inline-flex dark:border-gray-700"
              >
                Register
              </Link>

              <Link
                to="/login"
                className="text-[#137A63] dark:text-[#21c997] text-2xl sm:hidden dark:border-gray-700"
              >
                <FaUserCircle />
              </Link>
            </>
          ) : (
            <div className="relative group">
              <img
                src={user.photoURL}
                alt="User"
                className="w-10 h-10 rounded-full cursor-pointer border border-gray-300 dark:border-gray-600 object-cover"
              />

              {/* Dropdown */}
              <div
                className="absolute right-0 mt-2 w-48 p-3 rounded-lg shadow-lg 
                bg-white dark:bg-[#1c1c1c] dark:text-gray-200
                opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
              >
                <p className="font-medium text-sm mb-2 truncate">
                  {user.displayName}
                </p>

                <button
                  onClick={logOut}
                  className="btn btn-sm w-full bg-red-500 text-white"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 
          bg-white dark:bg-[#121212]
          border-r border-gray-300 dark:border-gray-700
          shadow-lg transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 z-50 lg:hidden flex flex-col`}
      >
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <div className="flex items-center gap-2">
            <img src={Logo} className="w-10 h-10 rounded-full" />
            <span className="text-xl font-bold text-[#137A63] dark:text-[#21c997]">
              Artify
            </span>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-700 dark:text-gray-300"
          >
            <FaTimes size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">{links}</div>

        <div className="p-4 border-t dark:border-gray-700 flex flex-col items-center gap-3">
          {!user ? (
            <>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="btn btn-sm w-full bg-[#137A63] text-white"
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="btn btn-sm w-full btn-outline text-[#137A63]"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                logOut();
                setIsOpen(false);
              }}
              className="btn btn-sm w-full bg-red-500 text-white"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 dark:bg-black/70 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;
