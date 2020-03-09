import { ActionReducer } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { environment } from '../../environments/environment';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';

import { createSelector } from 'reselect';

import * as fromSession from './session';
import * as fromNotifications from './notifications';
import * as fromAnnonces from './annonces';
import * as fromCategories from './categories';
import * as fromPays from './pays';
import * as fromModerateurs from './moderateurs';
import * as fromFreelancers from './freelancers';
import * as fromCollections from './collections';
import * as fromVendeurs from './vendeurs';
import * as fromActivites from './activites';
import * as fromDashboard from './dashboard';

export interface State {
  session: fromSession.State;
  notifications: fromNotifications.State;
  annonces: fromAnnonces.State;
  moderateurs: fromModerateurs.State;
  freelancers: fromFreelancers.State;
  pays: fromPays.State;
  categories: fromCategories.State;
  collections: fromCollections.State;
  vendeurs: fromVendeurs.State;
  activites: fromActivites.State;
  dashboard: fromDashboard.State;
  router: fromRouter.RouterState;
}

const reducers = {
  session: fromSession.reducer,
  notifications: fromNotifications.reducer,
  annonces: fromAnnonces.reducer,
  moderateurs: fromModerateurs.reducter,
  freelancers: fromFreelancers.reducter,
  categories: fromCategories.reducer,
  pays: fromPays.reducer,
  collections: fromCollections.reducer,
  vendeurs: fromVendeurs.reducer,
  activites: fromActivites.reducer,
  dashboard: fromDashboard.reducer,
  router: fromRouter.routerReducer
};

const developmentReducer: ActionReducer<State> = compose(
  storeFreeze,
  combineReducers
)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}

// Selectors for session state.
export const getSessionState = (state: State) => state.session;
export const getSessionStatus = createSelector(
  getSessionState,
  fromSession.getStatus
);
export const getSessionUser = createSelector(
  getSessionState,
  fromSession.getUser
);
export const getSessionError = createSelector(
  getSessionState,
  fromSession.getError
);
export const getSessionConfig = createSelector(
  getSessionState,
  fromSession.getConfig
);

// Selector for notifications state.
export const getMessagesState = (state: State) => state.notifications;
export const getMessages = createSelector(
  getMessagesState,
  fromNotifications.getMessages
);

// Selector for annonces state.
export const getAnnoncesState = (state: State) => state.annonces;
export const getAnnonce = createSelector(
  getAnnoncesState,
  fromAnnonces.getAnnonce
);
export const getAnnonces = createSelector(
  getAnnoncesState,
  fromAnnonces.getAnnonces
);
export const getAnnoncesNext = createSelector(
  getAnnoncesState,
  fromAnnonces.getAnnoncesNext
);
export const getAnnoncesPrev = createSelector(
  getAnnoncesState,
  fromAnnonces.getAnnoncesPrev
);
export const getAnnonceStatus = createSelector(
  getAnnoncesState,
  fromAnnonces.getAnnonceStatus
);
export const getAnnoncesStats = createSelector(
  getAnnoncesState,
  fromAnnonces.getAnnoncesStats
);
export const getAnnonceError = createSelector(
  getAnnoncesState,
  fromAnnonces.getAnnonceError
);
export const getAnnoncesCount = createSelector(
  getAnnoncesState,
  fromAnnonces.getAnnoncesCount
);

// Selector for categorie state.
export const getCategoriesState = (state: State) => state.categories;
export const getCategorie = createSelector(
  getCategoriesState,
  fromCategories.getCategorie
);
export const getCategories = createSelector(
  getCategoriesState,
  fromCategories.getCategories
);
export const getCategorieStatus = createSelector(
  getCategoriesState,
  fromCategories.getCategorieStatus
);
export const getCategorieError = createSelector(
  getCategoriesState,
  fromCategories.getCategorieError
);

