import React, { useState } from "react";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast"; // ✅ import toast

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
    <div className="flex justify-center min-h-screen items-center">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
        <h2 className="font-semibold text-2xl text-center text-[#137A63] tracking-tight">
          Login your account
        </h2>

        <form className="card-body" onSubmit={handleLogin}>
          <fieldset className="fieldset">
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
                className="absolute right-5 top-5 -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={19} /> : <FaEye size={19} />}
              </button>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end mt-2 mb-2 ">
              <Link
                to="/forgot-password"
                state={{ email }}
                className="text-sm text-green-700 hover:underline cursor-pointer"
              >
                Forgot password?
              </Link>
            </div>

            {/* Error */}
            {error && <p className="text-red-400 text-xs mb-2">{error}</p>}

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
              className="btn bg-white text-black border border-[#e5e5e5] flex items-center gap-2 hover:bg-gray-100 hover:text-black transition-all duration-300 mt-3 w-full justify-center"
              onClick={handleGoogleSignIn}
            >
              <FaGoogle /> Login with Google
            </button>

            {/* Register Link */}
            <p className="font-semibold text-center pt-5">
              Don’t have an account?{" "}
              <Link className="text-secondary" to="/register">
                Register
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Login;
