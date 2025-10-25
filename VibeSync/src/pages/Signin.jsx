import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { StyledButton } from "../components/StyleWrapper";
import { useAuth } from "../context/AuthContext";

const Signin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      await login(email, password);
      alert("Login successful!");
      navigate("/");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background:
          "linear-gradient(135deg, #e9e8ff 0%, #f6f5ff 50%, #dbd2fa 100%)",
      }}
    >
      <div
        className="max-w-md w-full rounded-3xl shadow-lg p-10"
        style={{
          background:
            "linear-gradient(135deg, #f9f8ff 0%, #f3f1ff 50%, #e5ddff 100%)",
        }}
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-[#6b4eff]">
          Sign In to <span className="text-[#5842c3]">VibeSync</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6b4eff] transition"
            />
          </div>
          <div className="relative">
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type={visible ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6b4eff] transition pr-10"
            />
            <button
              type="button"
              onClick={() => setVisible(!visible)}
              className="absolute right-3 top-[45px] text-gray-500 hover:text-[#6b4eff]"
            >
              {visible ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-[#6b4eff] hover:text-[#5842c3] font-medium hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* ✅ CTA Button Style */}
          <StyledButton type="submit" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </StyledButton>
        </form>

        <p className="text-center text-gray-500 mt-5">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-[#6b4eff] font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;

