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
} from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  const navItemStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
      isActive
        ? "text-[#137A63] bg-[#E6F4F1] shadow-sm dark:text-[#137A63] dark:bg-[#0f3f35]"
        : "text-slate-700 hover:text-[#137A63] hover:bg-slate-100 dark:text-white dark:hover:text-[#137A63] dark:hover:bg-slate-800"
    }`;

  const links = (
    <>
      <NavLink to="/" className={navItemStyle}>
        <FaHome /> Home
      </NavLink>

      <NavLink to="/explore" className={navItemStyle}>
        <FaImages /> Explore Artworks
      </NavLink>

      {user && (
        <>
          <NavLink to="/add-artwork" className={navItemStyle}>
            <FaPlusCircle /> Add Artwork
          </NavLink>

          <NavLink to="/my-gallery" className={navItemStyle}>
            <FaUserCircle /> My Gallery
          </NavLink>

          <NavLink to="/favorites" className={navItemStyle}>
            <FaHeart /> My Favorites
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <>
      {/* 🔹 Top Navbar */}
      <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50 px-4 flex justify-between items-center">
        {/* Left: Hamburger + Logo */}
        <div className="flex items-center gap-3">
          <button
            className="btn btn-ghost lg:hidden"
            onClick={() => setIsOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
            <img
              src={Logo}
              alt="Artify Logo"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="text-2xl font-bold text-[#137A63]">Artify</span>
          </Link>
        </div>

        {/* Center: Menu links (desktop only) */}
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-4">{links}</ul>
        </div>

        {/* Right side: Theme + Login/Profile */}
        <div className="flex items-center gap-4">
          {/* 🌙 Theme Toggle */}
          <input
            onChange={(e) => handleTheme(e.target.checked)}
            type="checkbox"
            defaultChecked={localStorage.getItem("theme") === "dark"}
            className="toggle"
          />

          {/* 👤 User Icon / Login */}
          {!user ? (
            <>
              <Link
                to="/login"
                className="btn btn-sm bg-[#137A63] text-white hidden sm:inline-flex"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-sm btn-outline text-[#137A63] hidden sm:inline-flex"
              >
                Register
              </Link>
              <Link to="/login" className="text-[#137A63] text-2xl sm:hidden">
                <FaUserCircle />
              </Link>
            </>
          ) : (
            <div className="relative group">
              <img
                src={user.photoURL}
                alt={user?.displayName || "User"}
                className="w-10 h-10 rounded-full cursor-pointer border border-gray-300 object-cover"
              />

              <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-lg p-3 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200">
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

      {/* 🔹 Sidebar (Mobile) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-50 lg:hidden flex flex-col`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center gap-2">
            <img
              src={Logo}
              alt="Artify Logo"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="text-xl font-bold text-[#137A63]">Artify</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-600">
            <FaTimes size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">{links}</div>

        <div className="p-4 border-t flex flex-col items-center gap-3">
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
          className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;
