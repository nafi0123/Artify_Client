import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import { useAxios } from "../../hooks/useAxios";

const Viewdetails = () => {
  const art = useLoaderData();
  const axiosPublic = useAxios();

  const [likes, setLikes] = useState(art.likes || 0);
  const [liked, setLiked] = useState(art.isLiked || false);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const res = await axiosPublic.get("/favorites");
        if (Array.isArray(res.data)) {
          const isFav = res.data.some((fav) => fav.artworkId === art._id);
          setFavorite(isFav);
        }
      } catch (err) {
        console.error("Failed to check favorite:", err);
      }
    };
    checkFavorite();
  }, [art._id, axiosPublic]);

 
  const handleLike = async () => {
    try {
      const res = await axiosPublic.patch(`artwork/like/${art._id}`);
      if (res.data) {
        setLikes(res.data.likes);
        setLiked(res.data.isLiked);
      }
    } catch (err) {
      console.error("Failed to update like:", err);
    }
  };

  const handleFavorite = async () => {
    try {
      if (!favorite) {
        await axiosPublic.post("favorites", {
          artworkId: art._id,
          title: art.title,
          imageUrl: art.imageUrl,
        });
      } else {
        await axiosPublic.delete(`favorites/${art._id}`);
      }
      setFavorite((prev) => !prev);
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto rounded-2xl shadow-lg overflow-hidden border border-gray-100 p-6 mt-6">
      {/* Artwork Image */}
      <div className="w-full h-80 sm:h-96 lg:h-[500px] overflow-hidden rounded-xl">
        <img
          src={art.imageUrl}
          alt={art.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Artwork Info */}
      <div className="mt-6 space-y-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          {art.title}
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
          {art.description}
        </p>

        {/* Artist Info */}
        <div className="flex items-center space-x-4 mt-4">
          <img
            src={art.artistInfo.photo}
            alt={art.artistInfo.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="text-gray-700 dark:text-gray-300 text-sm">
            <p className="font-medium">{art.artistInfo.name}</p>
            <p className="text-gray-500 dark:text-gray-400 text-xs">
              Total Artworks: {art.artistInfo.totalArtworks}
            </p>
          </div>
        </div>

        {/* Medium & Price */}
        <div className="flex flex-wrap gap-4 mt-4">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Medium: {art.medium}
          </p>
          <p className="text-gray-800 dark:text-gray-200 font-semibold">
            Price: ${art.price}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3 mt-6">
          {/* ❤️ Like Button */}
          <button
            onClick={handleLike}
            className={`flex-1 sm:flex-none ${
              liked
                ? "bg-red-500 hover:bg-red-600"
                : "bg-[#137A63] hover:bg-[#0f5d4c]"
            } text-white font-semibold py-2 px-4 rounded-full transition duration-300 shadow-md flex items-center justify-center gap-2`}
          >
            ❤️ {liked ? "Liked" : "Like"} ({likes})
          </button>

          {/* ⭐ Favorite Button */}
          <button
            onClick={handleFavorite}
            className={`flex-1 sm:flex-none font-semibold py-2 px-4 rounded-full transition duration-300 shadow-md flex items-center justify-center gap-2 ${
              favorite
                ? "bg-pink-500 text-white hover:bg-pink-600 shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            {favorite ? "★ Favorited" : "☆ Add to Favorites"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Viewdetails;
