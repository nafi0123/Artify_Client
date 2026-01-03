import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { FaUserEdit, FaSave } from "react-icons/fa";
import { toast } from "react-hot-toast";

const MyProfile = () => {
  const { user, updateUser, setLoading } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(
    user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"
  );

  const handleSaveProfile = () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    setLoading(true);

    updateUser({
      displayName: name,
      photoURL: photo,
    })
      .then(() => {
        toast.success("Profile updated successfully!");
        setIsEditing(false);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to update profile");
        setLoading(false);
      });
  };

  return (
    <section className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 px-4 md:px-10 py-10">
      {/* Page Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 text-center">
        My <span className="text-[#137A63]">Profile</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Image */}
        <div className="flex flex-col items-center bg-white dark:bg-gray-800  rounded-xl shadow-md p-6">
          <img
            src={photo}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-[#137A63] dark:border-[#21c997]"
          />

          {/* Photo URL input (edit mode only) */}
          {isEditing && (
            <input
              type="text"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              placeholder="Photo URL"
              className="mt-4 w-full px-3 py-2 text-sm rounded-lg border
                         bg-gray-100 dark:bg-gray-800
                         text-gray-800 dark:text-gray-200"
            />
          )}
        </div>

        {/* Profile Info */}
        <div className="md:col-span-2 bg-white dark:bg-gray-800  rounded-xl shadow-md p-6 md:p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
            Personal Information
          </h2>

          <div className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                readOnly={!isEditing}
                className={`mt-1 w-full px-4 py-2 rounded-lg border
                  ${
                    isEditing
                      ? "bg-white dark:bg-gray-800 border-[#137A63]"
                      : "bg-gray-100 dark:bg-gray-800"
                  }
                  text-gray-800 dark:text-gray-200`}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                Email Address
              </label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="mt-1 w-full px-4 py-2 rounded-lg border
                           bg-gray-100 dark:bg-gray-800
                           text-gray-800 dark:text-gray-200"
              />
            </div>

            {/* Action Button */}
            <div className="pt-4">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-6 py-2
                             bg-[#137A63] hover:bg-[#0f5e4c]
                             text-white rounded-lg transition shadow"
                >
                  <FaUserEdit />
                  Edit Profile
                </button>
              ) : (
                <button
                  onClick={handleSaveProfile}
                  className="flex items-center gap-2 px-6 py-2
                             bg-[#137A63] hover:bg-[#0f5e4c]
                             text-white rounded-lg transition shadow"
                >
                  <FaSave />
                  Save Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyProfile;
