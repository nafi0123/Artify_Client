import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigation } from "react-router";
import Loading from "../components/Loading/Loading";
import {
  FaHeart,
  FaPlusCircle,
  FaUserCircle,
  FaBars,
  FaRegUserCircle,
  FaChartBar,
} from "react-icons/fa";
import Logo from "../assets/logo1.jpg";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const navigation = useNavigation();
  const { state } = navigation;
  const { user, logOut } = useAuth();

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const navItemStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 dark:border-gray-700 ${
      isActive
        ? "text-[#137A63] bg-[#E6F4F1] shadow-sm dark:text-[#21c997] dark:bg-[#113832]"
        : "text-slate-700 hover:text-[#137A63] hover:bg-slate-100 dark:text-gray-200 dark:hover:text-[#21c997] dark:hover:bg-[#1c1c1c]"
    }`;

  return (
    <div className="drawer lg:drawer-open">
      {/* ✅ Uncontrolled input for DaisyUI */}
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Drawer content */}
      <div className="drawer-content flex flex-col min-h-screen bg-base-200">
        {/* Navbar */}
        <nav className="navbar bg-white dark:bg-[#121212] shadow-sm sticky top-0 z-50 px-4 md:px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {/* Mobile menu toggle */}
            <label
              htmlFor="dashboard-drawer"
              className="btn btn-ghost lg:hidden p-2"
            >
              <FaBars size={22} className="text-gray-700 dark:text-gray-200" />
            </label>
            {/* <h1 className="text-xl font-bold text-[#137A63] dark:text-[#21c997]">
              Dashboard
            </h1> */}
            <Link
              to="/"
              className="flex items-center gap-2  dark:border-gray-700"
            >
              <img
                src={Logo}
                className="w-10 h-10 rounded-full object-cover"
                alt="Artify Logo"
              />
              <span className="text-2xl font-bold text-[#137A63] dark:text-[#21c997]">
                Artify
              </span>
            </Link>
          </div>

          {/* Theme toggle */}
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="toggle toggle-sm"
                checked={theme === "dark"}
                onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
              />
              <span className="text-sm text-gray-700 dark:text-gray-200">
                Dark Mode
              </span>
            </label>
          </div>
        </nav>

        {/* Page content */}
        <main className="flex-1 min-h-[calc(100vh-64px)] ">
          {state === "loading" ? <Loading /> : <Outlet />}
        </main>
      </div>

      {/* Drawer Sidebar */}
      <div className="drawer-side">
        {/* Overlay for mobile */}
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

        <aside className="flex flex-col h-full bg-white dark:bg-[#1c1c1c] w-64 lg:w-64 shadow-md">
          {/* Logo */}
          {user && (
            <div className="flex items-center gap-3 px-4 py-2.5 border-b border-gray-200 dark:border-gray-700">
              <img
                src={user.photoURL || Logo} // fallback logo if no photo
                alt={user.displayName || "User"}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <span className="font-medium text-gray-700 dark:text-gray-200 truncate">
                  {user.displayName || "Anonymous"}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {user.email}
                </span>
              </div>
            </div>
          )}

          {/* Sidebar Menu */}
          <ul className="menu p-4 flex-1 space-y-2">
            <NavLink to="/dashboard/artworks-stats" className={navItemStyle}>
              <FaChartBar /> Artworks Stats
            </NavLink>
            <NavLink to="/dashboard/profile" className={navItemStyle}>
              <FaRegUserCircle /> My Profile
            </NavLink>
            <NavLink to="/dashboard/add-artwork" className={navItemStyle}>
              <FaPlusCircle /> Add Artwork
            </NavLink>

            <NavLink to="/dashboard/my-gallery" className={navItemStyle}>
              <FaUserCircle /> My Gallery
            </NavLink>

            <NavLink to="/dashboard/favorites" className={navItemStyle}>
              <FaHeart /> My Favorites
            </NavLink>
          </ul>

          {/* Logout button */}
          {user && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={logOut}
                className="btn w-full bg-red-500 text-white hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
