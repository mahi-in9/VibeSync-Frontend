import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, checkAuth } = useAuth(); 
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [groupsCount, setGroupsCount] = useState(0);
  const [messages, setMessages] = useState([]);
  const [newAvatar, setNewAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setAvatar(user.avatar || "");
      setGroupsCount(user.groups?.length || 0);
      fetchMessages();
    }
  }, [user]);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`https://vibesync-backend-1.onrender.com/api/messages/${user._id}`);
      const data = await res.json();
      setMessages(data || []);
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  const handleFileChange = (e) => {
    setNewAvatar(e.target.files[0]);
  };

  // Upload avatar
  const handleAvatarUpload = async () => {
    if (!newAvatar) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("avatar", newAvatar);

    try {
      const res = await fetch(`https://vibesync-backend-1.onrender.com/api/users/avatar`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await res.json();
      setAvatar(data.avatar); // updated avatar from backend
      setNewAvatar(null);
      checkAuth(); // refresh user data in context
    } catch (err) {
      console.error("Failed to upload avatar:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 mt-16"
    style={{
        background:
          "linear-gradient(135deg, #e9e8ff 0%, #f6f5ff 50%, #dbd2fa 100%)",
      }}
    >
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6"
      style={{
        background:
          "linear-gradient(135deg, #e9e8ff 0%, #f6f5ff 50%, #dbd2fa 100%)",
      }}
      >
        <div className="flex items-center space-x-6">
          <img
            src={avatar || "/default-avatar.png"}
            alt="User Avatar"
            className="w-24 h-24 rounded-full object-cover"
          />

          <div>
            <h2 className="text-2xl font-bold">{user?.name}</h2>
            <p className="text-gray-600">{user?.email}</p>
            <p className="text-sm text-gray-500">Role: {user?.role}</p>
          </div>
        </div>

        {/* Avatar update */}
        <div className="mt-4">
          <input type="file" onChange={handleFileChange} />
          <button
            className="ml-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            onClick={handleAvatarUpload}
            disabled={loading || !newAvatar}
          >
            {loading ? "Uploading..." : "Update Avatar"}
          </button>
        </div>

        {/* Groups */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Groups Joined</h3>
          <p>Total Groups: {groupsCount}</p>
        </div>

        {/* Messages */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Messages</h3>
          {messages.length === 0 ? (
            <p className="text-gray-500">No messages yet.</p>
          ) : (
            <ul className="space-y-2">
              {messages.map((msg) => (
                <li key={msg._id} className="p-2 border rounded-lg">
                  <p>
                    <span className="font-semibold">{msg.senderName}: </span>
                    {msg.text}
                  </p>
                  <p className="text-xs text-gray-400">{new Date(msg.createdAt).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
