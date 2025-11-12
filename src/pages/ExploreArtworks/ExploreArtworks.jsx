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
    setLoading(true);
    publicAxios
      .get(`/explore-artworks?search=${search}`)
      .then((res) => {
        setData(res.data || []);
      })
      .catch((err) => {
        console.error("Failed to fetch artworks:", err);
      })
      .finally(() => setLoading(false));
  }, [publicAxios, search]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 120,
    });
  }, []);


  const filteredData = data.filter((item) => {
    const matchCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchSearch =
      search === "" ||
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.userName.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });





  if (loading) {
    return <Loading></Loading>;
  }

  if (!data.length) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-500">No artworks found 😔</p>
      </div>
    );
  }

  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-8 min-h-screen max-w-6xl mx-auto">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 text-center ">
        🎨 Explore <span className="text-[#137A63]">Artworks</span>
      </h1>
      <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto text-center mb-10 dark:text-gray-300">
        Step into a world of creativity — discover stunning paintings, digital
        masterpieces, and unique expressions crafted by passionate artists.
      </p>

      <div className=" flex justify-center items-center m-5">
        <div className="input flex items-center gap-2">
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
            className="outline-none bg-transparent"
          />
        </div>
      </div>

      <div className="flex justify-center gap-3 mb-6 flex-wrap">
        {["All", "Painting", "Photography", "Digital Art"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full border transition ${
              selectedCategory === cat
                ? "bg-[#137A63] text-white border-[#137A63]"
                : "border-gray-400 text-gray-600 hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

     
      {filteredData.length === 0 ? (
        <p className="text-center text-gray-500">No artworks found 😔</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((art) => (
            <SingleCard key={art._id} art={art} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExploreArtworks;
