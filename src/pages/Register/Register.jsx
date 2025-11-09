import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
    const { createUser, setUser, updateUser } = useAuth();
  const [nameError, setNameError] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    // const re = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
    // if (!re.test(password)) {
    //   setError(
    //     "Password must contain at least one uppercase, one lowercase letter, and be at least 6 characters long."
    //   );
     
    //   return;
    // } else {
    //   setError("");
    // }

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            
            navigate("/");
          })
          .catch(() => {
            setUser(user);
          });
      })
      .catch((err) => {
        setError(err.message || "Registration failed");
       
      });
  };
    return (
          <div className="flex justify-center items-center min-h-screen ">

      <div className="card bg-white w-full max-w-sm shadow-2xl rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-center text-[#137A63] mb-5">
          Register your account
        </h2>

        <form className="space-y-4" onSubmit={handleRegister}>
          {/* Name */}
          <div className="flex flex-col">
            <label className="label">Name</label>
            <input
              name="name"
              type="text"
              className="input input-bordered"
              placeholder="Name"
              required
            />
            {nameError && (
              <p className="text-xs text-red-500 mt-1">{nameError}</p>
            )}
          </div>

          {/* Photo URL */}
          <div className="flex flex-col">
            <label className="label">Photo URL</label>
            <input
              name="photo"
              type="text"
              className="input input-bordered"
              placeholder="Photo URL"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="label">Email</label>
            <input
              name="email"
              type="email"
              className="input input-bordered"
              placeholder="Email"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col relative">
            <label className="label">Password</label>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              className="input input-bordered pr-10"
              placeholder="Password"
              required
            />
            <button
              type="button"
              className="absolute right-5 top-11 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash size={19} /> : <FaEye size={19} />}
            </button>
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-xs text-center">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="btn bg-[#137A63] hover:bg-[#0f5e4c] text-white w-full mt-2 shadow-md transition-all duration-300"
          >
            Register
          </button>

          {/* Login Link */}
          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link className="text-[#137A63] font-semibold" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
    );
};

export default Register;