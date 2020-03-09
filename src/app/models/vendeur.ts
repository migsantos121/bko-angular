export interface Vendeur {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  last_login: Date;
  address: string;
  member_since: number;
  id_pays: number;
  pays: object;
  user_photo: string;
  id_type: number;
  is_active: boolean;
  rating: number;
  telephone: string;
  ads_count: number;
}
