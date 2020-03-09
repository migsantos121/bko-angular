import { Action } from '@ngrx/store';

import * as commerciauxConstants from '../constants/commerciaux';


export class RequestCommercial implements Action {
  readonly type = commerciauxConstants.REQUEST_COMMERCIAL;
  constructor(public payload = null) { }
}

export class RequestCommercialComplete implements Action {
  readonly type = commerciauxConstants.REQUEST_COMMERCIAL_COMPLETE;
  constructor(public payload = null) { }
}

export class RequestCommercialError implements Action {
  readonly type = commerciauxConstants.REQUEST_COMMERCIAL_ERROR;
  constructor(public payload = null) { }
}

export class RequestResetCommercialComplete implements Action {
  readonly type = commerciauxConstants.REQUEST_RESET_COMMERCIAL_COMPLETE;
  constructor(public payload = {}) { }
}

export class RequestCommerciaux implements Action {
  readonly type = commerciauxConstants.REQUEST_COMMERCIAUX;
  constructor(public payload = null) { }
}

export class RequestCommerciauxComplete implements Action {
  readonly type = commerciauxConstants.REQUEST_COMMERCIAUX_COMPLETE;
  constructor(public payload = null) { }
}

export class RequestCommerciauxError implements Action {
  readonly type = commerciauxConstants.REQUEST_COMMERCIAUX_ERROR;
  constructor(public payload = null) { }
}

export class RequestCommercialCreate implements Action {
  readonly type = commerciauxConstants.REQUEST_COMMERCIAL_CREATE;
  constructor(public payload = null) { }
}

export class RequestCommercialCreateComplete implements Action {
  readonly type = commerciauxConstants.REQUEST_COMMERCIAL_CREATE_COMPLETE;
  constructor(public payload = null) { }
}

export class RequestCommercialCreateError implements Action {
  readonly type = commerciauxConstants.REQUEST_COMMERCIAL_CREATE_ERROR;
  constructor(public payload = null) { }
}

export class RequestCommercialUpdate implements Action {
  readonly type = commerciauxConstants.REQUEST_COMMERCIAL_UPDATE;
  constructor(public payload = null) { }
}

export class RequestCommercialUpdateComplete implements Action {
  readonly type = commerciauxConstants.REQUEST_COMMERCIAL_UPDATE_COMPLETE;
  constructor(public payload = null) { }
}

export class RequestCommercialUpdateError implements Action {
  readonly type = commerciauxConstants.REQUEST_COMMERCIAL_UPDATE_ERROR;
  constructor(public payload = null) { }
}

export class RequestCommercialDelete implements Action {
  readonly type = commerciauxConstants.REQUEST_COMMERCIAL_DELETE;
  constructor(public payload = null) { }
}

export class RequestCommercialDeleteComplete implements Action {
  readonly type = commerciauxConstants.REQUEST_COMMERCIAL_DELETE_COMPLETE;
  constructor(public payload = null) { }
}

export class RequestCommercialDeleteError implements Action {
  readonly type = commerciauxConstants.REQUEST_COMMERCIAL_DELETE_ERROR;
  constructor(public payload = null) { }
}


export type Actions
  =
  RequestCommercial
  | RequestCommercialComplete
  | RequestCommercialError
  | RequestCommerciaux
  | RequestCommerciauxComplete
  | RequestCommerciauxError
  | RequestCommercialCreate
  | RequestCommercialCreateComplete
  | RequestCommercialCreateError
  | RequestCommercialUpdate
  | RequestCommercialUpdateComplete
  | RequestCommercialUpdateError
  | RequestCommercialDelete
  | RequestCommercialDeleteComplete
  | RequestCommercialDeleteError
  | RequestResetCommercialComplete;
