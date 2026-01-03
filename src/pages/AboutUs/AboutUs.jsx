import React from "react";
import { FaPaintBrush, FaUsers, FaHeart } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-8 min-h-screen bg-gray-50 dark:bg-gray-900">
      
      {/* ===== Header Section ===== */}
      <div className="max-w-5xl mx-auto text-center mb-14">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          About <span className="text-[#137A63]">ArtSphere</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base max-w-3xl mx-auto">
          ArtSphere is an online art-sharing platform designed to celebrate
          creativity, empower artists, and connect art lovers through meaningful
          interaction and appreciation.
        </p>
      </div>

      {/* ===== Mission & Vision ===== */}
      <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-[#137A63] mb-3">
            Our Mission
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Our mission is to provide a modern, clean, and accessible platform
            where artists can showcase their creative works, gain recognition,
            and grow through community-driven appreciation.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-[#137A63] mb-3">
            Our Vision
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            We envision a global creative space where art transcends boundaries,
            connects people, and inspires collaboration across cultures and
            styles.
          </p>
        </div>
      </div>

      {/* ===== Core Values ===== */}
      <div className="w-11/12 mx-auto mb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">
          What We Believe In
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition">
            <div className="flex justify-center mb-4">
              <FaPaintBrush className="text-4xl text-[#137A63]" />
            </div>
            <h4 className="font-semibold text-lg text-gray-800 dark:text-gray-100 mb-2">
              Creativity First
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              We prioritize originality and provide artists the freedom to
              express themselves without limits.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition">
            <div className="flex justify-center mb-4">
              <FaUsers className="text-4xl text-[#137A63]" />
            </div>
            <h4 className="font-semibold text-lg text-gray-800 dark:text-gray-100 mb-2">
              Community Driven
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              ArtSphere builds meaningful connections between artists and art
              lovers through interaction and support.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition">
            <div className="flex justify-center mb-4">
              <FaHeart className="text-4xl text-[#137A63]" />
            </div>
            <h4 className="font-semibold text-lg text-gray-800 dark:text-gray-100 mb-2">
              Appreciation & Respect
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Every artwork deserves respect, feedback, and appreciation —
              fostering a positive creative ecosystem.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AboutUs;
