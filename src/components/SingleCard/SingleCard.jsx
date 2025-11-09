import React from "react";

const SingleCard = ({ art, aos  }) => {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 border border-gray-100" data-aos={aos}>
      
      {/* Artwork Image */}
      <div className="relative">
        <img
          src={art.imageUrl}
          alt={art.title}
          className="w-full h-56 object-cover"
        />
        <span className="absolute top-3 left-3 bg-[#137A63] text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
          {art.category}
        </span>
      </div>

      {/* Artwork Content */}
      <div className="p-5 space-y-3">

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900">{art.title}</h2>

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
        <button className="w-full mt-3 bg-[#137A63] hover:bg-[#0f5d4c] text-white font-semibold py-2.5 rounded-full transition duration-300 shadow-md hover:shadow-lg">
          View Details
        </button>
      </div>
    </div>
  );
};

export default SingleCard;
