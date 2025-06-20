"use client";

import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full h-[80vh] overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/videos/coffee_pouring.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-yellow-400 drop-shadow-lg">
          Wake Up to the Perfect Brew
        </h1>

        <button className="mt-8 px-8 py-3 bg-green-600 text-white text-lg font-semibold rounded-full hover:bg-green-700 transition">
          Explore
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
