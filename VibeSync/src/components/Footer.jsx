import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
    return (
        <footer className=" bg-gradient-to-r from-[#e9e8ff] via-[#f6f5ff] to-[#dbd2fa] text-gray-800 ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* Brand / Logo */}
                <div>
                    <Link
                        to="/"
                        className="text-2xl font-extrabold text-[#6b4eff] hover:text-[#5842c3] transition-all duration-300"
                    >
                        VibeSync
                    </Link>
                    <p className="text-gray-600">
                        Smart event planning made easy. Organize groups, vote on plans, and get personalized suggestions.
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

                {/* Quick Links */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
                    <ul className="space-y-2 text-gray-700">
                        <li>
                            <Link to="/" className="hover:text-[#6b4eff] transition">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/group" className="hover:text-[#6b4eff] transition">
                                Group
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

                {/* About Section */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">About</h2>
                    <ul className="space-y-2 text-gray-700">
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

                {/* Support / Legal */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Support & Legal</h2>
                    <ul className="space-y-2 text-gray-700">
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

            <div className="border-t border-gray-300/40 mt-8 py-6 text-center text-gray-600 text-sm">
                © {new Date().getFullYear()} VibeSync. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