// Selector for moderateur state.
export const getModerateursState = (state: State) => state.moderateurs;
export const getModerateur = createSelector(
  getModerateursState,
  fromModerateurs.getModerateur
);
export const getModerateurs = createSelector(
  getModerateursState,
  fromModerateurs.getModerateurs
);
export const getModerateurStatus = createSelector(
  getModerateursState,
  fromModerateurs.getModerateurStatus
);
export const getModerateurError = createSelector(
  getModerateursState,
  fromModerateurs.getModerateurError
);

//Selector for freelancer state
export const getFreelancersState = (state: State) => state.freelancers;
export const getFreelancer = createSelector(
  getFreelancersState,
  fromFreelancers.getFreelancer
);
export const getFreelancers = createSelector(
  getFreelancersState,
  fromFreelancers.getFreelancers
);
export const getFreelancerStatus = createSelector(
  getFreelancersState,
  fromFreelancers.getFreelancerStatus
);
export const getFreelancerError = createSelector(
  getFreelancersState,
  fromFreelancers.getFreelancerError
);
export const getFreelancerEvents = createSelector(
  getFreelancersState,
  fromFreelancers.getFreelancerEvents
);

export const getPaysState = (state: State) => state.pays;
export const getPays = createSelector(getPaysState, fromPays.getPays);
export const getPaysStatus = createSelector(
  getPaysState,
  fromPays.getPaysStatus
);
export const getPaysError = createSelector(getPaysState, fromPays.getPaysError);

// Selector for collection state.
export const getCollectionsState = (state: State) => state.collections;
export const getCollection = createSelector(
  getCollectionsState,
  fromCollections.getCollection
);
export const getCollections = createSelector(
  getCollectionsState,
  fromCollections.getCollections
);
export const getCollectionStatus = createSelector(
  getCollectionsState,
  fromCollections.getCollectionStatus
);
export const getCollectionError = createSelector(
  getCollectionsState,
  fromCollections.getCollectionError
);

// Selector for vendeurs state.
export const getVendeursState = (state: State) => state.vendeurs;
export const getVendeur = createSelector(
  getVendeursState,
  fromVendeurs.getVendeur
);
export const getVendeurs = createSelector(
  getVendeursState,
  fromVendeurs.getVendeurs
);
export const getVendeursExport = createSelector(
  getVendeursState,
  fromVendeurs.getVendeursExport
);
export const getVendeursNext = createSelector(
  getVendeursState,
  fromVendeurs.getVendeursNext
);
export const getVendeursPrev = createSelector(
  getVendeursState,
  fromVendeurs.getVendeursPrev
);
export const getVendeurStatus = createSelector(
  getVendeursState,
  fromVendeurs.getVendeurStatus
);

export const getVendeurError = createSelector(
  getVendeursState,
  fromVendeurs.getVendeurError
);
export const getVendeursCount = createSelector(
  getVendeursState,
  fromVendeurs.getVendeursCount
);

// Selector for activites state.
export const getActivitesState = (state: State) => state.activites;
export const getActivite = createSelector(
  getActivitesState,
  fromActivites.getActivite
);
export const getActivites = createSelector(
  getActivitesState,
  fromActivites.getActivites
);
export const getActivitesNext = createSelector(
  getActivitesState,
  fromActivites.getActivitesNext
);
export const getActivitesPrev = createSelector(
  getActivitesState,
  fromActivites.getActivitesPrev
);
export const getActiviteStatus = createSelector(
  getActivitesState,
  fromActivites.getActiviteStatus
);

export const getActiviteError = createSelector(
  getActivitesState,
  fromActivites.getActiviteError
);
export const getActivitesCount = createSelector(
  getActivitesState,
  fromActivites.getActivitesCount
);


export const getDashboardState = (state: State) => state.dashboard;
export const getKeywords = createSelector(
  getDashboardState,
  fromDashboard.getKeywords
);

export const getData = createSelector(
  getDashboardState,
  fromDashboard.getData
);
