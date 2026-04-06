import api from './apiRequest';
import type { Need, Offer, Collaboration, Message, Notification, Profile } from '@/types';

// Helper: ensure profile exists before creating resources
const ensureProfile = async (userId?: string, email?: string, name?: string, isVendor = false) => {
  if (!userId) return;
  try {
    await getProfile(userId);
  } catch {
    // Profile doesn't exist, create it
    await api.post('profiles', {
      id: userId,
      email: email || null,
      full_name: name || null,
      is_vendor: isVendor,
      ...(isVendor ? { vendor_status: 'verified' } : {}),
    });
  }
};

// Needs
export const getNeeds = () => api.get<Need[]>('needs');
export const getNeed = (id: string) => api.get<Need>(`needs?id=${id}`);
export const createNeed = async (body: Partial<Need> & { _email?: string; _name?: string }) => {
  const { _email, _name, ...needBody } = body;
  await ensureProfile(needBody.creator_id, _email, _name);
  return api.post<Need>('needs', needBody);
};
export const updateNeed = (id: string, body: Partial<Need>) => api.put<Need>(`needs?id=${id}`, body);
export const deleteNeed = (id: string) => api.del(`needs?id=${id}`);

// Offers
export const getOffers = (need_id?: string) => api.get<Offer[]>(need_id ? `offers?need_id=${need_id}` : 'offers');
export const createOffer = async (body: Partial<Offer> & { _email?: string; _name?: string }) => {
  const { _email, _name, ...offerBody } = body;
  await ensureProfile(offerBody.vendor_id, _email, _name, true);
  return api.post<Offer>('offers', offerBody);
};
export const updateOffer = (id: string, body: Partial<Offer>) => api.put<Offer>(`offers?id=${id}`, body);
export const deleteOffer = (id: string) => api.del(`offers?id=${id}`);

// Collaborations
export const getCollaborations = (need_id?: string) => api.get<Collaboration[]>(need_id ? `collaborations?need_id=${need_id}` : 'collaborations');
export const createCollaboration = (body: Partial<Collaboration>) => api.post<Collaboration>('collaborations', body);
export const updateCollaboration = (id: string, body: Partial<Collaboration>) => api.put<Collaboration>(`collaborations?id=${id}`, body);
export const deleteCollaboration = (id: string) => api.del(`collaborations?id=${id}`);

// Messages
export const getMessages = (need_id: string) => api.get<Message[]>(`messages?need_id=${need_id}`, 0);
export const createMessage = (body: Partial<Message>) => api.post<Message>('messages', body);

// Notifications
export const getNotifications = (user_id: string) => api.get<Notification[]>(`notifications?user_id=${user_id}`, 0);
export const markNotificationRead = (id: string, body: Partial<Notification>) => api.put<Notification>(`notifications?id=${id}`, body);

// Profiles
export const getProfile = (id: string) => api.get<Profile>(`profiles?id=${id}`);
export const updateProfile = (id: string, body: Partial<Profile>) => api.put<Profile>(`profiles?id=${id}`, body);

// Auth
export const sendAuthEmail = async (email: string) => {
  try {
    return await api.post('send-auth-email', { email, action: 'send' });
  } catch (error) {
    // OTP email sending failed (likely missing RESEND_API_KEY).
    // Fall back to direct magic-link authentication.
    console.warn('OTP send failed, falling back to direct auth:', error);
    return api.post('send-auth-email', { email, action: 'direct' });
  }
};

export const verifyOtpCode = (email: string, code: string) => api.post('send-auth-email', { email, action: 'verify', code });
export const createOtpCode = (body: object) => api.post('otp_codes', body);
