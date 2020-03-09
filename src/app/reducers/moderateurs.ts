import * as moderateursActions from '../actions/moderateurs';
import * as moderateursConstants from '../constants/moderateurs';

import { Moderateur } from '../models/moderateur';


export interface State {
  moderateur: Moderateur;
  moderateurs: Moderateur[];
  isPending: boolean;
  error: Object;
}

const moderateurInitialState: State = {
  moderateur: null,
  moderateurs: null,
  isPending: false,
  error: {}
};

export function reducter(state = moderateurInitialState, action: moderateursActions.Actions) {
  switch (action.type) {
    case moderateursConstants.REQUEST_MODERATEUR:
    case moderateursConstants.REQUEST_MODERATEUR_CREATE:
    case moderateursConstants.REQUEST_MODERATEUR_UPDATE:
    case moderateursConstants.REQUEST_MODERATEUR_DELETE:
    case moderateursConstants.REQUEST_MODERATEURS: {
      return Object.assign({}, state, {
        isPending: true
      });
    }

    case moderateursConstants.REQUEST_NEW_MODERATEUR: {
      return Object.assign({}, state, {
        isPending: false
      });
    }

    case moderateursConstants.REQUEST_MODERATEURS_COMPLETE: {
      console.log(action.payload);
      return Object.assign({}, state, {
        moderateurs: action.payload['data']['items'],
        total: action.payload['data']['total'],
        isPending: false,
        error: {}
      });
    }

    case moderateursConstants.REQUEST_MODERATEUR_COMPLETE: {
      return Object.assign({}, state, {
        moderateur: action.payload,
        isPending: false,
        error: {}
      });
    }


    case moderateursConstants.REQUEST_MODERATEUR_CREATE_COMPLETE: {
      return Object.assign({}, state, {
        moderateurs: [action.payload['data'], ...state.moderateurs],
        isPending: false,
        error: {}
      });
    }
    case moderateursConstants.REQUEST_MODERATEUR_UPDATE_COMPLETE: {
      return Object.assign({}, state, {
        moderateurs: state.moderateurs.map((moderateur) => {
          // tslint:disable-next-line:curly
          if (moderateur.user_id === action.payload['data']['user_id'])
            return action.payload['data'];
          return moderateur;
        }),
        isPending: false,
        error: {}
      });
    }
    case moderateursConstants.REQUEST_MODERATEUR_DELETE_COMPLETE: {
      return Object.assign({}, state, {
        moderateurs: state.moderateurs.filter((moderateur) => {
          return moderateur.user_id !== action.payload['payload']['user_id'];
        }),
        isPending: false,
        error: {}
      });
    }
    case moderateursConstants.REQUEST_MODERATEUR_DELETE_CANCELED: {
      return Object.assign({}, state, {
        isPending: false,
      });
    }
    case moderateursConstants.REQUEST_RESET_MODERATEUR: {
      return Object.assign({}, state, {
        moderateur: null
      });
    }

    case moderateursConstants.REQUEST_MODERATEUR_CREATE_ERROR:
    case moderateursConstants.REQUEST_MODERATEUR_UPDATE_ERROR:
    case moderateursConstants.REQUEST_MODERATEUR_DELETE_ERROR:
    case moderateursConstants.REQUEST_MODERATEUR_PASSWORD_ERROR:
    case moderateursConstants.REQUEST_MODERATEUR_ERROR:
    case moderateursConstants.REQUEST_MODERATEURS_ERROR: {
      console.log(action);
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

export const getModerateur = (state: State) => state.moderateur;
export const getModerateurs = (state: State) => state.moderateurs;
export const getModerateurStatus = (state: State) => state.isPending;
export const getModerateurError = (state: State) => state.error;
