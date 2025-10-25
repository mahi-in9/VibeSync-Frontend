import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ArrowRight, User } from "lucide-react";
import { StyledWrapper } from "./StyleWrapper";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate("/signin");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#f6f5ff] backdrop-blur-md shadow-md z-50 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="text-2xl font-extrabold text-[#6b4eff] hover:text-[#5842c3] transition-all duration-300"
          >
            VibeSync
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/features"
              className="text-gray-700 hover:text-[#6b4eff] px-3 py-2 rounded-md text-sm font-medium transition-all duration-300"
            >
              Features
            </Link>
            <Link
              to="/groups"
              className="text-gray-700 hover:text-[#6b4eff] px-3 py-2 rounded-md text-sm font-medium transition-all duration-300"
            >
              Groups
            </Link>

            {!user ? (
              <>
                <Link
                  to="/signin"
                  className="text-gray-700 hover:text-[#6b4eff] px-3 py-2 rounded-md text-sm font-medium transition-all duration-300"
                >
                  Sign In
                </Link>
                <StyledWrapper>
                  <Link to="/signup">
                    <button>
                      START VIBE TALK{" "}
                      <ArrowRight size={16} style={{ marginLeft: "8px" }} />
                    </button>
                  </Link>
                </StyledWrapper>
              </>
            ) : (
              <div className="relative">
                <div className="flex items-center gap-4">
                  <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-gray-700 hover:bg-[#f0efff] rounded-t-xl"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 bg-[#6b4eff] text-white px-4 py-2 rounded-full font-semibold hover:bg-[#5842c3] transition"
                >
                  <User size={18} />
                  {user.name?.split(" ")[0] || "Profile"}
                </button>
                </div>
                 

                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-44 bg-white border border-gray-100 rounded-xl shadow-xl"
                  
                  >
                   
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-[#f0efff]"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/setting"
                      className="block px-4 py-2 text-gray-700 hover:bg-[#f0efff]"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Settings
                    </Link>
                    <Link
                     to ="/notifications"
                      className="block px-4 py-2 text-gray-700 hover:bg-[#f0efff]"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Notifications
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-b-xl"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="group flex items-center justify-center relative z-10 transition-all ease-in-out rounded-md p-[5px] border border-[#999]"
            >
              <svg
                fill="currentColor"
                stroke="none"
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
              to="/groups"
              onClick={() => setMenuOpen(false)}
              className="w-full text-gray-700 hover:text-[#6b4eff] py-2"
            >
              Groups
            </Link>

            {!user ? (
              <>
                <Link
                  to="/signin"
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
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-gray-700 hover:text-[#6b4eff] py-2"
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-gray-700 hover:text-[#6b4eff] py-2"
                >
                  Profile
                </Link>
                <Link
                  to="/setting"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-gray-700 hover:text-[#6b4eff] py-2"
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-red-600 hover:bg-red-50 py-2"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

