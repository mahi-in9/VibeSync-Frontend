
export const api = "https://vibesync-backend-2.onrender.com/api";

/* -------------------------- AUTH ROUTES -------------------------- */
export const loginApi = `${api}/auth/login`;
export const registerApi = `${api}/auth/register`;
export const forgotPasswordApi = `${api}/auth/forgot-password`;
export const resetPasswordApi = `${api}/auth/reset-password`;
export const verifyResetTokenApi = (token) => `${api}/auth/reset-password/${token}`;

/* -------------------------- USER ROUTES -------------------------- */
export const getProfileApi = `${api}/me`;
export const updateProfileApi = `${api}/user/update`;
export const deleteProfileApi = `${api}/user/delete`;
export const getAllProfilesApi = `${api}/user/all`;

/* -------------------------- GROUP ROUTES -------------------------- */
// Public routes
export const getAllGroupsApi = `${api}/groups`;
export const getGroupByIdApi = (groupId) => `${api}/groups/${groupId}`;

// Authenticated routes
export const createGroupApi = `${api}/groups`;
export const joinGroupApi = (groupId) => `${api}/groups/${groupId}/join`;
export const leaveGroupApi = (groupId) => `${api}/groups/${groupId}/leave`;
export const deleteGroupApi = (groupId) => `${api}/groups/${groupId}`;
export const requestToJoinGroupApi = (groupId) => `${api}/groups/${groupId}/request-to-join`;

// Member management
export const promoteMemberApi = (groupId, memberId) =>
  `${api}/groups/${groupId}/promote/${memberId}`;
export const demoteMemberApi = (groupId, memberId) =>
  `${api}/groups/${groupId}/demote/${memberId}`;
export const transferOwnershipApi = (groupId, newOwnerId) =>
  `${api}/groups/${groupId}/transfer-ownership/${newOwnerId}`;

/* -------------------------- EVENT ROUTES -------------------------- */
// Public routes
export const getAllEventsApi = `${api}/events`;
export const getPublicEventsApi = `${api}/events/public`;
export const getNearbyEventsApi = `${api}/events/nearby`;
export const getGroupEventsApi = (groupId) => `${api}/events/group/${groupId}`;
export const getEventByIdApi = (eventId) => `${api}/events/${eventId}`;

// Authenticated routes
export const createEventApi = `${api}/events`;
export const updateEventApi = (eventId) => `${api}/events/${eventId}`;
export const deleteEventApi = (eventId) => `${api}/events/${eventId}`;
export const addOrUpdateRSVPApi = (eventId) => `${api}/events/${eventId}/rsvp`;
export const removeRSVPApi = (eventId) => `${api}/events/${eventId}/rsvp`;
export const cancelEventApi = (eventId) => `${api}/events/${eventId}/cancel`;

/* -------------------------- POLL ROUTES -------------------------- */
export const getAllPollsApi = `${api}/polls`;
export const getPollApi = (pollId) => `${api}/polls/${pollId}`;
export const createPollApi = `${api}/polls`;
export const updatePollApi = (pollId) => `${api}/polls/${pollId}`;
export const deletePollApi = (pollId) => `${api}/polls/${pollId}`;
export const votePollApi = (pollId) => `${api}/polls/${pollId}/vote`;
export const removeVoteApi = (pollId) => `${api}/polls/${pollId}/vote`;
export const closePollApi = (pollId) => `${api}/polls/${pollId}/close`;

/* -------------------------- MESSAGE ROUTES -------------------------- */
export const sendMessageApi = `${api}/messages`;
export const getMessagesByGroupApi = (groupId) => `${api}/messages/${groupId}`;
export const deleteMessageApi = (messageId) => `${api}/messages/${messageId}`;

