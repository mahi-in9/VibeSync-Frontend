import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 font-['Poppins']">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* 🔹 Brand / Logo */}
        <div>
          <Link
            to="/"
            className="text-3xl font-extrabold text-white hover:text-[#6b4eff] transition-all duration-300"
          >
            VibeSync
          </Link>
          <p className="mt-3 text-gray-500 leading-relaxed">
            Smart event planning made simple. Organize, vote, and connect effortlessly.
          </p>

          <div className="flex gap-4 mt-6">
            <a href="#" className="hover:text-[#6b4eff] transition">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-[#6b4eff] transition">
              <Twitter size={20} />
            </a>
            <a href="#" className="hover:text-[#6b4eff] transition">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-[#6b4eff] transition">
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        {/* 🔹 Quick Links */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4 tracking-wide">
            Quick Links
          </h2>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-[#6b4eff] transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/groups" className="hover:text-[#6b4eff] transition">
                Groups
              </Link>
            </li>
            <li>
              <Link to="/signin" className="hover:text-[#6b4eff] transition">
                Sign In
              </Link>
            </li>
            <li>
              <Link to="/startVibe" className="hover:text-[#6b4eff] transition">
                Start Vibe Talk
              </Link>
            </li>
          </ul>
        </div>

        {/* 🔹 About Section */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4 tracking-wide">
            About
          </h2>
          <ul className="space-y-2">
            <li>
              <Link to="/about" className="hover:text-[#6b4eff] transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/team" className="hover:text-[#6b4eff] transition">
                Team
              </Link>
            </li>
            <li>
              <Link to="/careers" className="hover:text-[#6b4eff] transition">
                Careers
              </Link>
            </li>
          </ul>
        </div>

        {/* 🔹 Support / Legal */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4 tracking-wide">
            Support & Legal
          </h2>
          <ul className="space-y-2">
            <li>
              <Link to="/help" className="hover:text-[#6b4eff] transition">
                Help Center
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-[#6b4eff] transition">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-[#6b4eff] transition">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#6b4eff] transition">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* 🔹 Bottom Section */}
      <div className="border-t border-gray-800 py-6 text-center text-gray-500 text-sm tracking-wide">
        © {new Date().getFullYear()} <span className="text-white font-semibold">VibeSync</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
