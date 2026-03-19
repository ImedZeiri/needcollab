export interface Need {
  id: string;
  title: string;
  description: string;
  category: string;
  budget: number;
  currency: string;
  location: string;
  status: 'open' | 'in_progress' | 'closed';
  createdAt: string;
  updatedAt: string;
  authorId: string;
  authorName: string;
  offersCount: number;
  votesCount: number;
}

export interface Offer {
  id: string;
  needId: string;
  vendorId: string;
  vendorName: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  deliveryTime: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface Collaboration {
  id: string;
  needId: string;
  needTitle: string;
  offerId: string;
  clientId: string;
  vendorId: string;
  vendorName: string;
  status: 'active' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface Message {
  id: string;
  collaborationId: string;
  senderId: string;
  senderName: string;
  content: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}
