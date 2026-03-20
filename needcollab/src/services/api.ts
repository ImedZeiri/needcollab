import api from './apiRequest';
import type { Need, Offer, Collaboration, Message, Notification, Profile } from '@/types';

// Needs
export const getNeeds = () => api.get<Need[]>('needs');
export const getNeed = (id: string) => api.get<Need>(`needs?id=${id}`);
export const createNeed = (body: Partial<Need>) => api.post<Need>('needs', body);
export const updateNeed = (id: string, body: Partial<Need>) => api.put<Need>(`needs?id=${id}`, body);
export const deleteNeed = (id: string) => api.del(`needs?id=${id}`);

// Offers
export const getOffers = (need_id?: string) => api.get<Offer[]>(need_id ? `offers?need_id=${need_id}` : 'offers');
export const createOffer = (body: Partial<Offer>) => api.post<Offer>('offers', body);
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
export const sendAuthEmail = (email: string) => api.post('send-auth-email', { email, action: 'send' });
export const verifyOtpCode = (email: string, code: string) => api.post('send-auth-email', { email, action: 'verify', code });
export const createOtpCode = (body: object) => api.post('otp_codes', body);
