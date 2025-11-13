import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const ErrorPage = ({ status = 404, message = "Page Not Found" }) => {
  const navigate = useNavigate();
  const [animateNumber, setAnimateNumber] = useState(false);

  // State to store current theme
  const [theme, setTheme] = useState("light");

  // Check localStorage for saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
  }, []);

  // Trigger number animation
  useEffect(() => {
    const timer = setTimeout(() => setAnimateNumber(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Determine colors based on theme
  const bgColor = theme === "dark" ? "#111827" : "#ffffff"; // dark or white
  const textColor = theme === "dark" ? "#f9fafb" : "#111827"; // text color
  const subTextColor = theme === "dark" ? "#9ca3af" : "#6b7280"; // subtitle color

  return (
    <div
      style={{ backgroundColor: bgColor, color: textColor }}
      className="flex flex-col items-center justify-center min-h-screen px-4 transition-colors duration-500 bg-[#fdfaf6]  dark:bg-gray-900"
    >
      {/* 404 Number */}
      <h1
        style={{ color: textColor }}
        className={`text-9xl font-extrabold transform transition-all duration-700 ${
          animateNumber ? "scale-100 animate-bounce" : "scale-50 opacity-0"
        }`}
      >
        {status}
      </h1>

      {/* Main Message */}
      <p className="text-2xl sm:text-3xl font-semibold mt-4 text-center">
        {message}
      </p>

      {/* Sub Message */}
      <p className="mt-2 text-center" style={{ color: subTextColor }}>
        Oops! Looks like you are lost.
      </p>

      {/* Go Back Home Button */}
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-3 bg-[#137A63] text-white rounded-lg transform transition-transform duration-300 hover:scale-110 hover:shadow-lg hover:bg-[#0f5d4c]"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default ErrorPage;
