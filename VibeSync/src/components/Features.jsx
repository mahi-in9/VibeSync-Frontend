import React from "react";

const Features = () => {
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

  return (
    <section id="features" className="min-h-screen bg-white py-20 text-center snap-start">
      <h2 className="text-4xl font-bold mb-4">
        Everything You Need to <span className="text-[#6b4eff]">Plan Together</span>
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-14 text-lg">
        No more endless group chats. Plan, vote, and decide in minutes with smart tools designed for groups.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-10">
        {featuresData.map((f, i) => (
          <div key={i} className="bg-[#fdfcff] border border-[#f1efff] shadow-lg shadow-[#dad2fa]/40 rounded-2xl p-8 text-left hover:-translate-y-1 transition-transform">
            <div className="text-3xl mb-4">{f.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
