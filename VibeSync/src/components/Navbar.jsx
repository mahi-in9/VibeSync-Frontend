import React from "react";
import { ArrowRight  } from "lucide-react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Navbar = () => {
  return (
    <div>
      <nav className="fixed top-0 left-0 w-full bg-[#f6f5ff] backdrop-blur-md shadow-md z-50 transition-all duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link
                to="/"
                className="text-2xl font-extrabold text-[#6b4eff] hover:text-[#5842c3] transition-all duration-300"
              >
                VibeSync
              </Link>
            </div>

            {/* Nav Links */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-6">
                <Link
                  to="/features"
                  className="text-gray-700 hover:text-[#6b4eff] px-3 py-2 rounded-md text-sm font-medium transition-all duration-300"
                >
                  features
                </Link>
                <Link
                  to="/Groups"
                  className="text-gray-700 hover:text-[#6b4eff] px-3 py-2 rounded-md text-sm font-medium transition-all duration-300"
                >
                  Groups
                </Link>
                <Link
                  to="/Signin"
                  className="text-gray-700 hover:text-[#6b4eff] px-3 py-2 rounded-md text-sm font-medium transition-all duration-300"
                >
                  Sign In
                </Link>

                {/* Animated Start Button */}
                <StyledWrapper>
                  <Link to="/startVibe">
                    <button>
                      START VIBE TALK <ArrowRight size={16} style={{ marginLeft: "8px" }} />
                    </button>
                  </Link>
                </StyledWrapper>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

// ✅ Styled Animated Button
const StyledWrapper = styled.div`
  button {
    background-color: #6b4eff;
    color: white;
    font-size: 15px;
    font-weight: bold;
    padding: 10px 18px;
    border-radius: 2em;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
    display: flex;
    align-items: center;
    box-shadow: 1px 5px 0 0 #4e36b8;
  }

  button:hover {
    transform: translateY(-3px);
    box-shadow: 1px 8px 0 0 #4e36b8;
  }

  button:active {
    transform: translateY(3px);
    box-shadow: 0 0 0 0 #4e36b8;
  }
`;
