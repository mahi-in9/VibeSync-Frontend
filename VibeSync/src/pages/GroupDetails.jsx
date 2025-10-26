import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDatabase, ref, get, set, onValue, off } from 'firebase/database';
import {
  ArrowLeft, Users, MessageCircle, Copy, Send, Vote, Check,
  AlertCircle, Loader, LogOut, Plus, Trash2, X
} from 'lucide-react';

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

const GroupDetails = () => {
  const { groupCode } = useParams();
  const navigate = useNavigate();
  const db = getDatabase();

  const [currentUser, setCurrentUser] = useState(null);
  const [groupData, setGroupData] = useState(null);
  const [messages, setMessages] = useState({});
  const [polls, setPolls] = useState({});
  const [members, setMembers] = useState({});
  const [loading, setLoading] = useState(true);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showPollModal, setShowPollModal] = useState(false);
  const [message, setMessage] = useState('');
  const [pollTopic, setPollTopic] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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

  // Get current user
  useEffect(() => {
    const accounts = JSON.parse(localStorage.getItem('vp_accounts')) || [];
    const currentAccountId = localStorage.getItem('vp_currentAccountId');
    const user = accounts.find(a => a.id === currentAccountId);
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  // Fetch group data
  useEffect(() => {
    if (!groupCode) return;

    const unsubscribe = onValue(ref(db, `groups/${groupCode}`), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setGroupData(data);
        setMessages(data.messages || {});
        setPolls(data.polls || {});
        setMembers(data.members || {});
        setLoading(false);
      } else {
        setError('Group not found');
        setLoading(false);
      }
    });

    return () => off(ref(db, `groups/${groupCode}`));
  }, [groupCode, db]);

  const handleSendMessage = async () => {
    if (!message.trim() || !currentUser) return;

    try {
      const messageId = Date.now().toString();
      await set(ref(db, `groups/${groupCode}/messages/${messageId}`), {
        sender: currentUser.name,
        senderId: currentUser.id,
        text: message.trim(),
        timestamp: Date.now(),
      });
      setMessage('');
      setSuccess('Message sent!');
    } catch (err) {
      setError('Failed to send message');
    }
  };

  const handleCreatePoll = async () => {
    if (!pollTopic.trim() || pollOptions.filter(o => o.trim()).length < 2) {
      setError('Add topic and at least 2 options');
      return;
    }

    try {
      const pollId = Date.now().toString();
      await set(ref(db, `groups/${groupCode}/polls/${pollId}`), {
        topic: pollTopic.trim(),
        options: pollOptions.filter(o => o.trim()),
        votes: {},
      });
      setPollTopic('');
      setPollOptions(['', '']);
      setShowPollModal(false);
      setSuccess('Poll created!');
    } catch (err) {
      setError('Failed to create poll');
    }
  };

  const handleVote = async (pollId, option) => {
    try {
      await set(ref(db, `groups/${groupCode}/polls/${pollId}/votes/${currentUser.id}`), option);
      setSuccess('Vote recorded!');
    } catch (err) {
      setError('Failed to vote');
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(groupCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLeaveGroup = async () => {
    if (!confirm('Are you sure you want to leave this group?')) return;

    try {
      await set(ref(db, `groups/${groupCode}/members/${currentUser.id}`), null);

      const accounts = JSON.parse(localStorage.getItem('vp_accounts')) || [];
      const updatedAccounts = accounts.map(a =>
        a.id === currentUser.id
          ? { ...a, groups: (a.groups || []).filter(g => g !== groupCode) }
          : a
      );

      localStorage.setItem('vp_accounts', JSON.stringify(updatedAccounts));
      setSuccess('Left the group');
      setTimeout(() => navigate('/groups'), 2000);
    } catch (err) {
      setError('Failed to leave group');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50">
        <Loader className="w-12 h-12 animate-spin text-purple-600" />
      </div>
    );
  }

  if (!groupData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <p className="text-2xl font-bold text-gray-700 mb-4">Group not found</p>
        <button
          onClick={() => navigate('/groups')}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Back to Groups
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4" style={{ background: "linear-gradient(135deg, #e9e8ff 0%, #f6f5ff 50%, #dbd2fa 100%)" }}>
      {error && <ErrorNotification message={error} />}
      {success && <SuccessNotification message={success} />}

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 mt-6">
          <button
            onClick={() => navigate('/groups')}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <div className="text-center flex-1">
            <h1 className="text-4xl font-black text-purple-600">{groupData.name}</h1>
            <p className="text-gray-600 mt-2">{groupData.description || 'Group chat and planning'}</p>
          </div>
          <button
            onClick={handleLeaveGroup}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            <LogOut className="w-4 h-4" />
            Leave
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Members & Group Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
              <h3 className="text-lg font-bold text-purple-600 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Members ({Object.keys(members).length})
              </h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {Object.keys(members).map(memberId => (
                  <div key={memberId} className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg">
                    <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {members[memberId].name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-semibold text-gray-700">{members[memberId].name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Group Code */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <p className="text-sm text-gray-600 mb-2">Group Code</p>
              <div className="flex items-center gap-2">
                <p className="text-xl font-mono font-bold text-purple-600">{groupCode}</p>
                <button
                  onClick={handleCopyCode}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <Copy className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              {copied && <p className="text-xs text-green-600 mt-2">✓ Copied!</p>}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Messages Section */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-bold text-purple-600 mb-4 flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Messages
              </h3>
              <div className="bg-gray-50 rounded-xl p-4 h-96 overflow-y-auto mb-4 space-y-3">
                {Object.entries(messages)
                  .sort((a, b) => a[1].timestamp - b[1].timestamp)
                  .map(([id, msg]) => (
                    <div key={id} className="bg-white p-3 rounded-lg shadow-sm">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-purple-600">{msg.sender}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-gray-700">{msg.text}</p>
                    </div>
                  ))}
              </div>

              {/* Message Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send
                </button>
              </div>
            </div>

            {/* Polls Section */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-purple-600 flex items-center gap-2">
                  <Vote className="w-5 h-5" />
                  Polls
                </h3>
                <button
                  onClick={() => setShowPollModal(true)}
                  className="flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Create Poll
                </button>
              </div>

              {Object.keys(polls).length > 0 ? (
                <div className="space-y-4">
                  {Object.entries(polls).map(([pollId, poll]) => {
                    const totalVotes = Object.keys(poll.votes || {}).length;
                    const userVote = poll.votes?.[currentUser?.id];

                    return (
                      <div key={pollId} className="bg-gray-50 p-4 rounded-lg">
                        <p className="font-bold text-gray-800 mb-3">{poll.topic}</p>
                        <div className="space-y-2">
                          {poll.options?.map((option, idx) => {
                            const optionVotes = Object.values(poll.votes || {}).filter(v => v === option).length;
                            const percentage = totalVotes > 0 ? (optionVotes / totalVotes) * 100 : 0;

                            return (
                              <div key={idx}>
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm font-semibold text-gray-700">{option}</span>
                                  <span className="text-xs text-gray-600">{optionVotes} votes</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-purple-600 h-2 rounded-full transition-all"
                                    style={{ width: `${percentage}%` }}
                                  />
                                </div>
                                {userVote === option && (
                                  <p className="text-xs text-purple-600 font-semibold mt-1">✓ Your vote</p>
                                )}
                              </div>
                            );
                          })}
                        </div>
                        {!userVote && (
                          <div className="flex gap-2 mt-3 flex-wrap">
                            {poll.options?.map((option, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleVote(pollId, option)}
                                className="text-xs px-3 py-1 bg-purple-100 text-purple-600 rounded-full hover:bg-purple-200 transition"
                              >
                                Vote: {option}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-600 text-center py-8">No polls yet. Create one to get started!</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Create Poll Modal */}
      {showPollModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-purple-600">Create Poll</h2>
              <button
                onClick={() => setShowPollModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Poll Topic</label>
                <input
                  type="text"
                  value={pollTopic}
                  onChange={(e) => setPollTopic(e.target.value)}
                  placeholder="What's the poll about?"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                />
              </div>

              {pollOptions.map((option, idx) => (
                <div key={idx}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Option {idx + 1}</label>
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...pollOptions];
                      newOptions[idx] = e.target.value;
                      setPollOptions(newOptions);
                    }}
                    placeholder={`Option ${idx + 1}`}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                  />
                </div>
              ))}

              <button
                onClick={() => setPollOptions([...pollOptions, ''])}
                className="w-full py-2 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Option
              </button>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowPollModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePoll}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                Create Poll
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupDetails;