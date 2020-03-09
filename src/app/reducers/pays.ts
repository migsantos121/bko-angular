import * as paysActions from '../actions/pays';
import * as paysConstants from '../constants/pays';

import { Pays } from '../models/pays';

export interface State {
  pays: Pays[];
  isPending: boolean;
  error: Object;
}

const paysInitialState: State = {
  pays: null,
  isPending: false,
  error: {}
};

export function reducer(state = paysInitialState, action: paysActions.Actions) {
  switch (action.type) {
    case paysConstants.REQUEST_PAYS_UPDATE:
    case paysConstants.REQUEST_PAYS_DELETE:
    case paysConstants.REQUEST_PAYS: {
      return Object.assign({}, state, {
        isPending: true
      });

    }

    case paysConstants.REQUEST_PAYS_COMPLETE: {
      return Object.assign({}, state, {
        pays: action.payload,
        isPending: false,
        error: {}
      });
    }

    case paysConstants.REQUEST_PAYS_CREATE_COMPLETE: {
      return Object.assign({}, state, {
        pays: [action.payload, ...state.pays],
        isPending: false,
        error: {}
      });
    }
    case paysConstants.REQUEST_PAYS_UPDATE_COMPLETE: {
      return Object.assign({}, state, {
        pays: state.pays.map((moderateur) => {
          // tslint:disable-next-line:curly
          if (moderateur.id === action.payload['id'])
            return action.payload;
          return moderateur;
        }),
        isPending: false,
        error: {}
      });
    }
    case paysConstants.REQUEST_PAYS_DELETE_COMPLETE: {
      return Object.assign({}, state, {
        pays: state.pays.filter((moderateur) => {
          return moderateur.id !== action.payload['id'];
        }),
        isPending: false,
        error: {}
      });
    }
    case paysConstants.REQUEST_PAYS_CREATE_ERROR:
    case paysConstants.REQUEST_PAYS_UPDATE_ERROR:
    case paysConstants.REQUEST_PAYS_DELETE_ERROR:
    case paysConstants.REQUEST_PAYS_ERROR: {
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


export const getPays = (state: State) => state.pays;
export const getPaysStatus = (state: State) => state.isPending;
export const getPaysError = (state: State) => state.error;
