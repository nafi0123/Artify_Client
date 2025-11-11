import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading/Loading";
import { useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";

const ForgotPass = () => {
  const { user, resetPassword } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location]);

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email!");
      return;
    }

    setLoading(true);

    resetPassword(email)
      .then(() => {
        toast.success("Password reset email sent! Check your inbox 📧");
      })
      .catch((err) => {
        toast.error(err.message || "Failed to send reset email");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md bg-base-100 shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
          Reset Your Password
        </h2>

        <form className="space-y-5" onSubmit={handleResetPassword}>
          {/* Email Field */}
          <div>
            <label className="block text-gray-600 mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-800"
              placeholder="Enter your email"
            />
          </div>

          {/* Reset Button */}
          <button
            type="submit"
            className="btn bg-[#137A63] hover:bg-[#0f5e4c] text-white mt-2 border-none shadow-md hover:shadow-lg transition-all duration-300 w-full"
            disabled={loading}
          >
            {loading ? "Sending..." : "Reset Password"}
          </button>

          {/* Go Back Link */}
          <p
            className="text-center hover:underline cursor-pointer text-[#137A63] tracking-tight"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPass;
