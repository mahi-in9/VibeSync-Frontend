import React from "react";

const CTA = () => {
  return (
    <section
      id="cta"
      className="min-h-screen bg-gradient-to-r from-[#6b4eff] to-[#9b6dff] text-white text-center py-20 px-10 snap-start"
    >
      <h2 className="text-4xl font-bold mb-4">Ready to Plan Your Next Adventure?</h2>
      <p className="text-lg mb-10 text-[#f3eaff] max-w-2xl mx-auto">
        Join thousands of groups already using PlanMyOutings to coordinate amazing experiences.
      </p>
      <button className="bg-[#ff7b3e] hover:bg-[#ff6a1f] text-white font-semibold px-8 py-3 rounded-xl shadow-md shadow-[#dad2fa]/60 transition">
        Get Started for Free
      </button>
    </section>
  );
};

export default CTA;
