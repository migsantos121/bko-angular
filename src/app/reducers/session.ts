import { ActionReducer, Action } from '@ngrx/store';
import * as sessionActions from '../actions/session';
import * as sessionConstants from '../constants/sessions';

import { User } from '../models/user';


export interface State {
  data: User;
  isPending: false;
  error: {};
  config: {};
};

const sessionInitialState: State = {
  data: null,
  isPending: false,
  error: {},
  config: {
    appName: 'angular angular',
    companyName: 'Coin Afrique',
    descriptionTitle: 'Les bonnes affaires dans votre poche',
    descriptionText: 'Tous droits réservés.',
    currentYear: '2017'
  }
};

export function reducer(state = sessionInitialState, action: sessionActions.Actions) {
  switch (action.type) {
    case sessionConstants.REQUEST_OAUTH:
    case sessionConstants.REQUEST_CURRENT_USER:
    case sessionConstants.REQUEST_UPDATE_ACCOUNT:
    case sessionConstants.REQUEST_CHANGE_PASSWORD:
    case sessionConstants.REQUEST_DESTROY_OAUTH:
    case sessionConstants.REQUEST_REFRESH_TOKEN:
    case sessionConstants.REQUEST_RECOVER_PASSWORD: {
      return Object.assign({}, state, {
        isPending: true
      });
    }
    case sessionConstants.REQUEST_DESTROY_OAUTH_COMPLETE: {
      return Object.assign({}, state, {
        data: {},
        isPending: false,
        error: {}
      });
    }
    case sessionConstants.REQUEST_OAUTH_COMPLETE:
    case sessionConstants.REQUEST_UPDATE_ACCOUNT_COMPLETE:
    case sessionConstants.REQUEST_CURRENT_USER_COMPLETE: {
      return Object.assign({}, state, {
        data: action.payload,
        isPending: false
      });
    }
    case sessionConstants.REQUEST_OAUTH_ERROR:
    case sessionConstants.REQUEST_UPDATE_ACCOUNT_ERROR:
    case sessionConstants.REQUEST_CHANGE_PASSWORD_ERROR:
    case sessionConstants.REQUEST_CURRENT_USER_ERROR:
    case sessionConstants.REQUEST_DESTROY_OAUTH_ERROR:
    case sessionConstants.REQUEST_RECOVER_PASSWORD_ERROR:
    case sessionConstants.REQUEST_RECOVER_PASSWORD_COMPLETE: {
      return Object.assign({}, state, {
        error: action.payload,
        isPending: false
      });
    }
    case sessionConstants.REQUEST_CHANGE_PASSWORD_COMPLETE:
    default: {
      return state;
    }
  }
};

export const getUser = (state: State) => state.data;
export const getStatus = (state: State) => state.isPending;
export const getError = (state: State) => state.error;
export const getConfig = (state: State) => state.config;
