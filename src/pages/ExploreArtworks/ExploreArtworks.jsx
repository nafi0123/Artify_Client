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

  // ✅ Fetch artworks
  useEffect(() => {
    setLoading(true);
    publicAxios
      .get("/explore-artworks")
      .then((res) => {
        setData(res.data || []);
      })
      .catch((err) => {
        console.error("Failed to fetch artworks:", err);
      })
      .finally(() => setLoading(false));
  }, [publicAxios]);

  // ✅ Initialize AOS only once
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 120,
    });
  }, []);

  // ✅ Loading state
  if (loading) {
    return <Loading></Loading>;
  }

  // ✅ Empty state
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {data.map((art) => (
          <div key={art._id} data-aos="fade-up">
            <SingleCard art={art} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreArtworks;
