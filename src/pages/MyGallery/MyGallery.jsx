import React, { useEffect, useState } from "react";
import { useAxios } from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const MyGallery = () => {
  const [data, setData] = useState([]); // initialize as empty array
  const [loading, setLoading] = useState(true);
  const publicAxios = useAxios();
  const { user } = useAuth();

  // Fetch artworks for logged-in user
  useEffect(() => {
    if (!user?.email) return; // ensure user exists

    setLoading(true);
    publicAxios
      .get(`artwork?email=${user.email}`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => console.error("Failed to fetch artworks:", err))
      .finally(() => setLoading(false));
  }, [publicAxios, user]);

  // Delete artwork
  const handleDelete = (id) => {
    setLoading(true);
    publicAxios
      .delete(`my-favorites/${id}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error("Failed to delete:", err))
      .finally(() => setLoading(false));
  };

  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-8 min-h-screen bg-gray-50 dark:bg-gray-900">
      <Toaster position="top-center" />

      {/*  My Gallery Section  */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#137A63] mb-2">
          My Gallery
        </h1>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gradient-to-r from-[#d4f1eb] to-[#e6f4f1] dark:from-[#0f3f35] dark:to-[#113832]">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                Image
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                Title
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                Category
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                Visibility
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-200">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {data.length > 0 ? (
              data.map((art) => (
                <tr
                  key={art._id}
                  className="hover:bg-[#e6f4f1] dark:hover:bg-[#113832] transition-colors duration-300"
                >
                  <td className="px-4 py-3">
                    <img
                      src={art.imageUrl}
                      alt={art.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-100">
                    {art.title}
                  </td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {art.category}
                  </td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-sm">
                    {art.visibility}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center items-center gap-2">
                      <Link
                        to={`/edit-artwork/${art._id}`}
                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 px-3 py-1 rounded-md border border-blue-600 hover:border-blue-800 transition"
                      >
                        <FaEdit /> Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(art._id)}
                        className="inline-flex items-center gap-1 text-red-600 hover:text-red-800 px-3 py-1 rounded-md border border-red-600 hover:border-red-800 transition"
                      >
                        <FaTrashAlt /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-500 dark:text-gray-400 italic"
                >
                  No artworks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyGallery;
