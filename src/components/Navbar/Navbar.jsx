import React from "react";
import { NavLink, Link } from "react-router";
import Logo from "../../assets/logo1.jpg";
import {
  FaHome,
  FaImages,
  FaPlusCircle,
  FaHeart,
  FaUserCircle,
} from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const navItemStyle = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
      isActive
        ? "text-[#137A63] bg-[#E6F4F1] shadow-sm"
        : "text-slate-700 hover:text-[#137A63] hover:bg-slate-100"
    }`;

  const links = (
    <>
      <NavLink to="/" className={navItemStyle}>
        <FaHome />
        Home
      </NavLink>

      <NavLink to="/explore" className={navItemStyle}>
        <FaImages />
        Explore Artworks
      </NavLink>

      {user && (
        <>
          <NavLink to="/add-artwork" className={navItemStyle}>
            <FaPlusCircle />
            Add Artwork
          </NavLink>

          <NavLink to="/my-gallery" className={navItemStyle}>
            <FaUserCircle />
            My Gallery
          </NavLink>

          <NavLink to="/favorites" className={navItemStyle}>
            <FaHeart />
            My Favorites
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50 px-4">
      {/* Left: Logo */}
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
          </label>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {links}
          </ul>
        </div>

        {/* ✅ Logo & Text aligned */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={Logo}
            alt="Artify Logo"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="text-2xl font-bold text-[#137A63] leading-none">
            Artify
          </span>
        </Link>
      </div>

      {/* Center: Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-4">{links}</ul>
      </div>

      {/* ✅ Right side */}
      <div className="navbar-end flex items-center gap-3 relative">
        {/* ✅ User Icon or Profile Image */}
        {!user ? (
          <Link to="/login" className="text-[#137A63] text-2xl">
            <FaUserCircle />
          </Link>
        ) : (
          <div className="relative group">
            <img
              src={user.photoURL}
              alt={user.displayName}
              className="w-10 h-10 rounded-full cursor-pointer border border-gray-300 object-cover"
            />
            {/* Hover dropdown */}
            <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-lg p-3 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200">
              <p className="font-medium text-sm mb-2 truncate">{user.displayName}</p>
              <button
                onClick={logOut}
                className="btn btn-sm w-full bg-red-500 text-white"
              >
                Logout
              </button>
            </div>
          </div>
        )}

        {/* ✅ Login/Register buttons */}
        {!user && (
          <>
            <Link
              to="/login"
              className="btn btn-sm bg-[#137A63] text-white"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="btn btn-sm btn-outline text-[#137A63]"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
