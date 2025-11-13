import React, { useEffect, useState } from "react";
import { useAxios } from "../../hooks/useAxios";
import SingleCard from "../../components/SingleCard/SingleCard";
import AOS from "aos";
import "aos/dist/aos.css";
import Loading from "../../components/Loading/Loading";

const ExploreArtworks = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const publicAxios = useAxios();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    publicAxios
      .get(`/explore-artworks?search=${search}&category=${selectedCategory}`)
      .then((res) => setData(res.data || []))
      .catch((err) => console.error("Failed to fetch artworks:", err))
      .finally(() => setLoading(false));
  }, [publicAxios, search, selectedCategory]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: false, offset: 120 });
  }, []);

  // Backend already filters, so filteredData = data
  const filteredData = data;

  if (loading) return <Loading />;

  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-8 min-h-screen max-w-6xl mx-auto">
      {/* Page Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 text-center">
        🎨 Explore <span className="text-[#137A63]">Artworks</span>
      </h1>
      <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base max-w-2xl mx-auto text-center mb-10">
        Step into a world of creativity — discover stunning paintings, digital
        masterpieces, and unique expressions crafted by passionate artists.
      </p>

      {/* Search Bar */}
      <div className="flex justify-center items-center m-5">
        <div className="input flex items-center gap-2 border rounded-full px-4 py-2 dark:border-gray-600">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>

          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or artist..."
            className="outline-none bg-transparent dark:text-white"
          />
        </div>
      </div>

      {/* Category Buttons */}
      <div className="flex justify-center gap-3 mb-6 flex-wrap">
        {["All", "Painting", "Photography", "Digital Art", "Others"].map(
          (cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full border transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-[#137A63] text-white border-[#137A63]"
                  : "border-gray-400 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {cat}
            </button>
          )
        )}
      </div>

      {/* Artworks Grid */}
      {filteredData.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-20">
          No artworks found 😔
        </p>
      ) : (
        <div
          data-aos="fade-up"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredData.map((art) => (
            <SingleCard key={art._id} art={art} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExploreArtworks;
