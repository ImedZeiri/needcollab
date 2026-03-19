import api from './apiRequest';
import type { Need, Offer, Collaboration, Message, Notification } from '@/types';

// Needs
export const getNeeds = () => api.get<Need[]>('needs');
export const getNeed = (id: string) => api.get<Need>(`needs?id=${id}`);
export const createNeed = (body: Partial<Need>) => api.post<Need>('needs', body);
export const updateNeed = (id: string, body: Partial<Need>) => api.put<Need>(`needs?id=${id}`, body);
export const deleteNeed = (id: string) => api.del(`needs?id=${id}`);

// Offers
export const getOffers = (id?: string) => api.get<Offer[]>(id ? `offers?id=${id}` : 'offers');
export const createOffer = (body: Partial<Offer>) => api.post<Offer>('offers', body);
export const updateOffer = (id: string, body: Partial<Offer>) => api.put<Offer>(`offers?id=${id}`, body);
export const deleteOffer = (id: string) => api.del(`offers?id=${id}`);

// Collaborations
export const getCollaborations = (id?: string) => api.get<Collaboration[]>(id ? `collaborations?id=${id}` : 'collaborations');
export const createCollaboration = (body: Partial<Collaboration>) => api.post<Collaboration>('collaborations', body);
export const updateCollaboration = (id: string, body: Partial<Collaboration>) => api.put<Collaboration>(`collaborations?id=${id}`, body);

// Messages
export const getMessages = (collaborationId: string) => api.get<Message[]>(`messages?id=${collaborationId}`, 0);
export const createMessage = (body: Partial<Message>) => api.post<Message>('messages', body);

// Notifications
export const getNotifications = (userId: string) => api.get<Notification[]>(`notifications?id=${userId}`, 0);
export const markNotificationRead = (id: string, body: Partial<Notification>) => api.put<Notification>(`notifications?id=${id}`, body);

// Profiles
export const getProfile = (id: string) => api.get(`profiles?id=${id}`);
export const updateProfile = (id: string, body: object) => api.put(`profiles?id=${id}`, body);

// Auth
export const sendAuthEmail = (email: string) => api.post('send-auth-email', { email });
export const verifyOtpCode = (id: string) => api.get(`otp_codes?id=${id}`);
export const createOtpCode = (body: object) => api.post('otp_codes', body);
