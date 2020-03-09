
export interface Categorie {
  id: number;
  nom: string;
  parent: Categorie;
  illustration: string;
  type_categorie: number;
  specialized_ad: string;
  created_at: string;
  ads_count: number;
  rank: number;
  childs: any;
}
