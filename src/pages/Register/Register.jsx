import React, { useState } from "react";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";

const Register = () => {
  const { createUser, googleSignIn, updateUserProfile } = useAuth();
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
    // const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
    // if (!passwordPattern.test(password)) {
    //   toast.error(
    //     "Password must contain at least one uppercase, one lowercase letter, and be at least 6 characters long."
    //   );
    //   return;
    // }

    createUser(email, password)
      .then(() => {
        return updateUserProfile(name, photo);
      })
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
    <div className="flex justify-center min-h-screen items-center">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
        <h2 className="font-semibold text-2xl text-center text-[#137A63] tracking-tight">
          Create your account
        </h2>

        <form className="card-body" onSubmit={handleRegister}>
          <fieldset className="fieldset">
            {/* Full Name */}
            <label className="label">Full Name</label>
            <input
              name="name"
              type="text"
              className="input"
              placeholder="Full Name"
              required
            />

            {/* Photo URL */}
            <label className="label">Photo URL</label>
            <input
              name="photo"
              type="text"
              className="input"
              placeholder="Photo URL"
              required
            />

            {/* Email */}
            <label className="label">Email</label>
            <input
              name="email"
              type="email"
              className="input"
              placeholder="Email"
              required
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

            {/* Error */}
            {error && <p className="text-red-400 text-xs mb-2">{error}</p>}

            {/* Register Button */}
            <button
              type="submit"
              className="btn bg-[#137A63] hover:bg-[#0f5e4c] text-white mt-2 border-none shadow-md hover:shadow-lg transition-all duration-300 w-full"
            >
              Register
            </button>

            {/* Google Sign-In */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center w-full gap-2 px-4 py-2 rounded-lg border transition-all duration-300 font-medium
             bg-white text-black border-gray-300 hover:bg-gray-100 hover:text-black
             dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white mt-3"
            >
              <FaGoogle className="text-red-500" /> Register with Google
            </button>

            {/* Login Link */}
            <p className="font-semibold text-center pt-5">
              Already have an account?{" "}
              <Link className="text-secondary" to="/login">
                Login
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Register;
