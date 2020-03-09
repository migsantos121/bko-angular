import * as dashboardActions from '../actions/dashboard';
import * as dashboardConstants from '../constants/dashboard';
import { AgWordCloudData } from 'angular4-word-cloud';


export interface State {
  keywords: Array<any>[];
  data: Object;
  isPending: boolean;
  error: Object;
}

const dashboardInitialState: State = {
  keywords: [],
  data: {},
  isPending: false,
  error: {}
};

export function reducer(
  state = dashboardInitialState,
  action: dashboardActions.Actions
) {
  switch (action.type) {
    case dashboardConstants.REQUEST_CHART_DATA:
    case dashboardConstants.REQUEST_CHART_KEYWORD: {
      return Object.assign({}, state, {
        isPending: true
      });
    }
    case dashboardConstants.REQUEST_CHART_KEYWORD_COMPLETE: {
      return Object.assign({}, state, {
        keywords: action.payload['top_keywords'],
        isPending: false,
        error: {}
      });
    }
    case dashboardConstants.REQUEST_CHART_DATA_COMPLETE: {
      return Object.assign({}, state, {
        data: action.payload,
        isPending: false,
        error: {}
      });
    }

    default: {
      return state;
    }
  }
}

export const getKeywords = (state: State) => state.keywords;
export const getData = (state: State) => state.data;
