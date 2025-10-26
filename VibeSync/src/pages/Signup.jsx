import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { StyledButton } from "../components/StyleWrapper";
import { useAuth } from "../context/AuthContext";
import { registerApi } from "../apis/api";

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [visible, setVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const userData = { name, email, password };

    try {
      setLoading(true);

      const response = await fetch(`${registerApi}`, {
        method: "POST",
        headers: {
          // "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // ✅ Store token and login user automatically
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      localStorage.setItem("vibeSyncUser", JSON.stringify(data));

      // ✅ Auto-login after signup using context
      await login(email, password);

      alert("Signup successful!");
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "Something went wrong, please try again!");
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
          Create Your <span className="text-[#5842c3]">Account</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6b4eff] transition"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
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

          <div className="relative">
            <label className="block text-gray-700 font-medium mb-2">
              Confirm Password
            </label>
            <input
              type={confirmVisible ? "text" : "password"}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6b4eff] transition pr-10"
            />
            <button
              type="button"
              onClick={() => setConfirmVisible(!confirmVisible)}
              className="absolute right-3 top-[45px] text-gray-500 hover:text-[#6b4eff]"
            >
              {confirmVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && <p className="text-red-500 text-center text-sm">{error}</p>}

          {/* ✅ CTA Button Style */}
          <StyledButton type="submit" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </StyledButton>
        </form>

        <p className="text-center text-gray-600 mt-5">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-[#6b4eff] font-semibold hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
