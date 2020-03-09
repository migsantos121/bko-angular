import { Pays } from './pays';

export interface User {
  user_id: number;
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  role: string;
  user_type: string;
  telephone: string;
  user_photo: string;
  created_at: string;
  member_since: string;
  address: string;
  rating: number;
  pays: Pays;
  ads_count: number;
  ad_nbr: number;
  id_pays: number;
  is_active: boolean;
  last_login: string;

}


