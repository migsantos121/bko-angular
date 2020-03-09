import { Action } from '@ngrx/store';

import * as activitesConstants from '../constants/dashboard';

export class RequestChartKeyword implements Action {
  readonly type = activitesConstants.REQUEST_CHART_KEYWORD;
  constructor(public payload = {}) { }
}
export class RequestChartKeywordComplete implements Action {
  readonly type = activitesConstants.REQUEST_CHART_KEYWORD_COMPLETE;
  constructor(public payload = {}) { }
}

export class RequestChartKeywordError implements Action {
  readonly type = activitesConstants.REQUEST_CHART_KEYWORD_ERROR;
  constructor(public payload = {}) { }
}


export class RequestChartData implements Action {
  readonly type = activitesConstants.REQUEST_CHART_DATA;
  constructor(public payload = {}) { }
}
export class RequestChartDataComplete implements Action {
  readonly type = activitesConstants.REQUEST_CHART_DATA_COMPLETE;
  constructor(public payload = {}) { }
}

export class RequestChartDataError implements Action {
  readonly type = activitesConstants.REQUEST_CHART_DATA_ERROR;
  constructor(public payload = {}) { }
}

export type Actions
  = RequestChartKeyword
  | RequestChartKeywordComplete
  | RequestChartKeywordError
  | RequestChartData
  | RequestChartDataComplete
  | RequestChartDataError;

