import React, { useState } from "react";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";

const Register = () => {
  const { createUser, googleSignIn, updateUser } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photo = form.photo.value;
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
    if (!passwordPattern.test(password)) {
      toast.error(
        "Password must contain at least one uppercase, one lowercase letter, and be at least 6 characters long."
      );
      return;
    }

    createUser(email, password)
      .then(() => updateUser(name, photo))
      .then(() => {
        toast.success("Account created successfully!");
        navigate("/");
      })
      .catch((err) => {
        setError(err.code || err.message || "Registration failed");
        toast.error(err.code || err.message || "Registration failed");
      });
  };

  const handleGoogleSignIn = () => {
    setError("");
    if (!googleSignIn) return;

    googleSignIn()
      .then(() => {
        toast.success("Google Sign-In successful!");
        navigate("/");
      })
      .catch((err) => {
        setError(err.code || err.message || "Google Sign-In failed");
        toast.error(err.code || err.message || "Google Sign-In failed");
      });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section */}
      <div className="md:w-1/2 bg-[#137A63] text-white flex flex-col justify-center p-8 md:p-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
          Welcome to Artify
        </h2>
        <p className="text-base sm:text-lg md:text-xl leading-relaxed">
          Display your creative works, explore other artists’ galleries,
          curate favorites, and connect through appreciation and interaction.
          <br />
          The website emphasizes creativity, modern UI, and clean navigation
          for art lovers.
        </p>
      </div>

      {/* Right Section (Form) */}
      <div className="md:w-1/2 flex justify-center items-center p-6 bg-gray-50 dark:bg-gray-900">
        <div className="card bg-white dark:bg-gray-800 w-full max-w-md shadow-xl rounded-2xl p-8 sm:p-10 transition-all duration-300">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#137A63] text-center mb-6">
            Create your account
          </h2>

          <form className="space-y-4" onSubmit={handleRegister}>
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700 dark:text-gray-200">
                Full Name
              </label>
              <input
                name="name"
                type="text"
                className="input"
                placeholder="Full Name"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700 dark:text-gray-200">
                Photo URL
              </label>
              <input
                name="photo"
                type="text"
                className="input"
                placeholder="Photo URL"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700 dark:text-gray-200">
                Email
              </label>
              <input
                name="email"
                type="email"
                className="input"
                placeholder="Email"
                required
              />
            </div>

            <div className="flex flex-col relative">
              <label className="mb-1 font-medium text-gray-700 dark:text-gray-200">
                Password
              </label>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className="input pr-10"
                placeholder="Password"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full py-2.5 rounded-full bg-[#137A63] hover:bg-[#0f5e4c] text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
            >
              Register
            </button>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full border border-gray-300 bg-white text-black hover:bg-gray-100 font-medium transition-all duration-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600 mt-3"
            >
              <FaGoogle className="text-red-500" /> Register with Google
            </button>

            <p className="text-center text-gray-600 dark:text-gray-300 mt-4">
              Already have an account?{" "}
              <Link className="text-[#137A63] hover:underline" to="/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
