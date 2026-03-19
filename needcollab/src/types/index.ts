export type NeedStatus = 'draft' | 'published' | 'in_progress' | 'finalized' | 'completed' | 'cancelled';
export type OfferStatus = 'pending' | 'accepted' | 'rejected' | 'expired';
export type NeedCategory = 'vetements' | 'bricolage' | 'electronique' | 'meubles' | 'materiaux' | 'sport' | 'jardin' | 'cuisine' | 'decoration' | 'jouets' | 'livres' | 'autres';

export interface Need {
  id: string;
  creator_id: string;
  title: string;
  description: string | null;
  category: NeedCategory;
  status: NeedStatus;
  image_url: string | null;
  target_date: string | null;
  budget_min: number | null;
  budget_max: number | null;
  min_participants: number;
  max_participants: number | null;
  quantity_per_person: number;
  specifications: Record<string, unknown>;
  share_token: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields (via select with profiles)
  creator?: { full_name: string | null; avatar_url: string | null };
}

export interface Offer {
  id: string;
  need_id: string;
  vendor_id: string;
  status: OfferStatus;
  price_total: number;
  price_per_unit: number | null;
  min_buyers: number;
  delivery_days: number | null;
  delivery_description: string | null;
  conditions: string | null;
  message: string | null;
  valid_until: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  vendor?: { full_name: string | null; vendor_company_name: string | null };
}

export interface Collaboration {
  id: string;
  need_id: string;
  user_id: string;
  position: number;
  quantity: number;
  cost_percentage: number | null;
  wants_contact: boolean;
  location_lat: number | null;
  location_lng: number | null;
  location_city: string | null;
  location_country: string | null;
  joined_at: string;
  // Joined fields
  need?: { title: string; status: NeedStatus };
  user?: { full_name: string | null; avatar_url: string | null };
}

export interface Message {
  id: string;
  need_id: string;
  sender_id: string;
  offer_id: string | null;
  content: string;
  is_vendor_channel: boolean;
  created_at: string;
  // Joined fields
  sender?: { full_name: string | null; avatar_url: string | null };
}

export interface Notification {
  id: string;
  user_id: string;
  need_id: string | null;
  offer_id: string | null;
  type: string;
  title: string;
  message: string | null;
  read: boolean;
  created_at: string;
}

export interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  username: string | null;
  is_vendor: boolean;
  vendor_company_name: string | null;
  vendor_siret: string | null;
  vendor_status: 'pending' | 'verified' | 'rejected' | 'suspended' | null;
  vendor_verified_at: string | null;
  location_lat: number | null;
  location_lng: number | null;
  location_city: string | null;
  location_country: string | null;
  wants_to_be_contacted: boolean;
  is_suspended: boolean;
  suspended_at: string | null;
  suspension_reason: string | null;
  created_at: string;
  updated_at: string;
}
