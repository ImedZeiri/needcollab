import type { Need, Offer, Collaboration, Message, Notification, NeedCategory } from '@/types';

export const mockNeeds: Need[] = [
  { id: '1', creator_id: '1', title: 'Achat groupé vélos électriques', description: 'Besoin de 5 vélos électriques pour notre quartier.', category: 'autres', status: 'published', image_url: null, target_date: null, budget_min: 800, budget_max: 1200, min_participants: 3, max_participants: 10, quantity_per_person: 1, specifications: {}, share_token: null, created_at: '2026-03-15T10:00:00Z', updated_at: '2026-03-15T10:00:00Z' },
  { id: '2', creator_id: '4', title: 'Commande groupée matériaux bricolage', description: 'Achat en gros de planches et visserie.', category: 'bricolage', status: 'published', image_url: null, target_date: null, budget_min: 200, budget_max: 500, min_participants: 2, max_participants: 8, quantity_per_person: 1, specifications: {}, share_token: null, created_at: '2026-03-14T08:00:00Z', updated_at: '2026-03-14T08:00:00Z' },
  { id: '3', creator_id: '5', title: 'Achat groupé meubles salon', description: 'Canapés et tables basses en commande groupée.', category: 'meubles', status: 'in_progress', image_url: null, target_date: null, budget_min: 300, budget_max: 800, min_participants: 4, max_participants: null, quantity_per_person: 1, specifications: {}, share_token: null, created_at: '2026-03-12T14:00:00Z', updated_at: '2026-03-16T09:00:00Z' },
];

export const mockOffers: Offer[] = [
  { id: 'o1', need_id: '1', vendor_id: '2', status: 'pending', price_total: 4800, price_per_unit: 960, min_buyers: 5, delivery_days: 14, delivery_description: 'Livraison à domicile', conditions: null, message: 'Offre valable 30 jours', valid_until: '2026-04-15', created_at: '2026-03-16T10:00:00Z', updated_at: '2026-03-16T10:00:00Z' },
  { id: 'o2', need_id: '2', vendor_id: '8', status: 'accepted', price_total: 1200, price_per_unit: 150, min_buyers: 2, delivery_days: 7, delivery_description: 'Retrait en magasin ou livraison', conditions: null, message: null, valid_until: null, created_at: '2026-03-16T14:00:00Z', updated_at: '2026-03-16T14:00:00Z' },
];

export const mockCollaborations: Collaboration[] = [
  { id: 'c1', need_id: '2', user_id: '4', position: 1, quantity: 1, cost_percentage: 50, wants_contact: true, location_lat: null, location_lng: null, location_city: 'Lyon', location_country: 'France', joined_at: '2026-03-16T10:00:00Z' },
  { id: 'c2', need_id: '3', user_id: '5', position: 1, quantity: 1, cost_percentage: 33, wants_contact: true, location_lat: null, location_lng: null, location_city: 'Bordeaux', location_country: 'France', joined_at: '2026-03-14T10:00:00Z' },
];

export const mockMessages: Message[] = [
  { id: 'm1', need_id: '2', sender_id: '4', offer_id: null, content: 'Bonjour, quand pouvez-vous commencer ?', is_vendor_channel: false, created_at: '2026-03-16T10:30:00Z' },
  { id: 'm2', need_id: '2', sender_id: '2', offer_id: null, content: 'Bonjour ! Je peux démarrer dès lundi prochain.', is_vendor_channel: false, created_at: '2026-03-16T11:00:00Z' },
];

export const mockNotifications: Notification[] = [
  { id: 'n1', user_id: '1', need_id: '1', offer_id: null, type: 'new_offer', title: 'Nouvelle offre', message: 'Vous avez reçu une nouvelle offre pour "Achat groupé vélos électriques"', read: false, created_at: '2026-03-18T09:00:00Z' },
  { id: 'n2', user_id: '1', need_id: '2', offer_id: null, type: 'new_collaborator', title: 'Nouveau collaborateur', message: 'Quelqu\'un a rejoint votre need', read: true, created_at: '2026-03-17T14:00:00Z' },
];

export const CATEGORIES: NeedCategory[] = ['vetements', 'bricolage', 'electronique', 'meubles', 'materiaux', 'sport', 'jardin', 'cuisine', 'decoration', 'jouets', 'livres', 'autres'];
