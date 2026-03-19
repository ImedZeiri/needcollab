import type { Need, Offer, Collaboration, Message, Notification } from '@/types';

export const mockNeeds: Need[] = [
  { id: '1', title: 'Développement site e-commerce', description: 'Besoin d\'un site e-commerce complet avec paiement en ligne, gestion de stock et tableau de bord.', category: 'Développement Web', budget: 5000, currency: 'EUR', location: 'Paris, France', status: 'open', createdAt: '2026-03-15T10:00:00Z', updatedAt: '2026-03-15T10:00:00Z', authorId: '1', authorName: 'Jean Client', offersCount: 3, votesCount: 12 },
  { id: '2', title: 'Application mobile fitness', description: 'Application mobile cross-platform pour suivi d\'entraînements avec notifications push.', category: 'Mobile', budget: 8000, currency: 'EUR', location: 'Lyon, France', status: 'open', createdAt: '2026-03-14T08:00:00Z', updatedAt: '2026-03-14T08:00:00Z', authorId: '4', authorName: 'Sophie Martin', offersCount: 5, votesCount: 24 },
  { id: '3', title: 'Refonte identité visuelle', description: 'Refonte complète de l\'identité visuelle : logo, charte graphique, templates.', category: 'Design', budget: 3000, currency: 'EUR', location: 'Bordeaux, France', status: 'in_progress', createdAt: '2026-03-12T14:00:00Z', updatedAt: '2026-03-16T09:00:00Z', authorId: '5', authorName: 'Pierre Dupont', offersCount: 7, votesCount: 18 },
  { id: '4', title: 'Campagne marketing digital', description: 'Stratégie et exécution d\'une campagne marketing sur les réseaux sociaux pendant 3 mois.', category: 'Marketing', budget: 4500, currency: 'EUR', location: 'Marseille, France', status: 'open', createdAt: '2026-03-10T11:00:00Z', updatedAt: '2026-03-10T11:00:00Z', authorId: '6', authorName: 'Claire Moreau', offersCount: 2, votesCount: 8 },
  { id: '5', title: 'Rédaction contenu SEO', description: 'Rédaction de 50 articles optimisés SEO pour un blog tech.', category: 'Rédaction', budget: 2500, currency: 'EUR', location: 'Remote', status: 'closed', createdAt: '2026-03-05T16:00:00Z', updatedAt: '2026-03-18T12:00:00Z', authorId: '1', authorName: 'Jean Client', offersCount: 10, votesCount: 32 },
  { id: '6', title: 'API REST microservices', description: 'Architecture et développement d\'une API REST en microservices avec Node.js.', category: 'Développement Web', budget: 12000, currency: 'EUR', location: 'Paris, France', status: 'open', createdAt: '2026-03-17T09:30:00Z', updatedAt: '2026-03-17T09:30:00Z', authorId: '7', authorName: 'Lucas Bernard', offersCount: 1, votesCount: 6 },
];

export const mockOffers: Offer[] = [
  { id: 'o1', needId: '1', vendorId: '2', vendorName: 'Marie Vendor', title: 'Solution e-commerce sur mesure', description: 'Développement complet avec React + Node.js, intégration Stripe.', price: 4800, currency: 'EUR', deliveryTime: '6 semaines', status: 'pending', createdAt: '2026-03-16T10:00:00Z' },
  { id: 'o2', needId: '1', vendorId: '8', vendorName: 'TechPro SARL', title: 'E-commerce Shopify personnalisé', description: 'Solution rapide basée sur Shopify avec personnalisations avancées.', price: 3500, currency: 'EUR', deliveryTime: '3 semaines', status: 'pending', createdAt: '2026-03-16T14:00:00Z' },
  { id: 'o3', needId: '2', vendorId: '2', vendorName: 'Marie Vendor', title: 'App fitness React Native', description: 'Application cross-platform avec suivi GPS et notifications.', price: 7500, currency: 'EUR', deliveryTime: '8 semaines', status: 'accepted', createdAt: '2026-03-15T11:00:00Z' },
  { id: 'o4', needId: '3', vendorId: '9', vendorName: 'Studio Créatif', title: 'Branding complet premium', description: 'Logo, charte graphique, templates print et digital.', price: 2800, currency: 'EUR', deliveryTime: '4 semaines', status: 'accepted', createdAt: '2026-03-13T09:00:00Z' },
];

export const mockCollaborations: Collaboration[] = [
  { id: 'c1', needId: '2', needTitle: 'Application mobile fitness', offerId: 'o3', clientId: '4', vendorId: '2', vendorName: 'Marie Vendor', status: 'active', createdAt: '2026-03-16T10:00:00Z' },
  { id: 'c2', needId: '3', needTitle: 'Refonte identité visuelle', offerId: 'o4', clientId: '5', vendorId: '9', vendorName: 'Studio Créatif', status: 'active', createdAt: '2026-03-14T10:00:00Z' },
];

export const mockMessages: Message[] = [
  { id: 'm1', collaborationId: 'c1', senderId: '4', senderName: 'Sophie Martin', content: 'Bonjour, quand pouvez-vous commencer ?', createdAt: '2026-03-16T10:30:00Z' },
  { id: 'm2', collaborationId: 'c1', senderId: '2', senderName: 'Marie Vendor', content: 'Bonjour ! Je peux démarrer dès lundi prochain.', createdAt: '2026-03-16T11:00:00Z' },
  { id: 'm3', collaborationId: 'c1', senderId: '4', senderName: 'Sophie Martin', content: 'Parfait, je vous envoie le cahier des charges.', createdAt: '2026-03-16T11:15:00Z' },
];

export const mockNotifications: Notification[] = [
  { id: 'n1', userId: '1', title: 'Nouvelle offre', message: 'Vous avez reçu une nouvelle offre pour "Développement site e-commerce"', read: false, createdAt: '2026-03-18T09:00:00Z' },
  { id: 'n2', userId: '1', title: 'Vote reçu', message: 'Votre besoin "Rédaction contenu SEO" a reçu un nouveau vote', read: true, createdAt: '2026-03-17T14:00:00Z' },
  { id: 'n3', userId: '2', title: 'Collaboration acceptée', message: 'Votre offre pour "Application mobile fitness" a été acceptée', read: false, createdAt: '2026-03-16T10:00:00Z' },
];

export const CATEGORIES = ['Développement Web', 'Mobile', 'Design', 'Marketing', 'Rédaction', 'Data', 'DevOps', 'Consulting'];
