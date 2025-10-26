import React, { useState } from "react";
import { Plus, Users, Film, Coffee, Smile, Send, Star } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  const [groups, setGroups] = useState([
    { id: 1, name: "Friends Night", members: 5 },
    { id: 2, name: "Movie Club", members: 8 },
    { id: 3, name: "Weekend Trips", members: 4 },
  ]);

  const [suggestions] = useState([
    { type: "Movie", name: "Inception", rating: 8.8, icon: Film },
    { type: "Cafe", name: "Cafe Mocha", rating: 4.5, icon: Coffee },
    { type: "Hangout", name: "Lakeside Park", rating: 4.7, icon: Smile },
  ]);

  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleCreateGroup = () => {
    const newGroup = { id: Date.now(), name: "New Group", members: 1 };
    setGroups([...groups, newGroup]);
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setMessages([...messages, messageInput]);
      setMessageInput('');
    }
  };

  const cardClasses = "bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition"; // Common card styling

  return (
    <div
      className="min-h-screen p-6 mt-10"
      style={{
        background: "linear-gradient(135deg, #e9e8ff 0%, #f6f5ff 50%, #dbd2fa 100%)",
      }}
    >
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <h2 className="text-2xl text-gray-800 font-bold">Welcome, {user?.name || "Welcome Dashboard"}</h2>
      </header>

      {/* Groups Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your Groups</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {groups.map((group) => (
            <div key={group.id} className={cardClasses}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">{group.name}</h3>
                <span className="text-sm text-gray-500">{group.members} members</span>
              </div>
              <div className="flex gap-3 mt-2">
                <button className="flex-1 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-400 flex items-center justify-center gap-2 transition font-bold">
                  <Users className="w-4 h-4" /> Join
                </button>
                <button className="flex-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center justify-center gap-2 transition font-bold">
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Suggestions Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Smart Suggestions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {suggestions.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div key={idx} className={cardClasses}>
                <div className="flex items-center gap-3 mb-3">
                  <IconComponent
                    className={`w-6 h-6 ${
                      item.type === "Movie"
                        ? "text-indigo-600"
                        : item.type === "Cafe"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  />
                  <h3 className="font-bold">{item.name}</h3>
                </div>
                <p className="text-gray-500">
                  <Star className="w-4 h-4 inline mr-1 fill-yellow-400 text-yellow-400" />
                  Rating: {item.rating}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Chat Section */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Group Chat / Polls</h2>
        <div className={cardClasses + " flex flex-col gap-4"}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600 font-semibold">Plan movie night?</span>
            <div className="flex gap-2">
              <button className="px-2 py-1 bg-blue-100 rounded-full hover:bg-blue-200 transition text-lg">👍</button>
              <button className="px-2 py-1 bg-red-100 rounded-full hover:bg-red-200 transition text-lg">❤️</button>
              <button className="px-2 py-1 bg-yellow-100 rounded-full hover:bg-yellow-200 transition text-lg">😂</button>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg p-4 h-32 overflow-y-auto mb-4">
            {messages.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No messages yet...</p>
            ) : (
              <div className="space-y-2">
                {messages.map((msg, idx) => (
                  <div key={idx} className="bg-white p-2 rounded text-gray-800 text-sm">
                    {msg}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleSendMessage}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2 font-bold"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
