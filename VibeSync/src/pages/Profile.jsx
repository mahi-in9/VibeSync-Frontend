import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../apis/api";

const Profile = () => {
  const { user, checkAuth } = useAuth();
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [groupsCount, setGroupsCount] = useState(0);
  const [messages, setMessages] = useState([]);
  const [newAvatar, setNewAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("Fetching location...");
  const [coords, setCoords] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    if (user) {
      setAvatar(user.avatar || "");
      setGroupsCount(user.groups?.length || 0);
      fetchMessages();
      fetchLocation();
    }
  }, [user]);

  const fetchMessages = async () => {
    if (!user?._id) return;
    try {
      const res = await fetch(
        `${api}/messages/${user._id}`
      );
      const data = await res.json();
      setMessages(data || []);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    }
  };

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setCoords({ lat: latitude, lng: longitude });
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await res.json();
            const displayName =
              data.address?.city ||
              data.address?.town ||
              data.address?.village ||
              data.address?.county ||
              data.address?.state ||
              "Nearby location not found";
            setLocation(displayName);
          } catch (err) {
            console.error(err);
            setLocation("Unable to fetch location");
          }
        },
        (error) => {
          console.error(error);
          setLocation("Location access denied");
        }
      );
    } else {
      setLocation("Geolocation not supported");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewAvatar(file);
      setAvatar(URL.createObjectURL(file));
    }
  };

  const handleAvatarUpload = async () => {
    if (!newAvatar) return;
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("avatar", newAvatar);

    try {
      const res = await fetch(
        `${api}/users/avatar`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );

      const data = await res.json();
      if (res.ok) {
        setAvatar(data.avatar);
        setNewAvatar(null);
        checkAuth?.();
        alert("Avatar updated successfully!");
      } else {
        alert(data.message || "Failed to upload avatar");
      }
    } catch (err) {
      console.error(err);
      alert("Upload failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
       style={{
        background:
          "linear-gradient(135deg, #e9e8ff 0%, #f6f5ff 50%, #dbd2fa 100%)",
      }}
    >
      <div className="w-full max-w-4xl  rounded-2xl shadow-xl overflow-hidden"
       style={{
        background:
          "linear-gradient(135deg, #e9e8ff 0%, #f6f5ff 50%, #dbd2fa 100%)",
      }}
      >
        {/* Header / Avatar */}
        <div className="relative bg-pink-400 h-36">
          <div className="absolute bottom-0 left-6 -mb-12">
            <img
              src={avatar || "/default-avatar.png"}
              alt="User Avatar"
              className="w-28 h-28 rounded-full border-4 border-white object-cover shadow-lg"
            />
          </div>
        </div>

        {/* Profile Info */}
        <div className="pt-16 px-8 pb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div>
              <h2 className="text-3xl font-bold text-black">{user?.name}</h2>
              <p className="text-black mt-1">{user?.email}</p>
              <p className="text-black text-sm mt-1">Role: {user?.role}</p>
              <p className="text-black text-sm mt-1">Current Location: {location}</p>
            </div>

            {/* Avatar Upload */}
            <div className="mt-4 sm:mt-0 flex items-center gap-2">
              <input
                type="file"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-100 file:text-pink-700 hover:file:bg-pink-200"
                onChange={handleFileChange}
              />
              <button
                className="px-4 py-2 bg-pink-500 text-white rounded-lg shadow hover:bg-pink-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleAvatarUpload}
                disabled={loading || !newAvatar}
              >
                {loading ? "Uploading..." : "Update"}
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="mt-8 flex flex-wrap gap-6"
          
          >
            <div className="flex-1 min-w-[120px]  rounded-xl p-4 text-center shadow hover:shadow-md transition"
             style={{
        background:
          "linear-gradient(135deg, #e9e8ff 0%, #f6f5ff 50%, #dbd2fa 100%)",
      }}
            >
              <h3 className="text-lg font-semibold text-black">Groups</h3>
              <p className="text-2xl font-bold text-black">{groupsCount}</p>
            </div>
            <div className="flex-1 min-w-[120px] bg-pink-50 rounded-xl p-4 text-center shadow hover:shadow-md transition"
             style={{
        background:
          "linear-gradient(135deg, #e9e8ff 0%, #f6f5ff 50%, #dbd2fa 100%)",
      }}
            >
              <h3 className="text-lg font-semibold text-black">Messages</h3>
              <p className="text-2xl font-bold text-black">{messages.length}</p>
            </div>
          </div>

          {/* Messages List */}
          <div className="mt-8"
         
          >
            <h3 className="text-xl font-semibold text-black mb-4">Messages</h3>
            {messages.length === 0 ? (
              <p className="text-black">No messages yet.</p>
            ) : (
              <ul className="space-y-3">
                {messages.map((msg, index) => (
                  <li
                    key={msg._id || index}
                    className="p-4 border rounded-xl shadow-sm hover:shadow-md transition bg-pink-50"
                  >
                    <p className="text-black">
                      <span className="font-semibold">{msg.senderName}:</span>{" "}
                      {msg.text}
                    </p>
                    <p className="text-xs text-black mt-1">
                      {new Date(msg.createdAt).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
