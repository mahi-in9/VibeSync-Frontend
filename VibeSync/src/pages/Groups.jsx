import React, { useState, useEffect } from 'react';
import {
  Copy, LogOut, Plus, Trash2, Users, MessageCircle, Music,
  Settings, Home, Send, Vote, Zap, Check, ChevronRight,
  AlertCircle, LogIn, Star, MapPin, Loader, X
} from 'lucide-react';

// Firebase imports
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, remove, onValue, off } from 'firebase/database';

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTDde55c_RmBDzR5_kn7xCh32UeGEsAqk",
  authDomain: "vibesync-ad250.firebaseapp.com",
  databaseURL: "https://vibesync-ad250-default-rtdb.firebaseio.com",
  projectId: "vibesync-ad250",
  storageBucket: "vibesync-ad250.appspot.com",
  messagingSenderId: "732552304511",
  appId: "1:732552304511:web:909fd44e9581a57324ac4a",
  measurementId: "G-3TJKCSXFT3"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const firebaseDB = {
  getGroupData: async (groupCode) => {
    try {
      const snapshot = await get(ref(db, `groups/${groupCode}`));
      return snapshot.exists() ? snapshot.val() : null;
    } catch (err) {
      console.error('Error fetching group:', err);
      return null;
    }
  },

  setGroupData: async (groupCode, data) => {
    try {
      await set(ref(db, `groups/${groupCode}`), data);
      return true;
    } catch (err) {
      console.error('Error setting group:', err);
      return false;
    }
  },

  updateMember: async (groupCode, userId, memberData) => {
    try {
      await set(ref(db, `groups/${groupCode}/members/${userId}`), memberData);
      return true;
    } catch (err) {
      console.error('Error updating member:', err);
      return false;
    }
  },

  deleteMember: async (groupCode, userId) => {
    try {
      await remove(ref(db, `groups/${groupCode}/members/${userId}`));
      return true;
    } catch (err) {
      console.error('Error deleting member:', err);
      return false;
    }
  },

  addMessage: async (groupCode, messageId, messageData) => {
    try {
      await set(ref(db, `groups/${groupCode}/messages/${messageId}`), messageData);
      return true;
    } catch (err) {
      console.error('Error adding message:', err);
      return false;
    }
  },

  addPoll: async (groupCode, pollId, pollData) => {
    try {
      await set(ref(db, `groups/${groupCode}/polls/${pollId}`), pollData);
      return true;
    } catch (err) {
      console.error('Error adding poll:', err);
      return false;
    }
  },

  addVote: async (groupCode, pollId, userId, option) => {
    try {
      await set(ref(db, `groups/${groupCode}/polls/${pollId}/votes/${userId}`), option);
      return true;
    } catch (err) {
      console.error('Error adding vote:', err);
      return false;
    }
  },

  listenToGroup: (groupCode, callback) => {
    const groupRef = ref(db, `groups/${groupCode}`);
    onValue(groupRef, (snapshot) => {
      callback(snapshot.val());
    });
    return () => off(groupRef);
  },
};

const CreateGroupCard = ({ onSubmit, loading }) => {
  const [groupName, setGroupName] = useState('');

  const handleClick = () => {
    if (groupName.trim()) {
      onSubmit(groupName);
      setGroupName('');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition transform hover:scale-105">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-purple-100 p-3 rounded-lg">
          <Plus className="w-8 h-8 text-purple-600" />
        </div>
        <h3 className="text-2xl font-bold text-purple-600">Create Group</h3>
      </div>
      <input
        type="text"
        placeholder="Enter group name..."
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleClick()}
        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-purple-600 mb-4 transition"
        disabled={loading}
      />
      <button
        onClick={handleClick}
        disabled={loading}
        className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl hover:shadow-lg transition transform hover:scale-105 disabled:opacity-50"
      >
        {loading ? <Loader className="w-4 h-4 animate-spin inline mr-2" /> : <Plus className="w-4 h-4 inline mr-2" />}
        {loading ? 'Creating...' : 'Create ✨'}
      </button>
    </div>
  );
};

