import * as vendeursActions from '../actions/vendeurs';
import * as vendeursConstants from '../constants/vendeurs';

import { Vendeur } from '../models/vendeur';

export interface State {
  vendeur: Vendeur;
  vendeurs: Vendeur[];
  export_vendeurs: Vendeur[];
  isPending: boolean;
  error: Object;
  messages: any;
  next: string;
  prev: string;
  total: number;
}

const vendeurInitialState: State = {
  vendeur: null,
  vendeurs: null,
  export_vendeurs: null,
  isPending: false,
  error: {},
  messages: '',
  next: '',
  prev: '',
  total: 0
};

export function reducer(
  state = vendeurInitialState,
  action: vendeursActions.Actions
) {
  switch (action.type) {
    case vendeursConstants.REQUEST_VENDEUR:
    case vendeursConstants.REQUEST_VENDEUR_CREATE:
    case vendeursConstants.REQUEST_VENDEUR_UPDATE:
    case vendeursConstants.REQUEST_VENDEUR_DELETE:
    case vendeursConstants.REQUEST_VENDEURS_EXPORT:
    case vendeursConstants.REQUEST_VENDEURS: {
      return Object.assign({}, state, {
        isPending: true
      });
    }
    case vendeursConstants.REQUEST_VENDEURS_COMPLETE: {
      return Object.assign({}, state, {
        vendeurs: action.payload['results'],
        next: action.payload['next'],
        prev: action.payload['previous'],
        total: action.payload['count'],
        isPending: false,
        error: {}
      });
    }

    case vendeursConstants.REQUEST_VENDEURS_EXPORT_COMPLETE: {
      return Object.assign({}, state, {
        export_vendeurs: action.payload,
        isPending: false,
        error: {}
      });
    }

    case vendeursConstants.REQUEST_VENDEUR_COMPLETE: {
      return Object.assign({}, state, {
        vendeur: action.payload,
        isPending: false,
        error: {}
      });
    }
    case vendeursConstants.REQUEST_VENDEUR_CREATE_COMPLETE: {
      return Object.assign({}, state, {
        vendeurs: [action.payload, ...state.vendeurs],
        isPending: false,
        error: {}
      });
    }
    case vendeursConstants.REQUEST_VENDEUR_UPDATE_COMPLETE: {
      return Object.assign({}, state, {
        vendeur: action.payload,
        isPending: false,
        error: {}
      });
    }
    case vendeursConstants.REQUEST_VENDEUR_DELETE_COMPLETE: {
      return Object.assign({}, state, {
        vendeurs: state.vendeurs.filter(moderateur => {
          return moderateur.id !== action.payload['id'];
        }),
        isPending: false,
        error: {}
      });
    }
    case vendeursConstants.REQUEST_VENDEUR_CREATE_ERROR:
    case vendeursConstants.REQUEST_VENDEUR_UPDATE_ERROR:
    case vendeursConstants.REQUEST_VENDEUR_DELETE_ERROR:
    case vendeursConstants.REQUEST_VENDEUR_ERROR:
    case vendeursConstants.REQUEST_VENDEURS_EXPORT_ERROR:
    case vendeursConstants.REQUEST_VENDEURS_ERROR: {
      return Object.assign({}, state, {
        isPending: false,
        error: action.payload
      });
    }

    default: {
      return state;
    }
  }
}

export const getVendeur = (state: State) => state.vendeur;
export const getVendeurs = (state: State) => state.vendeurs;
export const getVendeursExport = (state: State) => state.export_vendeurs;
export const getVendeurStatus = (state: State) => state.isPending;
export const getVendeurError = (state: State) => state.error;
export const getVendeursNext = (state: State) => state.next;
export const getVendeursPrev = (state: State) => state.prev;
export const getVendeursCount = (state: State) => state.total;
