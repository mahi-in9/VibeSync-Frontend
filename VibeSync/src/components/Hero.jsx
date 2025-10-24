import React from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import styled from "styled-components";
import { ArrowRight } from "lucide-react";

const featuresData = [
  {
    title: "Create Groups Easily",
    desc: "Organize your friends into groups and keep everyone in sync for your next adventure.",
    icon: "👥",
  },
  {
    title: "Vote & RSVP",
    desc: "Use polls and emoji reactions to decide what to do and who's coming.",
    icon: "👍",
  },
  {
    title: "Smart Suggestions",
    desc: "Get personalized recommendations for movies, restaurants, and activities based on your group's mood.",
    icon: "💡",
  },
  {
    title: "Mood-Based Planning",
    desc: "Filter suggestions by vibe — chill, adventurous, or foodie. Perfect plans every time.",
    icon: "🎯",
  },
];

const HeroFeatures = () => {
  return (
    <section
      className="relative w-full flex flex-col items-center py-20"
      style={{
        background: "linear-gradient(135deg, #e9e8ff 0%, #f6f5ff 50%, #dbd2fa 100%)",
      }}
    >
      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row items-center gap-12">
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

          <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-10">
            <Link to="/dashboard">
              <CTAButton>
                Get Started <ArrowRight size={18} style={{ marginLeft: "8px" }} />
              </CTAButton>
            </Link>
            <Link to="/how-it-works">
  <button
    style={{
      background: "linear-gradient(135deg, #e9e8ff 0%, #f6f5ff 50%, #dbd2fa 100%)",
      color: "#6b4eff",
      padding: "12px 32px",
      borderRadius: "1rem",
      fontWeight: "600",
      border: "none",
      transition: "all 0.3s ease",
      cursor: "pointer",
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.opacity = "0.9";
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.opacity = "1";
    }}
  >
    See How It Works
  </button>
</Link>

          </div>

          <div className="flex gap-10 text-gray-800 font-medium justify-center md:justify-start">
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

      {/* Features Section */}
      <div className="relative z-10 w-full text-center px-4 sm:px-6 lg:px-8 mt-16">
        <h2 className="text-4xl font-bold mb-4">
          Everything You Need to <span className="text-[#6b4eff]">Plan Together</span>
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto mb-14 text-lg">
          No more endless group chats. Plan, vote, and decide in minutes with smart tools designed for groups.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 px-10">
          {featuresData.map((f, i) => (
            <Card key={i} title={f.title} description={f.desc} icon={f.icon} />
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <CTAContent>
        <h2>Ready to Plan Your Next Adventure?</h2>
        <p>
          Join thousands of groups already using VibeSync to coordinate amazing experiences. Plan, vote, and decide in minutes with your friends.
        </p>
        <Link to="/Signup">
          <CTAButton>
            Get Started <ArrowRight size={18} style={{ marginLeft: "8px" }} />
          </CTAButton>
        </Link>
      </CTAContent>
    </section>
  );
};

export default HeroFeatures;

// Styled Components
const CTAContent = styled.div`
  max-width: 700px;
  color: #5e44b3ff;
  text-align: center;
  margin-top: 60px;

  h2 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 20px;
    line-height: 1.2;
  }

  p {
    font-size: 1.2rem;
    color: gray;
    margin-bottom: 40px;
    line-height: 1.6;
  }
`;

const CTAButton = styled.button`
  background-color: #6b4eff;
  color: white;
  font-size: 1rem;
  font-weight: 700;
  padding: 14px 30px;
  border-radius: 2em;
  cursor: pointer;
  border: none;
  display: inline-flex;
  align-items: center;
  box-shadow: 1px 5px 0 0 #4e36b8;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 1px 8px 0 0 #4e36b8;
  }

  &:active {
    transform: translateY(3px);
    box-shadow: 0 0 0 0 #4e36b8;
  }
`;