const JoinGroupCard = ({ onSubmit, loading }) => {
  const [groupCode, setGroupCode] = useState('');

  const handleClick = () => {
    if (groupCode.trim()) {
      onSubmit(groupCode);
      setGroupCode('');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition transform hover:scale-105" style={{ background: "linear-gradient(135deg, #e9e8ff 0%, #f6f5ff 50%, #dbd2fa 100%)" }}>
      <div className="flex items-center gap-3 mb-6">
        <LogIn className="w-8 h-8 text-indigo-600" />
        <h3 className="text-2xl font-bold text-indigo-600">Join Group</h3>
      </div>
      <input
        type="text"
        placeholder="Enter group code..."
        value={groupCode}
        onChange={(e) => setGroupCode(e.target.value.toUpperCase())}
        onKeyPress={(e) => e.key === 'Enter' && handleClick()}
        maxLength={6}
        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-indigo-600 mb-4 text-center text-2xl font-mono font-bold transition"
        disabled={loading}
      />
      <button
        onClick={handleClick}
        disabled={loading}
        className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg transition transform hover:scale-105 disabled:opacity-50"
      >
        {loading ? <Loader className="w-4 h-4 animate-spin inline mr-2" /> : <LogIn className="w-4 h-4 inline mr-2" />}
        {loading ? 'Joining...' : 'Join 🎉'}
      </button>
    </div>
  );
};

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

const GroupCardWithData = ({ code, onSelect }) => {
  const [groupData, setGroupData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroup = async () => {
      const data = await firebaseDB.getGroupData(code);
      setGroupData(data);
      setLoading(false);
    };
    fetchGroup();
  }, [code]);

  if (loading) {
    return <div className="bg-white rounded-2xl shadow-xl p-6 animate-pulse h-32"></div>;
  }

  if (!groupData) return null;

  return (
    <button
      onClick={() => onSelect({ code, name: groupData.name })}
      className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition text-left hover:scale-105 transform hover:bg-gray-50"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-purple-600 mb-1">{groupData.name}</h3>
          <p className="text-sm text-gray-600 font-mono bg-gray-100 px-3 py-1 rounded w-fit">{code}</p>
        </div>
        <ChevronRight className="w-6 h-6 text-purple-600" />
      </div>
      <div className="flex items-center gap-2 text-gray-600">
        <Users className="w-4 h-4" />
        <span className="font-semibold">{Object.keys(groupData.members || {}).length} members</span>
      </div>
    </button>
  );
};

const Groups = () => {
  const [accounts, setAccounts] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('vp_accounts')) || [];
    return saved;
  });

  const [currentAccountId, setCurrentAccountId] = useState(() => {
    return localStorage.getItem('vp_currentAccountId') || null;
  });

  const [showCreateAccount, setShowCreateAccount] = useState(!currentAccountId);
  const [newAccountName, setNewAccountName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const currentAccount = accounts.find(a => a.id === currentAccountId);

  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groupData, setGroupData] = useState(null);
  const [messages, setMessages] = useState({});
  const [polls, setPolls] = useState({});
  const [members, setMembers] = useState({});
  const [showChatModal, setShowChatModal] = useState(false);
  const [showPollModal, setShowPollModal] = useState(false);

  const [message, setMessage] = useState('');
  const [mood, setMood] = useState('chill');
  const [pollTopic, setPollTopic] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const moods = [
    { value: 'chill', label: 'Chill', icon: '😎', color: 'from-blue-400 to-blue-600' },
    { value: 'adventurous', label: 'Adventure', icon: '🚀', color: 'from-orange-400 to-orange-600' },
    { value: 'foodie', label: 'Foodie', icon: '🍕', color: 'from-red-400 to-red-600' },
    { value: 'romantic', label: 'Romantic', icon: '💕', color: 'from-pink-400 to-pink-600' },
  ];

  const suggestions = {
    chill: [
      { name: 'Coffee Lounge', type: 'café', rating: 4.5 },
      { name: 'Book Store', type: 'bookstore', rating: 4.3 },
      { name: 'Park Picnic', type: 'park', rating: 4.4 },
    ],
    adventurous: [
      { name: 'Mountain Trek', type: 'adventure', rating: 4.8 },
      { name: 'Zip-line Park', type: 'adventure', rating: 4.7 },
      { name: 'Kayaking', type: 'water', rating: 4.6 },
    ],
    foodie: [
      { name: 'Italian Kitchen', type: 'restaurant', rating: 4.8 },
      { name: 'Street Food', type: 'street food', rating: 4.6 },
      { name: 'Michelin Star', type: 'fine dining', rating: 4.9 },
    ],
    romantic: [
      { name: 'Candlelit Restaurant', type: 'restaurant', rating: 4.9 },
      { name: 'Sunset Beach', type: 'beach', rating: 4.7 },
      { name: 'Jazz Lounge', type: 'lounge', rating: 4.5 },
    ],
  };

  const movies = [
    { title: 'Dune: Part Two', genre: 'Sci-Fi', rating: 4.7 },
    { title: 'The Brutalist', genre: 'Drama', rating: 4.6 },
    { title: 'Oppenheimer', genre: 'Biography', rating: 4.8 },
  ];

  useEffect(() => {
    localStorage.setItem('vp_accounts', JSON.stringify(accounts));
    localStorage.setItem('vp_currentAccountId', currentAccountId || '');
  }, [accounts, currentAccountId]);

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

  useEffect(() => {
    if (!selectedGroup || !currentAccount) return;

    const unsubscribe = firebaseDB.listenToGroup(selectedGroup.code, (data) => {
      if (data) {
        setGroupData(data);
        setMessages(data.messages || {});
        setPolls(data.polls || {});
        setMembers(data.members || {});
      }
    });

    return () => unsubscribe?.();
  }, [selectedGroup, currentAccount]);

  const showError = (msg) => setError(msg);
  const showSuccessMsg = (msg) => setSuccess(msg);

  const createAccount = () => {
    if (!newAccountName.trim()) {
      showError('Enter account name');
      return;
    }

    const newAccount = {
      id: 'user_' + Math.random().toString(36).substr(2, 9),
      name: newAccountName.trim(),
      groups: [],
      createdAt: Date.now()
    };

    setAccounts([...accounts, newAccount]);
    setCurrentAccountId(newAccount.id);
    setNewAccountName('');
    setShowCreateAccount(false);
    showSuccessMsg(`✅ Account "${newAccount.name}" created!`);
  };

  const switchAccount = (accountId) => {
    setCurrentAccountId(accountId);
    setSelectedGroup(null);
  };

  const deleteAccount = (accountId) => {
    const accountToDelete = accounts.find(a => a.id === accountId);
    if (confirm(`Delete account "${accountToDelete.name}"? This action cannot be undone.`)) {
      setAccounts(accounts.filter(a => a.id !== accountId));
      if (currentAccountId === accountId) {
        const remaining = accounts.filter(a => a.id !== accountId);
        setCurrentAccountId(remaining.length > 0 ? remaining[0].id : null);
        setShowCreateAccount(true);
      }
      showSuccessMsg('Account deleted');
    }
  };

  const generateCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handleCreateGroup = async (groupName) => {
    if (!groupName.trim()) {
      showError('Enter group name');
      return;
    }

    setLoading(true);
    try {
      const code = generateCode();
      const groupDataToSet = {
        code,
        name: groupName.trim(),
        creatorId: currentAccount.id,
        creatorName: currentAccount.name,
        members: {
          [currentAccount.id]: {
            name: currentAccount.name,
            joinedAt: Date.now()
          }
        },
        messages: {},
        polls: {},
        createdAt: Date.now(),
      };

      const success = await firebaseDB.setGroupData(code, groupDataToSet);

      if (success) {
        const updatedAccount = {
          ...currentAccount,
          groups: [...(currentAccount.groups || []), code]
        };

        setAccounts(accounts.map(a => a.id === currentAccount.id ? updatedAccount : a));
        setSelectedGroup({ code, name: groupName.trim() });
        setGroupData(groupDataToSet);
        setMembers(groupDataToSet.members);
        showSuccessMsg(`✅ Group "${groupName}" created! Code: ${code}`);
      } else {
        showError('Failed to create group');
      }
    } catch (err) {
      showError('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinGroup = async (groupCode) => {
    if (!groupCode.trim()) {
      showError('Enter group code');
      return;
    }

    setLoading(true);
    try {
      const code = groupCode.toUpperCase();
      const groupDataFetched = await firebaseDB.getGroupData(code);

      if (!groupDataFetched) {
        showError('Group not found. Invalid code.');
        setLoading(false);
        return;
      }

      if (groupDataFetched.members && groupDataFetched.members[currentAccount.id]) {
        showError('You are already a member of this group');
        setLoading(false);
        return;
      }

      const success = await firebaseDB.updateMember(code, currentAccount.id, {
        name: currentAccount.name,
        joinedAt: Date.now()
      });

      if (success) {
        const updatedAccount = {
          ...currentAccount,
          groups: [...(currentAccount.groups || []), code]
        };

        setAccounts(accounts.map(a => a.id === currentAccount.id ? updatedAccount : a));
        setSelectedGroup({ code, name: groupDataFetched.name });
        setGroupData(groupDataFetched);
        setMembers(groupDataFetched.members || {});
        showSuccessMsg(`✅ Joined "${groupDataFetched.name}"!`);
      } else {
        showError('Failed to join group');
      }
    } catch (err) {
      showError('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedGroup || !currentAccount) return;

    try {
      const messageId = Date.now().toString();
      const success = await firebaseDB.addMessage(selectedGroup.code, messageId, {
        sender: currentAccount.name,
        senderId: currentAccount.id,
        text: message.trim(),
        timestamp: Date.now(),
      });

      if (success) {
        setMessage('');
      }
    } catch (err) {
      showError('Failed to send message');
    }
  };

  const handleCreatePoll = async () => {
    if (!pollTopic.trim() || pollOptions.filter(o => o.trim()).length < 2) {
      showError('Add topic and at least 2 options');
      return;
    }

    try {
      const pollId = Date.now().toString();
      const success = await firebaseDB.addPoll(selectedGroup.code, pollId, {
        topic: pollTopic.trim(),
        options: pollOptions.filter(o => o.trim()),
        votes: {},
      });

      if (success) {
        setPollTopic('');
        setPollOptions(['', '']);
        setShowPollModal(false);
        showSuccessMsg('Poll created!');
      }
    } catch (err) {
      showError('Failed to create poll');
    }
  };

  const handleVote = async (pollId, option) => {
    try {
      await firebaseDB.addVote(selectedGroup.code, pollId, currentAccount.id, option);
    } catch (err) {
      showError('Failed to vote');
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(selectedGroup.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLeaveGroup = async () => {
    if (!confirm('Leave this group?')) return;

    try {
      const success = await firebaseDB.deleteMember(selectedGroup.code, currentAccount.id);

      if (success) {
        const updatedAccount = {
          ...currentAccount,
          groups: (currentAccount.groups || []).filter(g => g !== selectedGroup.code)
        };

        setAccounts(accounts.map(a => a.id === currentAccount.id ? updatedAccount : a));
        setSelectedGroup(null);
        setGroupData(null);
        showSuccessMsg('Left the group');
      }
    } catch (err) {
      showError('Failed to leave group');
    }
  };

  // ============ RENDER: CREATE ACCOUNT SCREEN ============
  if (!currentAccount || showCreateAccount) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "linear-gradient(135deg, #e9e8ff 0%, #f6f5ff 50%, #dbd2fa 100%)" }}>
        {error && <ErrorNotification message={error} />}
        {success && <SuccessNotification message={success} />}

        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full" style={{ background: "linear-gradient(135deg, #e9e8ff 0%, #f6f5ff 50%, #dbd2fa 100%)" }}>
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-2">VibePlan</h1>
          <p className="text-gray-600 mb-8">Create or join group plans with friends</p>

          {accounts.length > 0 && (
            <>
              <div className="mb-6">
                <h3 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Your Accounts ({accounts.length})
                </h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {accounts.map(acc => (
                    <div key={acc.id} className="flex items-center justify-between bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition group">
                      <button
                        onClick={() => switchAccount(acc.id)}
                        className="flex-1 text-left font-medium text-gray-800 hover:text-purple-600 transition"
                      >
                        {acc.name}
                        <span className="text-xs text-gray-500 ml-2">({acc.groups?.length || 0} groups)</span>
                      </button>

                      <button
                        onClick={() => deleteAccount(acc.id)}
                        className="text-red-500 hover:text-red-700 p-1 opacity-0 group-hover:opacity-100 transition"
                        title="Delete account"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-gray-300 mb-6"></div>
            </>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2">Your Name:</label>
              <input
                type="text"
                placeholder="Enter your name..."
                value={newAccountName}
                onChange={(e) => setNewAccountName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && createAccount()}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-purple-500 transition"
                autoFocus
              />
            </div>
            <button
              onClick={createAccount}
              className="bg-[#6b4eff] text-white font-bold py-[14px] rounded-full w-full shadow-[1px_5px_0_0_#4e36b8] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[1px_8px_0_0_#4e36b8] active:translate-y-[3px] active:shadow-[0_0_0_0_#4e36b8]"
            >
              <Plus className="w-4 h-4 inline mr-2" />
              Use Name
            </button>

            {currentAccount && (
              <button
                onClick={() => setShowCreateAccount(false)}
                className="w-full py-3 bg-gray-200 text-gray-800 font-bold rounded-xl hover:bg-gray-300 transition"
              >
                Back to App
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ============ RENDER: GROUPS LIST SCREEN ============
  if (!selectedGroup) {
    return (
      <div className="min-h-screen p-4" style={{ background: "linear-gradient(135deg, #e9e8ff 0%, #f6f5ff 50%, #dbd2fa 100%)" }}>
        {error && <ErrorNotification message={error} />}
        {success && <SuccessNotification message={success} />}

        <div className="max-w-6xl mx-auto mt-20">
          <div className="flex justify-between items-center mb-8 mt-6">
            <div>
              <h1 className="text-4xl font-black text-purple-600">VibePlan</h1>
              <p className="text-gray-600 mt-1">Plan outings with multiple accounts</p>
            </div>
            <button
              onClick={() => setShowCreateAccount(true)}
              className="bg-white text-purple-600 px-6 py-3 rounded-xl font-bold hover:shadow-lg transition flex items-center gap-2 hover:scale-105 transform"
              title="Manage accounts"
            >
              <Settings className="w-5 h-5" />
              {currentAccount?.name}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <CreateGroupCard onSubmit={handleCreateGroup} loading={loading} />
            <JoinGroupCard onSubmit={handleJoinGroup} loading={loading} />
          </div>

          {currentAccount?.groups && currentAccount.groups.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold text-purple-600 mb-6">Your Groups ({currentAccount.groups.length})</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentAccount.groups.map(code => (
                  <GroupCardWithData key={code} code={code} onSelect={setSelectedGroup} />
                ))}
              </div>
            </div>
          )}

          {(!currentAccount?.groups || currentAccount.groups.length === 0) && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-purple-600 mx-auto mb-4 opacity-50" />
              <p className="text-purple-600 text-xl font-semibold">No groups yet</p>
              <p className="text-gray-600">Create a new group or join an existing one above!</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ============ RENDER: MAIN GROUP SCREEN ============
  return (
    <div className="min-h-screen p-4" style={{ background: "linear-gradient(135deg, #e9e8ff 0%, #f6f5ff 50%, #dbd2fa 100%)" }}>
      {error && <ErrorNotification message={error} />}
      {success && <SuccessNotification message={success} />}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 mt-6  rounded-2xl mt-20  p-6">
          <div>
            <button
              onClick={() => setSelectedGroup(null)}
              className="text-purple-600 hover:text-purple-800 flex items-center gap-2 mb-2 transition hover:scale-105 transform font-semibold"
            >
              <Home className="w-5 h-5" />
              Back to Groups
            </button>
            <h1 className="text-4xl font-black text-purple-600">{selectedGroup.name}</h1>
            <p className="text-gray-600 text-sm mt-1">Code: <span className="font-mono font-bold">{selectedGroup.code}</span></p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleCopyCode}
              className="bg-purple-600 text-white p-3 rounded-xl hover:bg-purple-700 transition transform hover:scale-110 shadow-lg"
              title="Copy group code"
            >
              <Copy className="w-6 h-6" />
            </button>
            <button
              onClick={handleLeaveGroup}
              title="Leave this group"
              className="bg-red-500 text-white px-6 py-3 rounded-full font-bold w-full inline-flex items-center justify-center gap-2 shadow-[1px_5px_0_0_#b91c1c] transition-all duration-200 ease-in-out hover:-translate-y-[3px] hover:shadow-[1px_8px_0_0_#b91c1c] active:translate-y-[3px] active:shadow-[0_0_0_0_#b91c1c]"
            >
              <LogOut className="w-5 h-5" />
              Leave
            </button>

          </div>
        </div>

        {copied && (
          <div className="fixed top-20 right-4 bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-2">
            <Check className="w-5 h-5" /> Copied to clipboard!
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Chat Section */}
            <div className="  p-6">
              <button
                onClick={() => setShowChatModal(!showChatModal)}
                className="w-50 flex items-center justify-between p-4  text-white rounded-xl font-bold hover:shadow-lg transition transform hover:scale-105"
                style={{ background: "linear-gradient(135deg, #e9e8ff 0%, #f6f5ff 50%, #dbd2fa 100%)" }}
              >
                <div className="flex text-purple-800 items-center gap-2">
                  <MessageCircle className="w-6 h-6" />
                  <span>Group Chat</span>
                </div>
                <ChevronRight className={`w-6 h-6 transition ${showChatModal ? 'rotate-90' : ''}`} />
              </button>

              {showChatModal && (
                <div className="mt-4 space-y-4">
                  <div className=" rounded-xl p-4 h-72 overflow-y-auto border-2 border-gray-200">
                    {Object.entries(messages).length > 0 ? (
                      Object.entries(messages)
                        .sort((a, b) => a[1].timestamp - b[1].timestamp)
                        .map(([id, msg]) => (
                          <div key={id} className="mb-4">
                            <div className="flex justify-between items-baseline">
                              <p className="font-bold text-purple-600 flex items-center gap-1">
                                {msg.senderId === currentAccount.id && <Check className="w-3 h-3" />}
                                {msg.sender}
                              </p>
                              <p className="text-xs text-gray-500">
                                {new Date(msg.timestamp).toLocaleTimeString()}
                              </p>
                            </div>
                            <p className="bg-white p-3 rounded-lg mt-1 text-gray-800 border-l-4 border-purple-600">
                              {msg.text}
                            </p>
                          </div>
                        ))
                    ) : (
                      <p className="text-gray-500 text-center py-20 flex flex-col items-center gap-2">
                        <MessageCircle className="w-8 h-8 opacity-50" />
                        No messages yet. Start chatting!
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-purple-600 transition"
                    />
                    <button
                      onClick={handleSendMessage}
                      title="Send message"
                      className="bg-purple-600 text-white px-6 py-3 rounded-full font-bold w-20 inline-flex items-center justify-center gap-2 shadow-[1px_5px_0_0_#4c1d95] transition-all duration-200 ease-in-out hover:-translate-y-[3px] hover:shadow-[1px_8px_0_0_#4c1d95] active:translate-y-[3px] active:shadow-[0_0_0_0_#4c1d95]"
                    >
                      <Send className="w-5 h-5" />

                    </button>

                  </div>
                </div>
              )}
            </div>

            {/* Mood & Suggestions */}
            <div className=" rounded-2xl shadow-xl p-6"
            style={{ background: "linear-gradient(135deg, #e9e8ff 0%, #f6f5ff 50%, #dbd2fa 100%)" }}
            >
              <h2 className="text-2xl font-bold text-purple-600 mb-4 flex items-center gap-2">
                <Zap className="w-6 h-6" />
                🎯 What's the Vibe?
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {moods.map((m) => (
                  <button
                    key={m.value}
                    onClick={() => setMood(m.value)}
                    className={`p-4 rounded-xl font-bold transition transform ${mood === m.value
                      ? `bg-gradient-to-r ${m.color} text-white scale-105 shadow-lg`
                      : 'bg-gray-100 text-gray-800 hover:scale-105 hover:bg-gray-200'
                      }`}
                  >
                    {m.icon} {m.label}
                  </button>
                ))}
              </div>
              <h3 className="font-bold text-purple-600 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Recommended Spots
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {suggestions[mood].map((spot, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-br from-purple-100 to-indigo-100 p-4 rounded-xl border-2 border-purple-200 hover:shadow-lg transition hover:scale-105 transform"
                  >
                    <p className="font-bold text-gray-800">{spot.name}</p>
                    <p className="text-sm text-gray-600 mb-2">{spot.type}</p>
                    <p className="text-lg font-bold text-purple-600 flex items-center gap-1">
                      <Star className="w-4 h-4" /> {spot.rating}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Polls Section */}
            <div >
              <button
                onClick={() => setShowPollModal(!showPollModal)}
                className="w-70 flex items-center justify-between p-4  text-white rounded-xl font-bold hover:shadow-lg transition transform hover:scale-105"
                style={{ background: "linear-gradient(135deg, #e9e8ff 0%, #f6f5ff 50%, #dbd2fa 100%)" }}
              >
                <div className="flex text-purple-800 items-center gap-2">
                  <Vote className="w-6 h-6" />
                  <span>📋 Create/View Polls</span>
                </div>
                <ChevronRight className={`w-6 h-6 transition ${showPollModal ? 'rotate-90' : ''}`} />
              </button>

              {showPollModal && (
                <div className="mt-4 space-y-6">
                  {/* Display existing polls */}
                  {Object.entries(polls).length > 0 && (
                    <div className="space-y-4">
                      <h3 className="font-bold text-gray-700">Active Polls</h3>
                      {Object.entries(polls).map(([id, poll]) => (
                        <div key={id} className="border-2 border-purple-300 rounded-xl p-4 bg-gray-50">
                          <p className="font-bold text-lg text-purple-600 mb-4">{poll.topic}</p>
                          <div className="space-y-2">
                            {poll.options.map((option) => {
                              const voteCount = poll.votes ? Object.values(poll.votes).filter((v) => v === option).length : 0;
                              const isVoted = poll.votes && poll.votes[currentAccount.id] === option;
                              return (
                                <button
                                  key={option}
                                  onClick={() => handleVote(id, option)}
                                  className={`w-full p-3 rounded-lg font-bold text-left transition flex justify-between items-center ${isVoted
                                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                                    : 'bg-white text-gray-800 hover:bg-gray-100 border-2 border-gray-300'
                                    }`}
                                >
                                  <span>{option}</span>
                                  <span className="text-sm font-semibold">{voteCount} votes</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Create new poll */}
                  <div className=" p-6 rounded-xl border-2 border-gray-300 space-y-3"
                style={{ background: "linear-gradient(135deg, #e9e8ff 0%, #f6f5ff 50%, #dbd2fa 100%)" }}
                  >
                    <h3 className="font-bold text-gray-700 flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Create New Poll
                    </h3>
                    <input
                      type="text"
                      placeholder="What should we vote on?"
                      value={pollTopic}
                      onChange={(e) => setPollTopic(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600 transition"
                    />
                    <div className="space-y-2">
                      {pollOptions.map((opt, idx) => (
                        <input
                          key={idx}
                          type="text"
                          placeholder={`Option ${idx + 1}`}
                          value={opt}
                          onChange={(e) => {
                            const updated = [...pollOptions];
                            updated[idx] = e.target.value;
                            setPollOptions(updated);
                          }}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600 transition"
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => setPollOptions([...pollOptions, ''])}
                      className="w-full px-4 py-3 bg-gray-300 rounded-lg font-bold hover:bg-gray-400 transition text-gray-800 flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Option
                    </button>
                    <button
                      onClick={handleCreatePoll}
                      title="Create a new poll"
                      className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full font-bold inline-flex items-center justify-center gap-2 shadow-[1px_5px_0_0_#4338ca] transition-all duration-200 ease-in-out hover:-translate-y-[3px] hover:shadow-[1px_8px_0_0_#4338ca] active:translate-y-[3px] active:shadow-[0_0_0_0_#4338ca]"
                    >
                      <Vote className="w-4 h-4" />
                      Create Poll
                    </button>

                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            {/* Members */}
            <div className = "rounded-2xl shadow-xl p-6"style={{ background: "linear-gradient(135deg, #e9e8ff 0%, #f6f5ff 50%, #dbd2fa 100%)" }}>
              <h2 className="text-xl font-bold text-purple-600 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Members ({Object.keys(members).length})
              </h2>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {Object.entries(members).map(([id, member]) => (
                  <div
                    key={id}
                    className={`p-3 rounded-lg font-medium transition ${id === currentAccount.id
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-800'
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{member.name}</span>
                      {id === currentAccount.id && (
                        <div className="flex items-center gap-1">
                          <Check className="w-4 h-4" />
                          <span className="text-xs">You</span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs opacity-75 mt-1">
                      Joined {new Date(member.joinedAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Movies */}
            <div className="rounded-2xl shadow-xl p-6"
            style={{ background: "linear-gradient(135deg, #e9e8ff 0%, #f6f5ff 50%, #dbd2fa 100%)" }}
            >
              <h2 className="text-xl font-bold text-purple-600 mb-4 flex items-center gap-2">
                <Music className="w-5 h-5" />
                🎬 Movies
              </h2>
              <div className="space-y-3">
                {movies.map((m, idx) => (
                  <div key={idx} className="bg-blue-50 p-3 rounded-lg border-2 border-blue-200 hover:shadow-md transition">
                    <p className="font-bold text-sm text-gray-800">{m.title}</p>
                    <p className="text-xs text-gray-600">{m.genre}</p>
                    <p className="text-lg font-bold text-purple-600 mt-1 flex items-center gap-1">
                      <Star className="w-4 h-4" /> {m.rating}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => setSelectedGroup(null)}
                className="w-full px-6 py-3 bg-[#6b4eff] text-white font-bold rounded-full shadow-[1px_5px_0_0_#4e36b8] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[1px_8px_0_0_#4e36b8] active:translate-y-[3px] active:shadow-[0_0_0_0_#4e36b8]"
              >
                <Plus className="w-4 h-4 inline mr-2" />
                Create Group
              </button>
              <button
                onClick={() => setSelectedGroup(null)}
                className="w-full px-6 py-3 bg-[#6b4eff] text-white font-bold rounded-full shadow-[1px_5px_0_0_#4e36b8] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[1px_8px_0_0_#4e36b8] active:translate-y-[3px] active:shadow-[0_0_0_0_#4e36b8]"
              >
                <LogIn className="w-4 h-4 inline mr-2" />
                Join Group
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Groups;