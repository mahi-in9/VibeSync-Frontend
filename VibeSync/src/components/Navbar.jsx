import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation(); 

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#f6f5ff] backdrop-blur-md shadow-md z-50 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-extrabold text-[#6b4eff] hover:text-[#5842c3] transition-all duration-300"
          >
            VibeSync
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/features"
              className="text-gray-700 hover:text-[#6b4eff] px-3 py-2 rounded-md text-sm font-medium transition-all duration-300"
            >
              Features
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

            {/* CTA Button */}
            <StyledWrapper>
              <Link to="/startVibe">
                <button>
                  START VIBE TALK <ArrowRight size={16} style={{ marginLeft: "8px" }} />
                </button>
              </Link>
            </StyledWrapper>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="group flex items-center justify-center relative z-10 transition-all ease-in-out rounded-md p-[5px] border border-[#999]"
            >
              <svg
                fill="currentColor"
                stroke="none"
                strokeWidth={0}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className={`w-7 h-7 overflow-visible transition-transform duration-300 ${
                  menuOpen ? "rotate-45 text-[#6b4eff]" : "text-gray-700"
                }`}
              >
                <path d="m3.45,8.83c-.39,0-.76-.23-.92-.62-.21-.51.03-1.1.54-1.31L14.71,2.08c.51-.21,1.1.03,1.31.54.21.51-.03,1.1-.54,1.31L3.84,8.75c-.13.05-.25.08-.38.08Z" />
                <path d="m2.02,17.13c-.39,0-.76-.23-.92-.62-.21-.51.03-1.1.54-1.31L21.6,6.94c.51-.21,1.1.03,1.31.54.21.51-.03,1.1-.54,1.31L2.4,17.06c-.13.05-.25.08-.38.08Z" />
                <path d="m8.91,21.99c-.39,0-.76-.23-.92-.62-.21-.51.03-1.1.54-1.31l11.64-4.82c.51-.21,1.1.03,1.31.54.21.51-.03,1.1-.54,1.31l-11.64,4.82c-.13.05-.25.08-.38.08Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#f6f5ff] border-t border-gray-200 shadow-lg">
          <div className="flex flex-col items-start px-6 py-4 space-y-3">
            <Link
              to="/features"
              onClick={() => setMenuOpen(false)}
              className="w-full text-gray-700 hover:text-[#6b4eff] py-2"
            >
              Features
            </Link>
            <Link
              to="/Groups"
              onClick={() => setMenuOpen(false)}
              className="w-full text-gray-700 hover:text-[#6b4eff] py-2"
            >
              Groups
            </Link>
            <Link
              to="/Signin"
              onClick={() => setMenuOpen(false)}
              className="w-full text-gray-700 hover:text-[#6b4eff] py-2"
            >
              Sign In
            </Link>

            <StyledWrapper>
              <Link to="/startVibe" onClick={() => setMenuOpen(false)}>
                <button className="w-full justify-center">
                  START VIBE TALK <ArrowRight size={16} />
                </button>
              </Link>
            </StyledWrapper>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

// ✅ Styled CTA Button
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
    justify-content: center;
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
