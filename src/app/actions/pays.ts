import { Action } from '@ngrx/store';

import * as paysConstants from '../constants/pays';


export class RequestPays implements Action {
  readonly type = paysConstants.REQUEST_PAYS;
  constructor(public payload = null) { }
}

export class RequestPaysComplete implements Action {
  readonly type = paysConstants.REQUEST_PAYS_COMPLETE;
  constructor(public payload = null) { }
}

export class RequestPaysError implements Action {
  readonly type = paysConstants.REQUEST_PAYS_ERROR;
  constructor(public payload = null) { }
}

export class RequestResetPaysComplete implements Action {
  readonly type = paysConstants.REQUEST_RESET_PAYS_COMPLETE;
  constructor(public payload = {}) { }
}


export class RequestPaysCreate implements Action {
  readonly type = paysConstants.REQUEST_PAYS_CREATE;
  constructor(public payload = null) { }
}

export class RequestPaysCreateComplete implements Action {
  readonly type = paysConstants.REQUEST_PAYS_CREATE_COMPLETE;
  constructor(public payload = null) { }
}

export class RequestPaysCreateError implements Action {
  readonly type = paysConstants.REQUEST_PAYS_CREATE_ERROR;
  constructor(public payload = null) { }
}

export class RequestPaysUpdate implements Action {
  readonly type = paysConstants.REQUEST_PAYS_UPDATE;
  constructor(public payload = null) { }
}

export class RequestPaysUpdateComplete implements Action {
  readonly type = paysConstants.REQUEST_PAYS_UPDATE_COMPLETE;
  constructor(public payload = null) { }
}

export class RequestPaysUpdateError implements Action {
  readonly type = paysConstants.REQUEST_PAYS_UPDATE_ERROR;
  constructor(public payload = null) { }
}

export class RequestPaysDelete implements Action {
  readonly type = paysConstants.REQUEST_PAYS_DELETE;
  constructor(public payload = null) { }
}

export class RequestPaysDeleteComplete implements Action {
  readonly type = paysConstants.REQUEST_PAYS_DELETE_COMPLETE;
  constructor(public payload = null) { }
}

export class RequestPaysDeleteError implements Action {
  readonly type = paysConstants.REQUEST_PAYS_DELETE_ERROR;
  constructor(public payload = null) { }
}


export type Actions
  =
  RequestPays
  | RequestPaysComplete
  | RequestPaysError
  | RequestPaysComplete
  | RequestPaysCreate
  | RequestPaysCreateComplete
  | RequestPaysCreateError
  | RequestPaysUpdate
  | RequestPaysUpdateComplete
  | RequestPaysUpdateError
  | RequestPaysDelete
  | RequestPaysDeleteComplete
  | RequestPaysDeleteError
  | RequestResetPaysComplete;
