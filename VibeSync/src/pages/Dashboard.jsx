import React, { useState, useEffect } from "react";
import {
  Copy, LogOut, Plus, Trash2, Users, MessageCircle, Music,
  Settings, Home, Send, Vote, Zap, Check, ChevronRight,
  AlertCircle, LogIn, Star, MapPin, Loader, X, Calendar, Clock, Eye
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, get, set, onValue, off } from 'firebase/database';


const ErrorNotification = ({ message }) => (
  <div className="fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 z-50 animate-pulse">
    <AlertCircle className="w-5 h-5" />
    {message}
  </div>
);

const SuccessNotification = ({ message }) => (
  <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 z-50 animate-pulse">
    <Check className="w-5 h-5" />
    {message}
  </div>
);

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const db = getDatabase();

  // Auto-hide notifications
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 4000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(''), 4000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  // Fetch user and groups from Firebase
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accounts = JSON.parse(localStorage.getItem('vp_accounts')) || [];
        const currentAccountId = localStorage.getItem('vp_currentAccountId');
        const user = accounts.find(a => a.id === currentAccountId);

        if (user) {
          setCurrentUser(user);

          // Fetch groups from Firebase
          if (user.groups && user.groups.length > 0) {
            const groupsData = [];
            for (const groupCode of user.groups) {
              const snapshot = await get(ref(db, `groups/${groupCode}`));
              if (snapshot.exists()) {
                groupsData.push({
                  code: groupCode,
                  ...snapshot.val()
                });
              }
            }
            setGroups(groupsData);
          }
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load dashboard');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [db]);

  const handleViewGroup = (groupCode) => {
    // Navigate to groups route with group code
    window.location.href = `/groups/${groupCode}`;
  };

  const getTotalMembers = () => {
    return groups.reduce((sum, g) => sum + Object.keys(g.members || {}).length, 0);
  };

  const getTotalMessages = () => {
    return groups.reduce((sum, g) => sum + Object.keys(g.messages || {}).length, 0);
  };

  return (
    <div className="min-h-screen p-4" style={{ background: "linear-gradient(135deg, #e9e8ff 0%, #f6f5ff 50%, #dbd2fa 100%)" }}>
      {error && <ErrorNotification message={error} />}
      {success && <SuccessNotification message={success} />}

      <div className="max-w-7xl mx-auto mt-12">
        {/* Header with User Info */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-5xl font-black text-purple-600">VibePlan</h1>
            <p className="text-gray-600 mt-2">Plan amazing outings with your friends</p>
          </div>
          {currentUser && (
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-purple-200">
              <p className="text-sm text-gray-600">Welcome Back!</p>
              <p className="text-2xl font-bold text-purple-600">{currentUser.name}</p>
              <p className="text-xs text-gray-500 mt-2">👥 {currentUser.groups?.length || 0} groups</p>
            </div>
          )}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <Loader className="w-12 h-12 animate-spin text-purple-600 mx-auto mb-4" />
            <p className="text-purple-600 text-lg font-semibold">Loading your groups...</p>
          </div>
        ) : (
          <>
            {/* Groups Section */}
            {groups.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-purple-600 flex items-center gap-2">
                    <Users className="w-8 h-8" />
                    Your Groups ({groups.length})
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {groups.map(group => (
                    <div
                      key={group.code}
                      className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition transform"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-purple-600 mb-2">{group.name}</h3>
                          <p className="text-sm text-gray-600 font-mono bg-purple-100 px-3 py-1 rounded w-fit">{group.code}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-2 text-gray-600 flex-1">
                          <Users className="w-4 h-4" />
                          <span className="font-semibold">{Object.keys(group.members || {}).length} members</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 flex-1">
                          <MessageCircle className="w-4 h-4" />
                          <span className="font-semibold">{Object.keys(group.messages || {}).length}</span>
                        </div>
                      </div>

                      <button
                        // onClick={() => handleViewGroup(groups)}
                       onClick={() => navigate("/groups")}
                        className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105 flex items-center justify-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        View Group
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {groups.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl shadow-xl">
                <Users className="w-20 h-20 text-purple-600 mx-auto mb-4 opacity-50" />
                <p className="text-purple-600 text-2xl font-bold mb-2">No groups yet</p>
                <p className="text-gray-600 mb-6">Start by creating or joining a group to plan awesome outings!</p>
                <a
                  href="/groups"
                  className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition transform hover:scale-105"
                >
                  Go to Groups →
                </a>
              </div>
            )}

            {/* Quick Stats */}
            {groups.length > 0 && (
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-600">
                  <p className="text-gray-600 text-sm">Total Groups</p>
                  <p className="text-4xl font-bold text-purple-600 mt-2">{groups.length}</p>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-indigo-600">
                  <p className="text-gray-600 text-sm">Total Members</p>
                  <p className="text-4xl font-bold text-indigo-600 mt-2">
                    {getTotalMembers()}
                  </p>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-pink-600">
                  <p className="text-gray-600 text-sm">Total Messages</p>
                  <p className="text-4xl font-bold text-pink-600 mt-2">
                    {getTotalMessages()}
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;