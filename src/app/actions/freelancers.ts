import { Action } from '@ngrx/store';

import * as freelancersConstants from '../constants/freelancers';

export class RequestFreelancer implements Action {
  readonly type = freelancersConstants.REQUEST_FREELANCER;
  constructor(public payload = null) { }
}

export class RequestNewFreelancer implements Action {
  readonly type = freelancersConstants.REQUEST_NEW_FREELANCER;
  constructor(public payload = null) { }
}

export class RequestResetFreelancer implements Action {
  readonly type = freelancersConstants.REQUEST_RESET_FREELANCER;
  constructor(public payload = null) { }
}

export class RequestFreelancerComplete implements Action {
  readonly type = freelancersConstants.REQUEST_FREELANCER_COMPLETE;
  constructor(public payload = null) { }
}


export class RequestFreelancerError implements Action {
  readonly type = freelancersConstants.REQUEST_FREELANCER_ERROR;
  constructor(public payload = null) { }
}


export class RequestFreelancers implements Action {
  readonly type = freelancersConstants.REQUEST_FREELANCERS;
  constructor(public payload = null) { }
}

export class RequestFreelancersComplete implements Action {
  readonly type = freelancersConstants.REQUEST_FREELANCERS_COMPLETE;
  constructor(public payload = null) { }
}

export class RequestFreelancersError implements Action {
  readonly type = freelancersConstants.REQUEST_FREELANCERS_ERROR;
  constructor(public payload = null) { }
}


export class RequestCreateFreelancer implements Action {
  readonly type = freelancersConstants.REQUEST_FREELANCER_CREATE;
  constructor(public payload = null) { }
}

export class RequestCreateFreelancerComplete implements Action {
  readonly type = freelancersConstants.REQUEST_FREELANCER_CREATE_COMPLETE;
  constructor(public payload = null) { }
}

export class RequestCreateFreelancerError implements Action {
  readonly type = freelancersConstants.REQUEST_FREELANCER_CREATE_ERROR;
  constructor(public payload = null) { }
}

export class RequestUpdateFreelancer implements Action {
  readonly type = freelancersConstants.REQUEST_FREELANCER_UPDATE;
  constructor(public payload = null) { }
}

export class RequestUpdateFreelancerComplete implements Action {
  readonly type = freelancersConstants.REQUEST_FREELANCER_UPDATE_COMPLETE;
  constructor(public payload = null) { }
}

export class RequestUpdateFreelancerError implements Action {
  readonly type = freelancersConstants.REQUEST_FREELANCER_UPDATE_ERROR;
  constructor(public payload = null) { }
}

export class RequestUpdateFreelancerProfile implements Action {
  readonly type = freelancersConstants.REQUEST_FREELANCER_PROFILE_UPDATE;
  constructor(public payload = null) { }
}

export class RequestUpdateFreelancerProfileComplete implements Action {
  readonly type = freelancersConstants.REQUEST_FREELANCER_PROFILE_UPDATE_COMPLETE;
  constructor(public payload = null) { }
}

export class RequestUpdateFreelancerProfileError implements Action {
  readonly type = freelancersConstants.REQUEST_FREELANCER_PROFILE_UPDATE_ERROR;
  constructor(public payload = null) { }
}

export class RequestDeleteFreelancer implements Action {
  readonly type = freelancersConstants.REQUEST_FREELANCER_DELETE;
  constructor(public payload = null) { }
}

export class RequestDeleteFreelancerComplete implements Action {
  readonly type = freelancersConstants.REQUEST_FREELANCER_DELETE_COMPLETE;
  constructor(public payload = null) { }
}

export class RequestDeleteFreelancerError implements Action {
  readonly type = freelancersConstants.REQUEST_FREELANCER_DELETE_ERROR;
  constructor(public payload = null) { }
}

export class RequestDeleteFreelancerCanceled implements Action {
  readonly type = freelancersConstants.REQUEST_FREELANCER_DELETE_CANCELED;
  constructor(public payload = null) { }
}


export class RequestUpdateFreelancerPassword implements Action {
  readonly type = freelancersConstants.REQUEST_FREELANCER_PASSWORD;
  constructor(public payload = null) { }
}

export class RequestUpdateFreelancerPasswordComplete implements Action {
  readonly type = freelancersConstants.REQUEST_FREELANCER_PASSWORD_COMPLETE;
  constructor(public payload = null) { }
}

export class RequestUpdateFreelancerPasswordError implements Action {
  readonly type = freelancersConstants.REQUEST_FREELANCER_PASSWORD_ERROR;
  constructor(public payload = null) { }
}

export class RequestFreelancerEvents implements Action {
  readonly type = freelancersConstants.REQUEST_FREELANCER_EVENTS;
  constructor(public payload = null) { }
}

export class RequestFreelancerEventsComplete implements Action {
  readonly type = freelancersConstants.REQUEST_FREELANCER_EVENTS_COMPLETE;
  constructor(public payload = null) { }
}

export class RequestFreelancerEventsError implements Action {
  readonly type = freelancersConstants.REQUEST_FREELANCER_EVENTS_ERROR;
  constructor(public payload = null) { }
}


export type Actions
  = RequestFreelancer
  | RequestNewFreelancer
  | RequestResetFreelancer
  | RequestFreelancerComplete
  | RequestFreelancerError
  | RequestFreelancers
  | RequestFreelancersComplete
  | RequestFreelancersError
  | RequestCreateFreelancer
  | RequestCreateFreelancerComplete
  | RequestCreateFreelancerError
  | RequestUpdateFreelancer
  | RequestUpdateFreelancerComplete
  | RequestUpdateFreelancerError
  | RequestDeleteFreelancer
  | RequestDeleteFreelancerComplete
  | RequestDeleteFreelancerError
  | RequestDeleteFreelancerCanceled
  | RequestUpdateFreelancerProfile
  | RequestUpdateFreelancerProfileComplete
  | RequestUpdateFreelancerProfileError
  | RequestUpdateFreelancerPassword
  | RequestUpdateFreelancerPasswordComplete
  | RequestUpdateFreelancerPasswordError
  | RequestFreelancerEvents
  | RequestFreelancerEventsComplete
  | RequestFreelancerEventsError;
