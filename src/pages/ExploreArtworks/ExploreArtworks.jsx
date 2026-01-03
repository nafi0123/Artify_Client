import React, { useEffect, useState } from "react";
import { useAxios } from "../../hooks/useAxios";
import SingleCard from "../../components/SingleCard/SingleCard";
import AOS from "aos";
import "aos/dist/aos.css";
import Loading from "../../components/Loading/Loading";

const ExploreArtworks = () => {
  const publicAxios = useAxios();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchInput, setSearchInput] = useState(""); 
  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState(""); 

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 8; 

  // Fetch artworks
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await publicAxios.get(
          `/explore-artworks?search=${search}&category=${selectedCategory}&sort=${sortBy}&page=${page}&limit=${limit}`
        );
        setData(res.data.artworks || []);
        setTotalPages(res.data.totalPages || 1);
      } catch (err) {
        console.error("Failed to fetch artworks:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [publicAxios, search, selectedCategory, sortBy, page]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: false, offset: 120 });
  }, []);

  // Form submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1); // reset page
    setSearch(searchInput);
  };

  if (loading) return <Loading />;

  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-8 min-h-screen w-full max-w-7xl mx-auto">
      {/* Page Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 text-center">
        🎨 Explore <span className="text-[#137A63]">Artworks</span>
      </h1>
      <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base max-w-2xl mx-auto text-center mb-6">
        Discover stunning paintings, digital masterpieces, and unique expressions by talented artists worldwide.
      </p>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        {/* Search Form */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex w-full max-w-md"
        >
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by title or artist..."
            className="flex-1 px-4 py-2 rounded-l-full border border-gray-400 dark:border-gray-600 dark:bg-gray-800 dark:text-white outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#137A63] text-white rounded-r-full hover:bg-[#0f5e4c] transition"
          >
            Search
          </button>
        </form>

   
        <div className="flex gap-2 flex-wrap justify-center">
          {["All", "Painting", "Photography", "Digital Art", "Others"].map(
            (cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setPage(1); // reset page
                }}
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

        {/* Sort Option */}
        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setPage(1);
          }}
          className="px-3 py-2 border rounded-full dark:bg-gray-800 dark:text-white"
        >
          <option value="">Sort By</option>
          <option value="priceAsc">Price: Low → High</option>
          <option value="priceDesc">Price: High → Low</option>
        </select>
      </div>

      {/* Artworks Grid */}
      {data.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-20">
          No artworks found 😔
        </p>
      ) : (
        <div
          data-aos="fade-up"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          {data.map((art) => (
            <SingleCard key={art._id} art={art} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-10">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white rounded-full disabled:opacity-50"
        >
          Previous
        </button>
        <span className="flex items-center px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white rounded-full disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ExploreArtworks;
