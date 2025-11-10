import React from "react";
import { Link } from "react-router";

const SingleCard = ({ art, aos }) => {
  return (
    <div
      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition duration-300 w-full sm:w-[300px] md:w-[320px] lg:w-[350px] mx-auto"
      data-aos={aos}
    >
      {/* Artwork Image */}
      <div className="relative">
        <img
          src={art.imageUrl}
          alt={art.title}
          className="w-full h-56 sm:h-64 md:h-69 lg:h-72 object-cover"
        />
        <span className="absolute top-3 left-3 bg-[#137A63] text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
          {art.category}
        </span>
      </div>

      {/* Artwork Content */}
      <div className="p-5 space-y-3">
        {/* Title */}
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
          {art.title}
        </h2>

        {/* Artist Info */}
        <div className="text-gray-700 text-sm">
          <p className="font-medium">{art.userName}</p>
          <p className="text-gray-500 text-xs mt-1">{art.medium}</p>
        </div>

        {/* Price */}
        <div className="text-gray-800 font-semibold mt-1">
          Price: ${art.price}
        </div>

        {/* Button */}
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
