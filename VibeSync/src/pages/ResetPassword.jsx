import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPasswordApi } from "../apis/api";
import { CTAButton, Container, Card } from "../components/StyleWrapper";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setMessage("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${resetPasswordApi}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, newPassword }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to reset password");

      setMessage(data.message);
      setNewPassword(""); setConfirmPassword("");
      setTimeout(() => navigate("/signin"), 2000);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-tr from-[#e9e8ff] via-[#f6f5ff] to-[#dbd2fa]">
      <Card className="max-w-md w-full p-10 bg-gradient-to-tr from-[#f9f8ff] via-[#f3f1ff] to-[#e5ddff] rounded-3xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-4 text-[#6b4eff]">Reset Password</h2>
        <p className="text-center text-gray-600 mb-6">Enter your new password to update your account.</p>

        {error && <p className="text-red-500 text-center text-sm mb-4">{error}</p>}
        {message && <p className="text-green-600 text-center text-sm mb-4">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6b4eff] transition"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6b4eff] transition"
          />
          <CTAButton type="submit" disabled={loading} className=" w-full py-3 font-semibold">
            {loading ? "Updating..." : "Update Password"}
          </CTAButton>
        </form>
      </Card>
    </Container>
  );
};

export default ResetPassword;
