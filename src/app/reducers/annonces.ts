import * as annonceActions from '../actions/annonces';
import * as annonceConstants from '../constants/annonces';

import { Annonce } from '../models/annonce';

export interface State {
  stats: {};
  messages: '';
  next: '';
  prev: '';
  total: 0;
  annonces: Annonce[];
  annonce: Annonce;
  isPending: boolean;
  error: Object;
}

const annoncesInitialState: State = {
  stats: {},
  messages: '',
  next: '',
  prev: '',
  total: 0,
  annonces: null,
  annonce: null,
  isPending: false,
  error: {}
};

export function reducer(
  state = annoncesInitialState,
  action: annonceActions.Actions
) {
  switch (action.type) {
    case annonceConstants.REQUEST_GET_ANNONCE:
    case annonceConstants.REQUEST_UPDATE_ANNONCE:
    case annonceConstants.REQUEST_EDIT_ANNONCE:
    case annonceConstants.REQUEST_DELETE_ANNONCE:
    case annonceConstants.REQUEST_ANNONCE_PICTURE_UPLOAD:
    case annonceConstants.REQUEST_ANNONCE_PICTURE_DELETE:
    case annonceConstants.REQUEST_CREATE_ANNONCE:
    case annonceConstants.REQUEST_ANNONCES_STATUS_STATS:
    case annonceConstants.REQUEST_MODERATE_ANNONCE:
    case annonceConstants.REQUEST_LINK_ANNONCE:
    case annonceConstants.REQUEST_ANNONCE_REFRESH_CACHE:
    case annonceConstants.REQUEST_CREATE_ANNONCE_COLLECTION:
    case annonceConstants.SEARCH_ELEMENT:
    case annonceConstants.REQUEST_ANNONCES: {
      return Object.assign({}, state, {
        isPending: true
      });
    }
    case annonceConstants.REQUEST_ANNONCES_COMPLETE: {
      return Object.assign({}, state, {
        annonces: action.payload['results'],
        next: action.payload['next'],
        prev: action.payload['previous'],
        total: action.payload['count'],
        isPending: false,
        error: {}
      });
    }
    case annonceConstants.REQUEST_LINK_ANNONCE_COMPLETE:
    case annonceConstants.REQUEST_CREATE_ANNONCE_COLLECTION_COMPLETE: {
      return Object.assign({}, state, {
        messages: action.payload,
        isPending: false,
        error: {}
      });
    }
    case annonceConstants.REQUEST_ANNONCE_REFRESH_CACHE_COMPLETE: {
      return Object.assign({}, state, {
        isPending: false,
        error: {}
      });
    }
    case annonceConstants.REQUEST_ANNONCES_STATUS_STATS_COMPLETE: {
      return Object.assign({}, state, {
        stats: action.payload,
        isPending: false,
        error: {}
      });
    }
    case annonceConstants.REQUEST_RESET_ANNONCE_COMPLETE: {
      return Object.assign({}, state, {
        isPending: false,
        error: {}
      });
    }
    case annonceConstants.REQUEST_GET_ANNONCE_COMPLETE: {
      return Object.assign({}, state, {
        annonce: action.payload,
        isPending: false,
        error: {}
      });
    }
    case annonceConstants.REQUEST_MODERATE_ANNONCE_COMPLETE: {
      return Object.assign({}, state, {
        annonces: state.annonces.filter(annonce => {
          return annonce.id !== action.payload['annonce']['id'];
        }),
        annonce: action.payload['annonce'],
        isPending: false,
        error: {}
      });
    }
    case annonceConstants.REQUEST_PROMOTION_COMPLETE: {
      return Object.assign({}, state, {
        annonces: state.annonces.filter(annonce => {
          return annonce.id !== action.payload['id'];
        }),
        isPending: false,
        error: {}
      });
    }
    case annonceConstants.REQUEST_EDIT_ANNONCE_COMPLETE: {
      return Object.assign({}, state, {
        annonce: action.payload['annonce'],
        isPending: false,
        error: {}
      });
    }
    case annonceConstants.REQUEST_CREATE_ANNONCE_COMPLETE: {
      return Object.assign({}, state, {
        annonces: [action.payload, ...state.annonces],
        isPending: false,
        error: {}
      });
    }
    case annonceConstants.REQUEST_ANNONCE_PICTURE_UPLOAD_COMPLETE: {
      return Object.assign({}, state, {
        annonce: action.payload['annonce'],
        isPending: false,
        error: {}
      });
    }
    case annonceConstants.REQUEST_ANNONCE_PICTURE_DELETE_COMPLETE: {
      return Object.assign({}, state, {
        annonce: action.payload['annonce'],
        isPending: false,
        error: {}
      });
    }
    case annonceConstants.REQUEST_UPDATE_ANNONCE_COMPLETE: {
      if (action.payload['etat'] === true) {
        return Object.assign({}, state, {
          annonces: state.annonces.filter(annonce => {
            return annonce.id !== action.payload['annonce']['id'];
          }),
          annonce: action.payload['annonce'],
          isPending: false,
          error: {}
        });
      } else {
        return Object.assign({}, state, {
          annonces: state.annonces.map(annonce => {
            // tslint:disable-next-line:curly
            if (annonce.id === action.payload['annonce']['id'])
              return action.payload['annonce'];
            return annonce;
          }),
          annonce: action.payload['annonce'],
          isPending: false,
          error: {}
        });
      }
    }
    case annonceConstants.REQUEST_DELETE_ANNONCE_COMPLETE: {
      return Object.assign({}, state, {
        annonces: state.annonces.filter(annonce => {
          return annonce.id !== action.payload['id'];
        }),
        isPending: false,
        error: {}
      });
    }
    case annonceConstants.REQUEST_CREATE_ANNONCE_ERROR:
    case annonceConstants.REQUEST_UPDATE_ANNONCE_ERROR:
    case annonceConstants.REQUEST_EDIT_ANNONCE_ERROR:
    case annonceConstants.REQUEST_DELETE_ANNONCE_ERROR:
    case annonceConstants.REQUEST_GET_ANNONCE_ERROR:
    case annonceConstants.REQUEST_ANNONCES_STATUS_STATS_ERROR:
    case annonceConstants.REQUEST_MODERATE_ANNONCE_ERROR:
    case annonceConstants.REQUEST_LINK_ANNONCE_ERROR:
    case annonceConstants.REQUEST_CREATE_ANNONCE_COLLECTION_ERROR:
    case annonceConstants.SEARCH_ELEMENT_ERROR:
    case annonceConstants.REQUEST_ANNONCES_ERROR: {
      return Object.assign({}, state, {
        isPending: false,
        error: action.payload
      });
    }
    case annonceConstants.SEARCH_ELEMENT_COMPLETE:{
      return Object.assign({}, state, {
        annonces: action.payload,
        isPending: false,
      });
    }

    default: {
      return state;
    }
  }
}

export const getAnnonce = (state: State) => state.annonce;
export const getAnnoncesStats = (state: State) => state.stats;
export const getAnnonces = (state: State) => state.annonces;
export const getAnnoncesNext = (state: State) => state.next;
export const getAnnoncesPrev = (state: State) => state.prev;
export const getAnnoncesCount = (state: State) => state.total;
export const getAnnonceStatus = (state: State) => state.isPending;
export const getAnnonceError = (state: State) => state.error;
