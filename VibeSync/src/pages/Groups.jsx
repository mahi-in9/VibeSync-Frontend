import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Users, Plus, LogOut, Search, Copy, X, Check, Share2, Sparkles, Send, MessageCircle, ArrowLeft } from "lucide-react";

const Groups = () => {
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [groups, setGroups] = useState([]);
  const [myGroups, setMyGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [copiedLink, setCopiedLink] = useState(false);
  const [message, setMessage] = useState("");

  // Create Group Form
  const [newGroup, setNewGroup] = useState({
    name: "",
    category: "general",
    description: "",
    mood: "chill"
  });

  const [joinCode, setJoinCode] = useState("");

  const categories = [
    { id: "all", name: "All", icon: "🌐", color: "#667eea" },
    { id: "movies", name: "Movies", icon: "🎬", color: "#ff6b6b" },
    { id: "food", name: "Food", icon: "🍕", color: "#ffa500" },
    { id: "travel", name: "Travel", icon: "✈️", color: "#4ecdc4" },
    { id: "sports", name: "Sports", icon: "⚽", color: "#95e1d3" },
    { id: "gaming", name: "Gaming", icon: "🎮", color: "#c44569" },
    { id: "general", name: "General", icon: "💬", color: "#667eea" }
  ];

  const moods = [
    { id: "chill", name: "Chill", icon: "😌", color: "#a8dadc" },
    { id: "adventurous", name: "Adventurous", icon: "🚀", color: "#f4a261" },
    { id: "foodie", name: "Foodie", icon: "🍔", color: "#e76f51" },
    { id: "party", name: "Party", icon: "🎉", color: "#e63946" }
  ];

  useEffect(() => {
    const storedUser = localStorage.getItem("userName");
    const storedGroups = localStorage.getItem("groups");
    
    if (storedUser) {
      setUserName(storedUser);
      setIsLoggedIn(true);
    }
    
    if (storedGroups) {
      const parsedGroups = JSON.parse(storedGroups);
      setGroups(parsedGroups);
      updateMyGroups(parsedGroups, storedUser);
    }

    const interval = setInterval(() => {
      const latestGroups = localStorage.getItem("groups");
      if (latestGroups) {
        const parsed = JSON.parse(latestGroups);
        setGroups(parsed);
        updateMyGroups(parsed, localStorage.getItem("userName"));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const updateMyGroups = (allGroups, user) => {
    const userGroups = allGroups.filter(g => g.members?.includes(user || userName));
    setMyGroups(userGroups);
  };

  const saveGroups = (updatedGroups) => {
    localStorage.setItem("groups", JSON.stringify(updatedGroups));
    setGroups(updatedGroups);
    updateMyGroups(updatedGroups, userName);
  };

  const generateGroupCode = () => {
    return `GP${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
  };

  // Create Group
  const handleCreateGroup = () => {
    if (!newGroup.name.trim()) {
      alert("Please enter a group name");
      return;
    }

    const groupCode = generateGroupCode();
    const createdGroup = {
      id: groupCode,
      name: newGroup.name,
      category: newGroup.category,
      description: newGroup.description,
      mood: newGroup.mood,
      members: [userName],
      messages: [],
      createdBy: userName,
      createdAt: new Date().toISOString()
    };

    const updatedGroups = [...groups, createdGroup];
    saveGroups(updatedGroups);
    
    setShowCreateModal(false);
    setNewGroup({ name: "", category: "general", description: "", mood: "chill" });
    
    // Show invite modal after creating
    setSelectedGroup(createdGroup);
    setShowInviteModal(true);
  };

  // Join Group
  const handleJoinGroup = (groupId) => {
    const group = groups.find(g => g.id === groupId);
    
    if (!group) {
      alert("Group not found");
      return;
    }

    if (group.members.includes(userName)) {
      alert("You're already a member of this group!");
      setShowJoinModal(false);
      setJoinCode("");
      return;
    }

    const updatedGroups = groups.map(g => {
      if (g.id === groupId) {
        const updatedMembers = [...g.members, userName];
        // Add system message
        const joinMessage = {
          id: Date.now(),
          sender: "System",
          text: `${userName} joined the group`,
          timestamp: new Date().toISOString(),
          isSystem: true
        };
        return { 
          ...g, 
          members: updatedMembers,
          messages: [...(g.messages || []), joinMessage]
        };
      }
      return g;
    });

    saveGroups(updatedGroups);
    setShowJoinModal(false);
    setJoinCode("");
    
    // Show success message
    alert("Successfully joined the group!");
  };

  // Leave Group
  const handleLeaveGroup = (groupId) => {
    if (!confirm("Are you sure you want to leave this group?")) return;

    const updatedGroups = groups.map(g => {
      if (g.id === groupId) {
        const leaveMessage = {
          id: Date.now(),
          sender: "System",
          text: `${userName} left the group`,
          timestamp: new Date().toISOString(),
          isSystem: true
        };
        return { 
          ...g, 
          members: g.members.filter(m => m !== userName),
          messages: [...(g.messages || []), leaveMessage]
        };
      }
      return g;
    });

    saveGroups(updatedGroups);
  };

  // Join by Code
  const handleJoinByCode = () => {
    const trimmedCode = joinCode.trim();
    
    if (!trimmedCode) {
      alert("Please enter a group code");
      return;
    }

    const group = groups.find(g => g.id === trimmedCode);
    
    if (!group) {
      alert("Invalid group code. Please check and try again.");
      return;
    }

    handleJoinGroup(group.id);
  };

  // Send Message
  const handleSendMessage = () => {
    if (!message.trim() || !selectedGroup) return;

    const newMessage = {
      id: Date.now(),
      sender: userName,
      text: message.trim(),
      timestamp: new Date().toISOString(),
      isSystem: false
    };

    const updatedGroups = groups.map(g => {
      if (g.id === selectedGroup.id) {
        return {
          ...g,
          messages: [...(g.messages || []), newMessage]
        };
      }
      return g;
    });

    saveGroups(updatedGroups);
    setMessage("");
  };

  // Open Chat
  const openChat = (group) => {
    setSelectedGroup(group);
    setShowChatModal(true);
  };

  // Generate invite link
  const generateInviteLink = (groupId) => {
    const baseUrl = window.location.origin + window.location.pathname;
    return `${baseUrl}?invite=${groupId}`;
  };

  // Copy invite link
  const copyInviteLink = (groupId) => {
    const link = generateInviteLink(groupId);
    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Handle login
  const handleLogin = () => {
    if (userName.trim()) {
      localStorage.setItem("userName", userName);
      setIsLoggedIn(true);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("userName");
    setUserName("");
    setIsLoggedIn(false);
    setMyGroups([]);
  };

  // Check for invite link on load
  useEffect(() => {
    if (isLoggedIn) {
      const params = new URLSearchParams(window.location.search);
      const inviteCode = params.get("invite");
      if (inviteCode) {
        const group = groups.find(g => g.id === inviteCode);
        if (group && !group.members.includes(userName)) {
          handleJoinGroup(inviteCode);
          window.history.replaceState({}, '', window.location.pathname);
        }
      }
    }
  }, [isLoggedIn, groups]);

  // Filter groups
  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || group.category === selectedCategory;
    const notMember = !group.members?.includes(userName);
    return matchesSearch && matchesCategory && notMember;
  });

  // Get current group data for chat
  const currentChatGroup = selectedGroup ? groups.find(g => g.id === selectedGroup.id) : null;

  // Login Screen
  if (!isLoggedIn) {
    return (
      <LoginContainer>
        <LoginCard>
          <LoginIcon>🎉</LoginIcon>
          <h1>Welcome to PlanPal</h1>
          <p>Smart Event Planning Made Easy</p>
          <LoginInput
            type="text"
            placeholder="Enter your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleLogin()}
          />
          <LoginButton onClick={handleLogin} disabled={!userName.trim()}>
            Get Started <Sparkles size={20} />
          </LoginButton>
        </LoginCard>
        <FloatingShapes>
          <Shape style={{ top: "10%", left: "10%", animationDelay: "0s" }}>🎬</Shape>
          <Shape style={{ top: "20%", right: "15%", animationDelay: "1s" }}>🍕</Shape>
          <Shape style={{ bottom: "15%", left: "15%", animationDelay: "2s" }}>✈️</Shape>
          <Shape style={{ bottom: "10%", right: "10%", animationDelay: "1.5s" }}>🎮</Shape>
        </FloatingShapes>
      </LoginContainer>
    );
  }

  return (
    <Container>
      <TopBar>
        <Logo>
          <span>🎉</span> PlanPal
        </Logo>
        <UserInfo>
          <UserAvatar>{userName.charAt(0).toUpperCase()}</UserAvatar>
          <UserName>{userName}</UserName>
          <LogoutBtn onClick={handleLogout}>
            <LogOut size={16} />
          </LogoutBtn>
        </UserInfo>
      </TopBar>

      <Hero>
        <HeroContent>
          <HeroTitle>
            Plan Together, <br />
            <Gradient>Celebrate Together</Gradient>
          </HeroTitle>
          <HeroSubtitle>
            Create groups, plan events, and make memories with friends
          </HeroSubtitle>
          <HeroActions>
            <HeroButton onClick={() => setShowCreateModal(true)}>
              <Plus size={20} />
              Create Group
            </HeroButton>
            <HeroButtonSecondary onClick={() => setShowJoinModal(true)}>
              <Users size={20} />
              Join Group
            </HeroButtonSecondary>
          </HeroActions>
        </HeroContent>
      </Hero>

      <Section>
        <SectionHeader>
          <SectionTitle>
            <Sparkles size={24} />
            My Groups ({myGroups.length})
          </SectionTitle>
        </SectionHeader>
        
        {myGroups.length === 0 ? (
          <EmptyState>
            <EmptyIcon>📭</EmptyIcon>
            <EmptyTitle>No groups yet</EmptyTitle>
            <EmptyText>Create or join a group to start planning amazing events!</EmptyText>
          </EmptyState>
        ) : (
          <GroupsGrid>
            {myGroups.map(group => (
              <GroupCard key={group.id} category={group.category}>
                <CardTop>
                  <CategoryIcon>
                    {categories.find(c => c.id === group.category)?.icon || "💬"}
                  </CategoryIcon>
                  <CardActions>
                    <IconButton 
                      onClick={() => openChat(group)}
                      title="Open chat"
                    >
                      <MessageCircle size={16} />
                    </IconButton>
                    <IconButton 
                      onClick={() => {
                        setSelectedGroup(group);
                        setShowInviteModal(true);
                      }}
                      title="Share invite"
                    >
                      <Share2 size={16} />
                    </IconButton>
                    <IconButton 
                      onClick={() => handleLeaveGroup(group.id)}
                      danger
                      title="Leave group"
                    >
                      <LogOut size={16} />
                    </IconButton>
                  </CardActions>
                </CardTop>
                
                <GroupName>{group.name}</GroupName>
                <GroupDescription>{group.description || "No description"}</GroupDescription>
                
                <GroupMeta>
                  <MetaBadge>
                    {moods.find(m => m.id === group.mood)?.icon || "😌"} {moods.find(m => m.id === group.mood)?.name || "Chill"}
                  </MetaBadge>
                </GroupMeta>

                <MembersList>
                  <MembersLabel>Members:</MembersLabel>
                  <MembersAvatars>
                    {group.members?.slice(0, 5).map((member, idx) => (
                      <MemberAvatar key={idx} title={member}>
                        {member.charAt(0).toUpperCase()}
                      </MemberAvatar>
                    ))}
                    {group.members?.length > 5 && (
                      <MemberMore>+{group.members.length - 5}</MemberMore>
                    )}
                  </MembersAvatars>
                </MembersList>
                
                <GroupFooter>
                  <MemberInfo>
                    <Users size={16} />
                    <span>{group.members?.length || 0} members</span>
                  </MemberInfo>
                  <GroupCode>#{group.id.slice(-6)}</GroupCode>
                </GroupFooter>
              </GroupCard>
            ))}
          </GroupsGrid>
        )}
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>
            <Search size={24} />
            Discover Groups
          </SectionTitle>
        </SectionHeader>

        <SearchBar>
          <Search size={20} />
          <SearchInput
            type="text"
            placeholder="Search for groups..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBar>

        <CategoryFilter>
          {categories.map(cat => (
            <CategoryChip
              key={cat.id}
              active={selectedCategory === cat.id}
              color={cat.color}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <span>{cat.icon}</span>
              {cat.name}
            </CategoryChip>
          ))}
        </CategoryFilter>

        {filteredGroups.length === 0 ? (
          <EmptyState>
            <EmptyIcon>🔍</EmptyIcon>
            <EmptyTitle>No groups found</EmptyTitle>
            <EmptyText>Try adjusting your search or create a new group!</EmptyText>
          </EmptyState>
        ) : (
          <GroupsGrid>
            {filteredGroups.map(group => (
              <GroupCard key={group.id} category={group.category}>
                <CardTop>
                  <CategoryIcon>
                    {categories.find(c => c.id === group.category)?.icon || "💬"}
                  </CategoryIcon>
                </CardTop>
                
                <GroupName>{group.name}</GroupName>
                <GroupDescription>{group.description || "No description"}</GroupDescription>
                
                <GroupMeta>
                  <MetaBadge>
                    {moods.find(m => m.id === group.mood)?.icon || "😌"} {moods.find(m => m.id === group.mood)?.name || "Chill"}
                  </MetaBadge>
                </GroupMeta>

                <MembersList>
                  <MembersLabel>Members:</MembersLabel>
                  <MembersAvatars>
                    {group.members?.slice(0, 5).map((member, idx) => (
                      <MemberAvatar key={idx} title={member}>
                        {member.charAt(0).toUpperCase()}
                      </MemberAvatar>
                    ))}
                    {group.members?.length > 5 && (
                      <MemberMore>+{group.members.length - 5}</MemberMore>
                    )}
                  </MembersAvatars>
                </MembersList>
                
                <GroupFooter>
                  <MemberInfo>
                    <Users size={16} />
                    <span>{group.members?.length || 0} members</span>
                  </MemberInfo>
                  <JoinButton onClick={() => handleJoinGroup(group.id)}>
                    Join Now
                  </JoinButton>
                </GroupFooter>
              </GroupCard>
            ))}
          </GroupsGrid>
        )}
      </Section>

      {/* Create Group Modal */}
      {showCreateModal && (
        <Modal onClick={() => setShowCreateModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Create New Group</ModalTitle>
              <CloseButton onClick={() => setShowCreateModal(false)}>
                <X size={24} />
              </CloseButton>
            </ModalHeader>
            
            <ModalBody>
              <FormGroup>
                <Label>Group Name *</Label>
                <Input
                  type="text"
                  placeholder="e.g., Friday Movie Night"
                  value={newGroup.name}
                  onChange={(e) => setNewGroup({...newGroup, name: e.target.value})}
                />
              </FormGroup>

              <FormGroup>
                <Label>Category *</Label>
                <Select
                  value={newGroup.category}
                  onChange={(e) => setNewGroup({...newGroup, category: e.target.value})}
                >
                  {categories.filter(c => c.id !== "all").map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name}
                    </option>
                  ))}
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>Mood</Label>
                <MoodSelector>
                  {moods.map(mood => (
                    <MoodOption
                      key={mood.id}
                      active={newGroup.mood === mood.id}
                      color={mood.color}
                      onClick={() => setNewGroup({...newGroup, mood: mood.id})}
                    >
                      <span>{mood.icon}</span>
                      {mood.name}
                    </MoodOption>
                  ))}
                </MoodSelector>
              </FormGroup>

              <FormGroup>
                <Label>Description</Label>
                <Textarea
                  placeholder="What's this group about?"
                  value={newGroup.description}
                  onChange={(e) => setNewGroup({...newGroup, description: e.target.value})}
                  rows={3}
                />
              </FormGroup>

              <ModalActions>
                <Button secondary onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateGroup}>
                  <Plus size={18} />
                  Create Group
                </Button>
              </ModalActions>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}

      {/* Join Group Modal */}
      {showJoinModal && (
        <Modal onClick={() => setShowJoinModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Join a Group</ModalTitle>
              <CloseButton onClick={() => setShowJoinModal(false)}>
                <X size={24} />
              </CloseButton>
            </ModalHeader>
            
            <ModalBody>
              <FormGroup>
                <Label>Enter Group Code</Label>
                <Input
                  type="text"
                  placeholder="Paste group code here"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value)}
                />
              </FormGroup>

              <ModalActions>
                <Button secondary onClick={() => setShowJoinModal(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleJoinByCode}
                  disabled={!joinCode.trim()}
                >
                  <Users size={18} />
                  Join Group
                </Button>
              </ModalActions>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}

      {/* Invite Modal */}
      {showInviteModal && selectedGroup && (
        <Modal onClick={() => setShowInviteModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Invite to {selectedGroup.name}</ModalTitle>
              <CloseButton onClick={() => setShowInviteModal(false)}>
                <X size={24} />
              </CloseButton>
            </ModalHeader>
            
            <ModalBody>
              <InviteSection>
                <InviteLabel>📋 Group Code (Copy and share this)</InviteLabel>
                <InviteCode>
                  <CodeText>{selectedGroup.id}</CodeText>
                  <CopyButton onClick={() => {
                    navigator.clipboard.writeText(selectedGroup.id);
                    setCopiedLink(true);
                    setTimeout(() => setCopiedLink(false), 2000);
                  }}>
                    {copiedLink ? <><Check size={18} /> Copied!</> : <><Copy size={18} /> Copy</>}
                  </CopyButton>
                </InviteCode>
                <InviteHint>Share this code with friends. They can use it to join the group!</InviteHint>
              </InviteSection>

              <Divider>or</Divider>

              <InviteSection>
                <InviteLabel>Share Link</InviteLabel>
                <InviteLink>
                  <LinkText>{generateInviteLink(selectedGroup.id)}</LinkText>
                  <CopyButton onClick={() => copyInviteLink(selectedGroup.id)}>
                    {copiedLink ? <Check size={18} /> : <Share2 size={18} />}
                  </CopyButton>
                </InviteLink>
              </InviteSection>

              <InviteInfo>
                Share this code or link with friends to invite them to the group!
              </InviteInfo>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}

      {/* Chat Modal */}
      {showChatModal && currentChatGroup && (
        <Modal onClick={() => setShowChatModal(false)}>
          <ChatModalContent onClick={(e) => e.stopPropagation()}>
            <ChatHeader>
              <BackButton onClick={() => setShowChatModal(false)}>
                <ArrowLeft size={24} />
              </BackButton>
              <ChatHeaderInfo>
                <ChatGroupName>{currentChatGroup.name}</ChatGroupName>
                <ChatMemberCount>{currentChatGroup.members?.length} members</ChatMemberCount>
              </ChatHeaderInfo>
              <CloseButton onClick={() => setShowChatModal(false)}>
                <X size={24} />
              </CloseButton>
            </ChatHeader>

            <ChatMessages>
              {(!currentChatGroup.messages || currentChatGroup.messages.length === 0) ? (
                <EmptyChatState>
                  <MessageCircle size={48} />
                  <p>No messages yet</p>
                  <small>Start the conversation!</small>
                </EmptyChatState>
              ) : (
                currentChatGroup.messages.map((msg) => (
                  <MessageBubble key={msg.id} isOwn={msg.sender === userName} isSystem={msg.isSystem}>
                    {!msg.isSystem && (
                      <MessageSender isOwn={msg.sender === userName}>
                        {msg.sender}
                      </MessageSender>
                    )}
                    <MessageText isSystem={msg.isSystem}>{msg.text}</MessageText>
                    <MessageTime>
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </MessageTime>
                  </MessageBubble>
                ))
              )}
            </ChatMessages>

            <ChatInput>
              <ChatInputField
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <SendButton onClick={handleSendMessage} disabled={!message.trim()}>
                <Send size={20} />
              </SendButton>
            </ChatInput>
          </ChatModalContent>
        </Modal>
      )}
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
`;

const LoginContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  overflow: hidden;
`;

const FloatingShapes = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
`;

const Shape = styled.div`
  position: absolute;
  font-size: 3rem;
  animation: float 6s ease-in-out infinite;
  opacity: 0.3;

  @keyframes float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-30px) rotate(10deg); }
  }
`;

const LoginCard = styled.div`
  background: white;
  padding: 60px 40px;
  border-radius: 32px;
  box-shadow: 0 30px 90px rgba(0,0,0,0.3);
  text-align: center;
  max-width: 440px;
  width: 100%;
  animation: slideUp 0.6s ease-out;
  z-index: 1;

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 12px;
    color: #1a1a1a;
    font-weight: 800;
  }

  p {
    color: #666;
    margin-bottom: 40px;
    font-size: 1.1rem;
  }
`;

const LoginIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 24px;
  animation: bounce 2s ease-in-out infinite;

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
`;

const LoginInput = styled.input`
  width: 100%;
  padding: 18px 24px;
  border: 3px solid #f0f0f0;
  border-radius: 16px;
  font-size: 1.1rem;
  margin-bottom: 20px;
  transition: all 0.3s;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
  }
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 18px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 16px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TopBar = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);

  @media (max-width: 768px) {
    padding: 16px 20px;
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  color: white;
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    font-size: 2rem;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const UserAvatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: white;
  color: #667eea;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 700;
`;

const UserName = styled.span`
  color: white;
  font-weight: 600;
  font-size: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const LogoutBtn = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  padding: 10px;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const Hero = styled.div`
  padding: 80px 40px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  color: white;
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Gradient = styled.span`
  background: linear-gradient(90deg, #ffd89b 0%, #19547b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 40px;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const HeroActions = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
`;

const HeroButton = styled.button`
  padding: 18px 36px;
  background: white;
  color: #667eea;
  border: none;
  border-radius: 16px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s;
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0,0,0,0.3);
  }
`;

const HeroButtonSecondary = styled(HeroButton)`
  background: rgba(255, 255, 255, 0.15);
  color: white;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
`;

const Section = styled.section`
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const SectionHeader = styled.div`
  margin-bottom: 32px;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: white;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 24px;
  background: white;
  border-radius: 16px;
  margin-bottom: 24px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);

  svg {
    color: #999;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: none;
  font-size: 1.1rem;
  outline: none;
  font-family: inherit;
`;

const CategoryFilter = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 32px;
  flex-wrap: wrap;
`;

const CategoryChip = styled.button`
  padding: 12px 24px;
  border-radius: 24px;
  border: 2px solid ${props => props.active ? props.color : 'rgba(255, 255, 255, 0.3)'};
  background: ${props => props.active ? props.color : 'rgba(255, 255, 255, 0.1)'};
  color: white;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
  backdrop-filter: blur(10px);
  font-size: 0.95rem;

  span {
    font-size: 1.2rem;
  }

  &:hover {
    transform: translateY(-2px);
    border-color: ${props => props.color};
  }
`;

const GroupsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
`;

const GroupCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 24px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  border: 3px solid transparent;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(0,0,0,0.2);
    border-color: ${props => {
      const colors = {
        movies: '#ff6b6b',
        food: '#ffa500',
        travel: '#4ecdc4',
        sports: '#95e1d3',
        gaming: '#c44569',
        general: '#667eea'
      };
      return colors[props.category] || '#667eea';
    }};
  }
`;

const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const CategoryIcon = styled.div`
  font-size: 2.5rem;
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
`;

const CardActions = styled.div`
  display: flex;
  gap: 8px;
`;

const IconButton = styled.button`
  padding: 10px;
  background: ${props => props.danger ? '#ff4444' : '#f0f0f0'};
  color: ${props => props.danger ? 'white' : '#666'};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.1);
    background: ${props => props.danger ? '#cc0000' : '#e0e0e0'};
  }
`;

const GroupName = styled.h3`
  font-size: 1.5rem;
  color: #1a1a1a;
  margin-bottom: 8px;
  font-weight: 800;
`;

const GroupDescription = styled.p`
  color: #666;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const GroupMeta = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

const MetaBadge = styled.div`
  padding: 6px 14px;
  background: #f0f0f0;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #666;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const MembersList = styled.div`
  margin-bottom: 16px;
  padding: 12px;
  background: #f9f9f9;
  border-radius: 12px;
`;

const MembersLabel = styled.div`
  font-size: 0.85rem;
  font-weight: 600;
  color: #999;
  margin-bottom: 8px;
`;

const MembersAvatars = styled.div`
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
`;

const MemberAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 700;
  border: 2px solid white;
`;

const MemberMore = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #e0e0e0;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  border: 2px solid white;
`;

const GroupFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 2px solid #f0f0f0;
`;

const MemberInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  font-size: 0.95rem;
  font-weight: 600;

  svg {
    color: #667eea;
  }
`;

const GroupCode = styled.div`
  font-size: 0.85rem;
  color: #999;
  font-weight: 700;
  font-family: monospace;
`;

const JoinButton = styled.button`
  padding: 10px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 0.95rem;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 16px rgba(102, 126, 234, 0.4);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;
`;

const EmptyIcon = styled.div`
  font-size: 5rem;
  margin-bottom: 20px;
  opacity: 0.5;
`;

const EmptyTitle = styled.h3`
  font-size: 1.5rem;
  color: white;
  margin-bottom: 8px;
  font-weight: 700;
`;

const EmptyText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 24px;
  max-width: 560px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 30px 90px rgba(0,0,0,0.3);
  animation: slideUp 0.3s ease;

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(30px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
`;

const ChatModalContent = styled(ModalContent)`
  max-width: 700px;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 28px 32px;
  border-bottom: 2px solid #f0f0f0;
`;

const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
  border-bottom: 2px solid #f0f0f0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 24px 24px 0 0;
`;

const BackButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  color: white;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const ChatHeaderInfo = styled.div`
  flex: 1;
`;

const ChatGroupName = styled.h2`
  font-size: 1.3rem;
  font-weight: 800;
  margin-bottom: 4px;
`;

const ChatMemberCount = styled.div`
  font-size: 0.9rem;
  opacity: 0.9;
`;

const ModalTitle = styled.h2`
  font-size: 1.8rem;
  color: #1a1a1a;
  font-weight: 800;
`;

const CloseButton = styled.button`
  background: ${props => props.white ? 'rgba(255, 255, 255, 0.2)' : '#f0f0f0'};
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  color: ${props => props.white ? 'white' : '#666'};

  &:hover {
    background: ${props => props.white ? 'rgba(255, 255, 255, 0.3)' : '#e0e0e0'};
    transform: rotate(90deg);
  }
`;

const ModalBody = styled.div`
  padding: 32px;
`;

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  background: #f9f9f9;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const EmptyChatState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #999;

  svg {
    margin-bottom: 16px;
    opacity: 0.5;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 4px;
  }

  small {
    font-size: 0.9rem;
  }
`;

const MessageBubble = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.isSystem ? 'center' : props.isOwn ? 'flex-end' : 'flex-start'};
  max-width: ${props => props.isSystem ? '100%' : '70%'};
  align-self: ${props => props.isSystem ? 'center' : props.isOwn ? 'flex-end' : 'flex-start'};
`;

const MessageSender = styled.div`
  font-size: 0.75rem;
  font-weight: 700;
  color: #666;
  margin-bottom: 4px;
  padding: 0 12px;
`;

const MessageText = styled.div`
  padding: ${props => props.isSystem ? '8px 16px' : '12px 16px'};
  background: ${props => props.isSystem ? '#e0e0e0' : props.isOwn ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white'};
  color: ${props => props.isSystem || props.isOwn ? 'white' : '#1a1a1a'};
  border-radius: ${props => props.isSystem ? '20px' : '16px'};
  font-size: ${props => props.isSystem ? '0.85rem' : '0.95rem'};
  word-wrap: break-word;
  box-shadow: ${props => props.isSystem ? 'none' : '0 2px 8px rgba(0,0,0,0.1)'};
  font-style: ${props => props.isSystem ? 'italic' : 'normal'};
`;

const MessageTime = styled.div`
  font-size: 0.7rem;
  color: #999;
  margin-top: 4px;
  padding: 0 12px;
`;

const ChatInput = styled.div`
  display: flex;
  gap: 12px;
  padding: 20px 24px;
  border-top: 2px solid #f0f0f0;
  background: white;
  border-radius: 0 0 24px 24px;
`;

const ChatInputField = styled.input`
  flex: 1;
  padding: 14px 18px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
  }
`;

const SendButton = styled.button`
  padding: 14px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    transform: scale(1.05);
    box-shadow: 0 4px 16px rgba(102, 126, 234, 0.4);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-weight: 700;
  color: #333;
  font-size: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 18px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 14px 18px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 14px 18px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
  }
`;

const MoodSelector = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
`;

const MoodOption = styled.button`
  padding: 14px;
  border: 3px solid ${props => props.active ? props.color : '#e0e0e0'};
  background: ${props => props.active ? props.color : 'white'};
  color: ${props => props.active ? 'white' : '#666'};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 0.95rem;

  span {
    font-size: 1.5rem;
  }

  &:hover {
    transform: translateY(-2px);
    border-color: ${props => props.color};
  }
`;

const ModalActions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 32px;
`;

const Button = styled.button`
  flex: 1;
  padding: 16px 24px;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  ${props => props.secondary ? `
    background: #f0f0f0;
    color: #666;

    &:hover {
      background: #e0e0e0;
    }
  ` : `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;

    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `}
`;

const InviteSection = styled.div`
  margin-bottom: 24px;
`;

const InviteLabel = styled.div`
  font-weight: 700;
  color: #333;
  margin-bottom: 12px;
  font-size: 1rem;
`;

const InviteCode = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #f8f9ff;
  border: 2px solid #e0e7ff;
  border-radius: 12px;
`;

const CodeText = styled.div`
  flex: 1;
  font-family: monospace;
  font-size: 1.1rem;
  font-weight: 700;
  color: #667eea;
`;

const CopyButton = styled.button`
  padding: 10px 16px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s;

  &:hover {
    background: #5568d3;
    transform: scale(1.05);
  }
`;

const Divider = styled.div`
  text-align: center;
  color: #999;
  font-weight: 600;
  margin: 24px 0;
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 40%;
    height: 2px;
    background: #e0e0e0;
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
`;

const InviteLink = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #f0fdf4;
  border: 2px solid #bbf7d0;
  border-radius: 12px;
`;

const LinkText = styled.div`
  flex: 1;
  font-size: 0.9rem;
  color: #15803d;
  word-break: break-all;
  font-weight: 600;
`;

const InviteInfo = styled.div`
  margin-top: 20px;
  padding: 16px;
  background: #f0f0f0;
  border-radius: 12px;
  color: #666;
  font-size: 0.95rem;
  text-align: center;
  line-height: 1.5;
`;

export default Groups;