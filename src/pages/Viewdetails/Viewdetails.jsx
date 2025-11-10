import React, { useState } from "react";
import { useLoaderData } from "react-router";

const Viewdetails = () => {
  const art = useLoaderData(); 
  const [likes, setLikes] = useState(art.likes || 0);
  const [favorite, setFavorite] = useState(false);

  const handleLike = () => setLikes(prev => prev + 1);
  const handleFavorite = () => setFavorite(prev => !prev);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 p-6 mt-6">
      <div className="w-full h-80 sm:h-96 lg:h-[500px] overflow-hidden rounded-xl">
        <img
          src={art.imageUrl}
          alt={art.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="mt-6 space-y-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{art.title}</h1>
        <p className="text-gray-700 text-sm sm:text-base">{art.description}</p>

        {/* Artist Info */}
        <div className="flex items-center space-x-4 mt-4">
          <img
            src={art.artistInfo.photo}
            alt={art.artistInfo.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="text-gray-700 text-sm">
            <p className="font-medium">{art.artistInfo.name}</p>
            <p className="text-gray-500 text-xs">
              Total Artworks: {art.artistInfo.totalArtworks}
            </p>
          </div>
        </div>

        {/* Medium & Price */}
        <div className="flex flex-wrap gap-4 mt-4">
          <p className="text-gray-500 text-sm">Medium: {art.medium}</p>
          <p className="text-gray-800 font-semibold">Price: ${art.price}</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3 mt-6">
          <button
            onClick={handleLike}
            className="flex-1 sm:flex-none bg-[#137A63] hover:bg-[#0f5d4c] text-white font-semibold py-2 px-4 rounded-full transition duration-300 shadow-md flex items-center justify-center gap-2"
          >
            ❤️ Like ({likes})
          </button>
          <button
            onClick={handleFavorite}
            className={`flex-1 sm:flex-none ${
              favorite
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-gray-200 hover:bg-gray-300"
            } font-semibold py-2 px-4 rounded-full transition duration-300 shadow-md`}
          >
            {favorite ? "★ Favorited" : "☆ Add to Favorites"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Viewdetails;
