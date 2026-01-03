import React from "react";
import { Link } from "react-router";
import { FaHeart } from "react-icons/fa";

const SingleCard = ({ art, aos }) => {
  return (
    <div
      className="bg-base-100 rounded-2xl shadow-md overflow-hidden border border-gray-200 
                 dark:border-none dark:bg-[#1b1f1d] 
                 hover:shadow-2xl hover:-translate-y-1 hover:bg-[#e6f4f1] 
                 dark:hover:bg-[#102923] dark:hover:opacity-95 
                 transition-all duration-300 ease-in-out 
                 w-full max-w-[350px] mx-auto
                 flex flex-col justify-between"
      data-aos={aos}
    >
      {/* Artwork Image */}
      <div className="relative overflow-hidden group">
        <img
          src={art.imageUrl}
          alt={art.title}
          className="w-full h-56 sm:h-64 md:h-69 lg:h-72 object-cover 
                     transform group-hover:scale-110 transition-transform duration-500 ease-out"
        />
        <span className="absolute top-3 left-3 bg-[#137A63] text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
          {art.category}
        </span>
        {art.likes !== undefined && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/80 dark:bg-gray-800/80 px-2 py-1 rounded-full text-xs font-medium text-gray-800 dark:text-gray-200 shadow">
            <FaHeart className="text-red-500" />
            {art.likes}
          </div>
        )}
      </div>

      {/* Artwork Content */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
            {art.title}
          </h2>

          <div className="text-gray-700 dark:text-gray-300 text-sm mt-1">
            <p className="font-medium">{art.userName}</p>
            <p className="text-gray-500 dark:text-gray-400 text-xs">{art.medium}</p>
          </div>

          <div className="text-gray-800 dark:text-gray-200 font-semibold mt-2">
            Price: ${art.price}
          </div>
        </div>

        <Link to={`/detail-card/${art._id}`}>
          <button className="w-full mt-3 bg-[#137A63] hover:bg-[#0f5d4c] text-white font-semibold py-2.5 rounded-full transition duration-300 shadow-md hover:shadow-lg">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SingleCard;
