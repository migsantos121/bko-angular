export enum TypeSpecializedAd {
  classic = 0,
  auto = 1,
  auto_voiture = 100,
  auto_camion = 101,
  auto_moto = 102,
  immo = 2,
  immo_villa = 200,
  immo_appt = 201,
  immo_terrain = 202,
  immot_immble = 203,
  immo_office = 205,
  collection = 300,
  other = 400
}

export enum TypeDeal {
  normal = 0,
  reduction = 1,
  urgent = 2,
  personnaliser = 3
}


export enum TypeGood {
  'Non specifié' = 0,
  vente = 1,
  location = 2,
  'Meublé' = 3,
  collocation = 4
}
export enum TypeCategorie {
  vente = 0,
  service = 1,
  recherche = 2,
  collection = 3
}

export enum TypeUser {
  professionnel = 0,
  particulier = 1
}


export enum TypeStatusAnnonce {
  'En attente' = 0,
  valider = 1,
  rejeter = 2
  // PENDING, ACCEPTED, REJECTED = [format(x, '01d') for x in range(3)]
}

export enum TypeEtatAnnonce {
  Disponible = 0,
  'en Negotiation' = 1,
  Vendue = 2
}

export enum TypeSupprimeAnnonce {
  Oui = 1,
  Non = 0
}

export enum TypeAnnonce {
  offre = 0,
  service = 1,
  demande = 2
  // VENTE, SERVICE, RECHERCHE
}


export enum RoleModerateur {
  moderateur = 0,
  'Chef moderateur' = 1
  // MODERATEUR, CHEF_MODERATEUR
}

export enum TypeEtatOffre {
  disponible = 0,
  'En negociation' = 1,
  clos = 2
  // DISPONIBLE, NEGOCIATION, CLOS = [format(x, '01d') for x in range(3)]

}

export enum TypeEtatProduit {
  neuf = 0,
  occasion = 1
  // NEUF, OCCASION = [format(x, '01d') for x in range(2)]
}


export enum TypeVoiture {
  voiture = 0,
  moto = 1,
  camion = 2
  // VOITURE, MOTO, CAMION = range(3)
}

export enum TypeCarburant {
  essence = 1,
  gasoil = 2
  // ESSENCE, GASOIL = range(1, 3)
}

export enum TypeTransmission {
  automatique = 1,
  manuelle = 2
  // AUTOMATIQUE, MANUELLE = range(1, 3)
}
