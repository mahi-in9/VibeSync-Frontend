import React, { useState } from "react";
import { Link } from "react-router-dom";
import { StyledButton } from "../components/StyleWrapper";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      setLoading(true);

      const response = await fetch(
        "https://vibesync-backend-1.onrender.com/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send reset email");
      }

      setMessage("Password reset link has been sent to your email!");
      setEmail("");
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
        <h2 className="text-3xl font-bold text-center mb-4 text-[#6b4eff]">
          Forgot Password?
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Enter your email address and we'll send you a link to reset your password.
        </p>

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

          {error && <p className="text-red-500 text-center text-sm">{error}</p>}
          {message && <p className="text-green-600 text-center text-sm">{message}</p>}

          <StyledButton type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </StyledButton>
        </form>

        <p className="text-center text-gray-500 mt-5">
          Remember your password?{" "}
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

export default ForgotPassword;
