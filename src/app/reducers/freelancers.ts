import * as freelancersActions from '../actions/freelancers';
import * as freelancersConstants from '../constants/freelancers';

import { Freelancer, FreelancerEvent } from '../models/freelancer';


export interface State {
  freelancer: Freelancer;
  freelancers: Freelancer[];
  freelancerEvents: FreelancerEvent[];
  isPending: boolean;
  error: Object;
}

const freelancerInitialState: State = {
  freelancer: null,
  freelancers: null,
  freelancerEvents: null,
  isPending: false,
  error: {}
};

export function reducter(state = freelancerInitialState, action: freelancersActions.Actions) {
  switch (action.type) {
    case freelancersConstants.REQUEST_FREELANCER:
    case freelancersConstants.REQUEST_FREELANCER_CREATE:
    case freelancersConstants.REQUEST_FREELANCER_UPDATE:
    case freelancersConstants.REQUEST_FREELANCER_DELETE:
    case freelancersConstants.REQUEST_FREELANCERS:
    case freelancersConstants.REQUEST_FREELANCER_EVENTS: {
      return Object.assign({}, state, {
        isPending: true
      });
    }

    case freelancersConstants.REQUEST_NEW_FREELANCER: {
      return Object.assign({}, state, {
        isPending: false
      });
    }

    case freelancersConstants.REQUEST_FREELANCERS_COMPLETE: {
      console.log(action.payload);
      return Object.assign({}, state, {
        freelancers: action.payload['data']['items'],
        total: action.payload['data']['total'],
        isPending: false,
        error: {}
      });
    }

    case freelancersConstants.REQUEST_FREELANCER_COMPLETE: {
      return Object.assign({}, state, {
        freelancer: action.payload,
        isPending: false,
        error: {}
      });
    }

    case freelancersConstants.REQUEST_FREELANCER_EVENTS_COMPLETE: {
      return Object.assign({}, state, {
        freelancerEvents: action.payload['data'],
        isPending: false,
        error: {}
      });
    }

    case freelancersConstants.REQUEST_FREELANCER_CREATE_COMPLETE: {
      return Object.assign({}, state, {
        freelancers: [action.payload['data'], ...state.freelancers],
        isPending: false,
        error: {}
      });
    }
    case freelancersConstants.REQUEST_FREELANCER_UPDATE_COMPLETE: {
      return Object.assign({}, state, {
        freelancers: state.freelancers.map((freelancer) => {
          // tslint:disable-next-line:curly
          if (freelancer.user_id === action.payload['data']['user_id'])
            return action.payload['data'];
          return freelancer;
        }),
        isPending: false,
        error: {}
      });
    }
    case freelancersConstants.REQUEST_FREELANCER_DELETE_COMPLETE: {
      return Object.assign({}, state, {
        freelancers: state.freelancers.filter((freelancer) => {
          return freelancer.user_id !== action.payload['payload']['user_id'];
        }),
        isPending: false,
        error: {}
      });
    }
    case freelancersConstants.REQUEST_FREELANCER_DELETE_CANCELED: {
      return Object.assign({}, state, {
        isPending: false,
      });
    }
    case freelancersConstants.REQUEST_RESET_FREELANCER: {
      return Object.assign({}, state, {
        freelancer: null
      });
    }

    case freelancersConstants.REQUEST_FREELANCER_CREATE_ERROR:
    case freelancersConstants.REQUEST_FREELANCER_UPDATE_ERROR:
    case freelancersConstants.REQUEST_FREELANCER_DELETE_ERROR:
    case freelancersConstants.REQUEST_FREELANCER_PASSWORD_ERROR:
    case freelancersConstants.REQUEST_FREELANCER_ERROR:
    case freelancersConstants.REQUEST_FREELANCERS_ERROR:
    case freelancersConstants.REQUEST_FREELANCER_EVENTS_ERROR: {
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

export const getFreelancer = (state: State) => state.freelancer;
export const getFreelancers = (state: State) => state.freelancers;
export const getFreelancerStatus = (state: State) => state.isPending;
export const getFreelancerError = (state: State) => state.error;
export const getFreelancerEvents = (state: State) => state.freelancerEvents;

