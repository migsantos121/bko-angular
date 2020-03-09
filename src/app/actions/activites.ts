import { Action } from '@ngrx/store';

import * as activitesConstants from '../constants/activite';

export class RequestResetActiviteComplete implements Action {
  readonly type = activitesConstants.REQUEST_RESET_ACTIVITE_COMPLETE;
  constructor(public payload = {}) {}
}

export class RequestActivites implements Action {
  readonly type = activitesConstants.REQUEST_ACTIVITES;
  constructor(public payload = null) {}
}

export class RequestActivitesComplete implements Action {
  readonly type = activitesConstants.REQUEST_ACTIVITES_COMPLETE;
  constructor(public payload = null) {}
}

export class RequestActivitesError implements Action {
  readonly type = activitesConstants.REQUEST_ACTIVITES_ERROR;
  constructor(public payload = null) {}
}

export class RequestActivitesNext implements Action {
  readonly type = activitesConstants.REQUEST_ACTIVITES_NEXT;
  constructor(public payload = null) {}
}

export class RequestActivitesNextComplete implements Action {
  readonly type = activitesConstants.REQUEST_ACTIVITES_NEXT_COMPLETE;
  constructor(public payload = null) {}
}

export class RequestActivitesNextError implements Action {
  readonly type = activitesConstants.REQUEST_ACTIVITES_NEXT_ERROR;
  constructor(public payload = null) {}
}

export class RequestActivitesPrev implements Action {
  readonly type = activitesConstants.REQUEST_ACTIVITES_PREV;
  constructor(public payload = null) {}
}

export class RequestActivitesPrevComplete implements Action {
  readonly type = activitesConstants.REQUEST_ACTIVITES_PREV_COMPLETE;
  constructor(public payload = null) {}
}

export class RequestActivitesPrevError implements Action {
  readonly type = activitesConstants.REQUEST_ACTIVITES_PREV_ERROR;
  constructor(public payload = null) {}
}

export type Actions =
  | RequestActivites
  | RequestActivitesComplete
  | RequestResetActiviteComplete
  | RequestActivitesError;
