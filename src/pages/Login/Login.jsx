import React, { useState } from "react";
import { FaGoogle, FaEye, FaEyeSlash, FaUserAlt } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";

const Login = () => {
  const { signIn, googleSignIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    signIn(email, password)
      .then(() => {
        toast.success("Login successful!");
        navigate(location.state ? location.state : "/");
      })
      .catch((err) => {
        setError(err.code || err.message || "Login failed");
        toast.error(err.code || err.message || "Login failed");
      });
  };

  const handleGoogleSignIn = () => {
    setError("");

    googleSignIn()
      .then(() => {
        toast.success("Google Sign-In successful!");
        navigate(location.state ? location.state : "/");
      })
      .catch((err) => {
        setError(err.code || err.message || "Google Sign-In failed");
        toast.error(err.code || err.message || "Google Sign-In failed");
      });
  };

  const handleDemoLogin = () => {
    const demoEmail = "demo@gmail.com";
    const demoPassword = "nafi570N@";

    setEmail(demoEmail);
    setPassword(demoPassword);
    setError("");

    signIn(demoEmail, demoPassword)
      .then(() => {
        toast.success("Logged in as Demo User!");
        navigate(location.state ? location.state : "/");
      })
      .catch((err) => {
        setError(err.code || err.message || "Demo login failed");
        toast.error(err.code || err.message || "Demo login failed");
      });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section */}
      <div className="md:w-1/2 bg-[#137A63] text-white flex flex-col justify-center p-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
          Welcome Back!
        </h2>
        <p className="text-base sm:text-lg md:text-xl leading-relaxed">
          Login to explore your artworks, connect with artists, curate
          favorites, and enjoy a seamless creative experience.
        </p>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 flex justify-center items-center p-6 bg-gray-50 dark:bg-gray-900">
        <div className="card bg-base-100 dark:bg-gray-800 w-full max-w-sm shadow-2xl py-6 px-5 rounded-2xl">
          <h2 className="font-semibold text-2xl text-center text-[#137A63] mb-4">
            Login to your account
          </h2>

          <form onSubmit={handleLogin} className="space-y-3">
            {/* Email */}
            <label className="label">Email</label>
            <input
              type="email"
              className="input w-full"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password */}
            <label className="label">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="input w-full pr-12"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
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
              className="btn bg-[#137A63] hover:bg-[#0f5e4c] text-white w-full border-none"
            >
              Login
            </button>

            {/* Google Login */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="
                flex items-center justify-center gap-2 w-full py-2 rounded-lg border
                bg-white text-black border-gray-300 hover:bg-gray-100
                dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600
                transition
              "
            >
              <FaGoogle className="text-red-500" />
              Login with Google
            </button>

            {/* Demo Login */}
            <button
              type="button"
              onClick={handleDemoLogin}
              className="
                flex items-center justify-center gap-2 w-full py-2 rounded-lg border border-dashed
                text-[#137A63] hover:bg-[#e6f4f1]
                dark:text-green-400 dark:border-gray-600 dark:hover:bg-gray-700
                font-medium transition
              "
            >
              <FaUserAlt />
              Use Demo Account
            </button>

            {/* Register */}
            <p className="font-semibold text-center pt-4">
              Don’t have an account?{" "}
              <Link className="text-[#137A63]" to="/register">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
