import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="mt-10 relative min-h-screen flex items-center">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-[#f6f5ff] z-0"></div>
      <div className="absolute inset-0 bg-white/30 backdrop-blur-md z-10"></div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row items-center gap-12">
        {/* Left Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <div className="inline-block bg-[#f6f5ff] text-[#6b4eff] text-xs font-medium px-4 py-2 rounded-full mb-6 shadow-sm">
            Smart Event Planning Made Easy
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-gray-900">
            Plan Perfect{" "}
            <span className="bg-gradient-to-r from-[#6b4eff] to-[#9b6dff] bg-clip-text text-transparent">
              Outings
            </span>{" "}
            with Friends
          </h1>

          <p className="text-gray-700 text-lg md:text-xl mb-8">
            Stop the endless WhatsApp threads. Create groups, vote on plans, and get smart suggestions for movies, restaurants, and activities — all in one place.
          </p>

          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <Link to="/dashboard">
              <button className="bg-[#6b4eff] hover:bg-[#563be2] text-white px-8 py-3 rounded-xl font-semibold shadow-md transition-all">
                Get Started →
              </button>
            </Link>
            <Link to="/how-it-works">
              <button className="bg-white border border-gray-200 hover:bg-gray-100 text-gray-700 px-8 py-3 rounded-xl font-semibold transition-all">
                See How It Works
              </button>
            </Link>
          </div>

          <div className="flex gap-10 text-gray-800 font-medium mt-10 justify-center md:justify-start">
            <p>
              <span className="text-2xl font-bold text-[#6b4eff]">1000+</span> Active Groups
            </p>
            <p>
              <span className="text-2xl font-bold text-[#6b4eff]">5000+</span> Events Planned
            </p>
          </div>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <img
            src="https://illustrations.popsy.co/violet/people-meeting.svg"
            alt="Planning illustration"
            className="max-w-sm md:max-w-md drop-shadow-2xl rounded-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
