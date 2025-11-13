import React from "react";
import { FaStar, FaUsers, FaPaintBrush } from "react-icons/fa";

const ExtraSections = () => {
  const topArtists = [
    { name: "Sophia Lee", style: "Abstract & Digital Art", initials: "SL", gradient: "bg-gradient-to-tr from-[#FF7E5F] to-[#FEB47B]" },
    { name: "Liam Walker", style: "Nature-Inspired Painting", initials: "LW", gradient: "bg-gradient-to-tr from-[#43cea2] to-[#185a9d]" },
    { name: "Ava Martinez", style: "Minimalist & Contemporary", initials: "AM", gradient: "bg-gradient-to-tr from-[#ff6a00] to-[#ee0979]" },
  ];

  const communityHighlights = [
    { title: "Monthly Art Meetup", icon: <FaUsers className="text-[#137A63] text-4xl" />, desc: "Artists and enthusiasts gather for a creative evening full of ideas, laughter, and inspiration." },
    { title: "Digital Art Showcase", icon: <FaPaintBrush className="text-[#137A63] text-4xl" />, desc: "A curated online exhibition highlighting new-age digital artworks and innovative mediums." },
    { title: "Creative Challenges", icon: <FaStar className="text-[#137A63] text-4xl" />, desc: "Weekly themed challenges encouraging artists to experiment and share their best creations." },
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-10 space-y-24 dark:bg-gray-900 dark:text-gray-100">
      {/* Top Artists Section */}
      <section className="text-center" data-aos="fade-up">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-gray-900 dark:text-white">
          Top Artists <span className="text-[#137A63]">of the Week</span>
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 mb-12">
          Discover talented artists making waves this week. Their unique styles and passion bring life to every stroke of creativity.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {topArtists.map((artist, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 ease-out p-6 flex flex-col items-center border border-gray-100 dark:border-gray-700"
            >
              <div className={`w-28 h-28 rounded-full flex items-center justify-center text-3xl font-bold text-white mb-4 ${artist.gradient} shadow-lg`}>
                {artist.initials}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{artist.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{artist.style}</p>
              <div className="flex justify-center mt-3 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Community Highlights Section */}
      <section className="text-center" data-aos="fade-up">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-gray-900 dark:text-white">
          Community <span className="text-[#137A63]">Highlights</span>
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 mb-12">
          A glimpse into our vibrant art community — featuring collaborations, exhibitions, and shared inspirations from around the world.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {communityHighlights.map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 ease-out p-8 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ExtraSections;
