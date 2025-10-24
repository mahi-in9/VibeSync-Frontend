import React from "react";
import Card from "./Card";

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

const Features = () => {
  return (
    <section
      id="features"
      className="min-h-screen py-20 text-center snap-start"
      style={{
        background: "linear-gradient(135deg, #e9e8ff 0%, #f6f5ff 50%, #dbd2fa 100%)"
      }}
    >
      <h2 className="text-4xl font-bold mb-4">
        Everything You Need to{" "}
        <span className="text-[#6b4eff]">Plan Together</span>
      </h2>
      <p className="text-gray-700 max-w-2xl mx-auto mb-14 text-lg">
        No more endless group chats. Plan, vote, and decide in minutes with smart tools designed for groups.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 px-10">
        {featuresData.map((f, i) => (
          <Card
            key={i}
            title={f.title}
            description={f.desc}
            icon={f.icon}
          />
        ))}
      </div>
    </section>
  );
};

export default Features;
