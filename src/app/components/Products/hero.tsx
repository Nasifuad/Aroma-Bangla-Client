"use client";

import React from "react";
import { useUIStore } from "@/store/uiStore";

const HeroSection: React.FC = () => {
  const isDarkMode = useUIStore((state) => state.isDarkMode);

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

      {/* Dark overlay to enhance contrast */}
      <div
        className={`absolute top-0 left-0 w-full h-full z-10 ${
          isDarkMode
            ? "bg-black/60 backdrop-blur-sm"
            : "bg-white/30 backdrop-blur-sm"
        }`}
      />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 text-center">
        <h1
          className={`text-5xl md:text-6xl lg:text-7xl font-extrabold drop-shadow-lg ${
            isDarkMode ? "text-yellow-300" : "text-yellow-500"
          }`}
        >
          Wake Up to the Perfect Brew
        </h1>

        <button
          className={`mt-8 px-8 py-3 text-lg font-semibold rounded-full transition ${
            isDarkMode
              ? "bg-amber-600 hover:bg-amber-700 text-white"
              : "bg-green-600 hover:bg-green-700 text-white"
          }`}
        >
          Explore
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
