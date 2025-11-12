import React from "react";
import { FaStar, FaUsers, FaPaintBrush } from "react-icons/fa";

const ExtraSections = () => {
  return (
    <div className="dark:text-gray-100 py-16 px-4 sm:px-6 lg:px-10 space-y-20">
      {/* Top Artists of the Week */}
      <section className="text-center" data-aos="fade-up">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">
          Top Artists <span className="text-[#137A63]">of the Week</span>
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 mb-10">
          Discover talented artists making waves this week. Their unique styles
          and passion bring life to every stroke of the brush.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "Sophia Lee",
              img: "https://i.ibb.co/9qzFMbD/artist1.jpg",
              style: "Abstract & Digital Art",
            },
            {
              name: "Liam Walker",
              img: "https://i.ibb.co/3Tz9vLk/artist2.jpg",
              style: "Nature-Inspired Painting",
            },
            {
              name: "Ava Martinez",
              img: "https://i.ibb.co/tKwSnC1/artist3.jpg",
              style: "Minimalist & Contemporary",
            },
          ].map((artist, idx) => (
            <div
              key={idx}
              className="bg-[#f6fffd] dark:bg-[#10483a] rounded-2xl shadow-md hover:shadow-2xl 
                         hover:scale-[1.03] transition-all duration-300 ease-out p-6 
                         border border-gray-100 dark:border-none"
            >
              <img
                src={artist.img}
                alt={artist.name}
                className="w-28 h-28 rounded-full object-cover mx-auto border-4 border-[#137A63] shadow-lg mb-4"
              />
              <h3 className="text-xl font-bold">{artist.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {artist.style}
              </p>
              <div className="flex justify-center mt-3 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Community Highlights */}
      <section className="text-center" data-aos="fade-up">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">
          Community <span className="text-[#137A63]">Highlights</span>
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 mb-10">
          A glimpse into our vibrant art community — featuring collaborations,
          exhibitions, and shared inspirations from around the world.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Monthly Art Meetup",
              icon: <FaUsers className="text-[#137A63] text-4xl" />,
              desc: "Artists and enthusiasts gather for a creative evening full of ideas, laughter, and inspiration.",
            },
            {
              title: "Digital Art Showcase",
              icon: <FaPaintBrush className="text-[#137A63] text-4xl" />,
              desc: "A curated online exhibition highlighting new-age digital artworks and innovative mediums.",
            },
            {
              title: "Creative Challenges",
              icon: <FaStar className="text-[#137A63] text-4xl" />,
              desc: "Weekly themed challenges encouraging artists to experiment and share their best creations.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-[#f6fffd] dark:bg-[#10483a] rounded-2xl shadow-md hover:shadow-2xl 
                         hover:scale-[1.03] transition-all duration-300 ease-out p-8 
                         border border-gray-100 dark:border-none"
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ExtraSections;
