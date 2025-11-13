import React, { useState } from "react";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";

const Login = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, googleSignIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        toast.success("Login successful!");
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((err) => {
        console.error("Login error:", err);
        setError(err.code || err.message || "Login failed");
        toast.error(err.code || err.message || "Login failed");
      });
  };

  const handleGoogleSignIn = () => {
    setError("");
    if (!googleSignIn) return;

    googleSignIn()
      .then((res) => {
        toast.success("Google Sign-In successful!");
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((err) => {
        setError(err.code || err.message || "Google Sign-In failed");
        toast.error(err.code || err.message || "Google Sign-In failed");
      });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section */}
      <div className="md:w-1/2 bg-[#137A63] text-white flex flex-col justify-center p-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Welcome Back!</h2>
        <p className="text-base sm:text-lg md:text-xl leading-relaxed">
          Login to explore your artworks, connect with artists, curate favorites, 
          and enjoy a seamless creative experience.
          <br />
          The platform emphasizes creativity, modern UI, and clean navigation for art lovers.
        </p>
      </div>

      {/* Right Section (Form) */}
      <div className="md:w-1/2 flex justify-center items-center p-6 bg-gray-50 dark:bg-gray-900">
        <div className="card bg-base-100 w-full max-w-sm shadow-2xl py-5">
          <h2 className="font-semibold text-2xl text-center text-[#137A63] tracking-tight">
            Login to your account
          </h2>

          <form className="card-body" onSubmit={handleLogin}>
            <fieldset className="space-y-3">
              {/* Email */}
              <label className="label">Email</label>
              <input
                name="email"
                type="email"
                className="input"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {/* Password */}
              <label className="label">Password</label>
              <div className="relative">
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

              {/* Forgot Password */}
              <div className="flex justify-end mt-2 mb-2">
                <Link
                  to="/forgot-password"
                  state={{ email }}
                  className="text-green-700 hover:underline text-sm"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Error */}
              {error && <p className="text-red-400 text-xs">{error}</p>}

              {/* Login Button */}
              <button
                type="submit"
                className="btn bg-[#137A63] hover:bg-[#0f5e4c] text-white mt-2 border-none shadow-md hover:shadow-lg transition-all duration-300 w-full"
              >
                Login
              </button>

              {/* Google Sign-In */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="flex items-center justify-center w-full gap-2 px-4 py-2 rounded-lg border transition-all duration-300 font-medium
                  bg-white text-black border-gray-300 hover:bg-gray-100 hover:text-black
                  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white mt-3"
              >
                <FaGoogle className="text-red-500" /> Login with Google
              </button>

              {/* Register Link */}
              <p className="font-semibold text-center pt-5">
                Don’t have an account?{" "}
                <Link className="text-[#137A63]" to="/register">
                  Register
                </Link>
              </p>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
