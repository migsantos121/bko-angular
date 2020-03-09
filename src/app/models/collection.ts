import { User } from './user';
import { Pays } from './pays';
import { Categorie } from './categorie';

export interface Collection {
  id: number;
  user: User;
  pays: Pays;
  categorie: Categorie;
  date_today: string;
  ad_nbr: number;
  favorite_nbr: number;
  is_sponsored: boolean;
  is_discount: number;
  start_sponsoring: string;
  photo1: {
    thumb: string,
    normal: string
  };
  photo2: {
    thumb: string,
    normal: string
  };
  photo3: {
    thumb: string,
    normal: string
  };
  map_img: string;
  titre: string;
  prix: number;
  duree: string;
  date_creation: string;
  etat: string;
  description: string;
  latitude: number;
  longitude: number;
  type_annonce: string;
  deleted: boolean;
  etat_annonce: number;
  both_rated: boolean;
  telephone: string;
  view_nbr: number;
  etat_produit: string;
  all_country: boolean;
  deal_type: number;
  message_moderation: string;
  source: string;
  specialized_ad: number;
  source_version: string;
  amount_discount: number;
  end_sponsoring: string;
  homepage_sponsoring: boolean;

}
