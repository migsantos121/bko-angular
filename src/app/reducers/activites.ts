import * as activitesActions from '../actions/activites';
import * as activitesConstants from '../constants/activite';

import { Activite } from '../models/activite';

export interface State {
  activite: Activite;
  activites: Activite[];
  isPending: boolean;
  error: Object;
  messages: any;
  next: string;
  prev: string;
  total: number;
}

const activiteInitialState: State = {
  activite: null,
  activites: null,
  isPending: false,
  error: {},
  messages: '',
  next: '',
  prev: '',
  total: 0
};

export function reducer(
  state = activiteInitialState,
  action: activitesActions.Actions
) {
  switch (action.type) {
    case activitesConstants.REQUEST_ACTIVITES: {
      return Object.assign({}, state, {
        isPending: true
      });
    }
    case activitesConstants.REQUEST_ACTIVITES_COMPLETE: {
      return Object.assign({}, state, {
        activites: action.payload['results'],
        next: action.payload['next'],
        prev: action.payload['previous'],
        total: action.payload['count'],
        isPending: false,
        error: {}
      });
    }

    case activitesConstants.REQUEST_ACTIVITES_ERROR: {
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

export const getActivite = (state: State) => state.activite;
export const getActivites = (state: State) => state.activites;
export const getActiviteStatus = (state: State) => state.isPending;
export const getActiviteError = (state: State) => state.error;
export const getActivitesNext = (state: State) => state.next;
export const getActivitesPrev = (state: State) => state.prev;
export const getActivitesCount = (state: State) => state.total;
