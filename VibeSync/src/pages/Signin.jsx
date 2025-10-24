import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // ✅ Placeholder login logic
    // Replace this with real authentication
    if (email && password) {
      console.log("Logged in:", { email, password });
      // Redirect to dashboard after login
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blur px-4"
    style={{
        background: "linear-gradient(135deg, #e9e8ff 0%, #f6f5ff 50%, #dbd2fa 100%)"
      }}
    >
      <div className="max-w-md w-full bg-white rounded-3xl shadow-lg p-10"
      style={{
        background: "linear-gradient(135deg, #e9e8ff 0%, #f6f5ff 50%, #dbd2fa 100%)"
      }}
      >
        <h2 className="text-3xl font-bold  text-center mb-6">
          Sign In to <span className="text-[#6b4eff]">VibeSync</span>
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
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

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6b4eff] transition"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#6b4eff] text-white font-bold py-3 rounded-2xl hover:bg-[#5842c3] transition"
          >
            Sign In
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center text-gray-500 mt-5">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#6b4eff] font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
