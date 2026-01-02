import React, { useEffect, useState } from "react";
import { useAxios } from "../../../hooks/useAxios";
import { FaHeartBroken } from "react-icons/fa";
import Loading from "../../../components/Loading/Loading";

const MyFavorites = () => {
  const publicAxios = useAxios();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch favorites
  useEffect(() => {
    publicAxios
      .get("favorites")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch favorites:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [publicAxios]);

  // Handle Unfavorite
  const handleUnfavorite = (id) => {
    setLoading(true);
    publicAxios
      .delete(`my-favorites/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("Failed to unfavorite:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-8 min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Title/Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
          My <span className="text-[#137A63]">Favorites</span>
        </h1>
        <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto text-center mb-6 dark:text-gray-300">
          Explore and revisit artworks you love. Keep track of your favorite
          pieces and get inspired by top creations.
        </p>
      </div>

      {/* Table */}
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
                Date
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
                    {new Date(art.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center items-center gap-2">
                      <button
                        onClick={() => handleUnfavorite(art._id)}
                        className="inline-flex items-center gap-1 text-[#137A63] hover:text-[#0f5c4c] px-3 py-1 rounded-md border border-[#137A63] hover:border-[#0f5c4c] transition transform hover:scale-105 hover:animate-pulse"
                      >
                        <FaHeartBroken className="text-red-500" /> Unfavorite
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

export default MyFavorites;
