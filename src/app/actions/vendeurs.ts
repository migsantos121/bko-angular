import { Action } from '@ngrx/store';

import * as vendeursConstants from '../constants/vendeurs';

export class RequestVendeur implements Action {
  readonly type = vendeursConstants.REQUEST_VENDEUR;
  constructor(public payload = null) { }
}

export class RequestVendeurComplete implements Action {
  readonly type = vendeursConstants.REQUEST_VENDEUR_COMPLETE;
  constructor(public payload = null) { }
}

export class RequestVendeurError implements Action {
  readonly type = vendeursConstants.REQUEST_VENDEUR_ERROR;
  constructor(public payload = null) { }
}

export class RequestResetVendeurComplete implements Action {
  readonly type = vendeursConstants.REQUEST_RESET_VENDEUR_COMPLETE;
  constructor(public payload = {}) { }
}

export class RequestVendeurs implements Action {
  readonly type = vendeursConstants.REQUEST_VENDEURS;
  constructor(public payload = null) { }
}

export class RequestVendeursComplete implements Action {
  readonly type = vendeursConstants.REQUEST_VENDEURS_COMPLETE;
  constructor(public payload = null) { }
}

export class RequestVendeursError implements Action {
  readonly type = vendeursConstants.REQUEST_VENDEURS_ERROR;
  constructor(public payload = null) { }
}


export class RequestVendeursExport implements Action {
  readonly type = vendeursConstants.REQUEST_VENDEURS_EXPORT;
  constructor(public payload = null) { }
}

export class RequestVendeursExportComplete implements Action {
  readonly type = vendeursConstants.REQUEST_VENDEURS_EXPORT_COMPLETE;
  constructor(public payload = null) { }
}

export class RequestVendeursExportError implements Action {
  readonly type = vendeursConstants.REQUEST_VENDEURS_EXPORT_ERROR;
  constructor(public payload = null) { }
}

export class RequestVendeurCreate implements Action {
  readonly type = vendeursConstants.REQUEST_VENDEUR_CREATE;
  constructor(public payload = null) { }
}

export class RequestVendeurCreateComplete implements Action {
  readonly type = vendeursConstants.REQUEST_VENDEUR_CREATE_COMPLETE;
  constructor(public payload = null) { }
}

export class RequestVendeurCreateError implements Action {
  readonly type = vendeursConstants.REQUEST_VENDEUR_CREATE_ERROR;
  constructor(public payload = null) { }
}

export class RequestVendeurUpdate implements Action {
  readonly type = vendeursConstants.REQUEST_VENDEUR_UPDATE;
  constructor(public payload = null) { }
}

export class RequestVendeurUpdateComplete implements Action {
  readonly type = vendeursConstants.REQUEST_VENDEUR_UPDATE_COMPLETE;
  constructor(public payload = null) { }
}

export class RequestVendeurUpdateError implements Action {
  readonly type = vendeursConstants.REQUEST_VENDEUR_UPDATE_ERROR;
  constructor(public payload = null) { }
}

export class RequestVendeurDelete implements Action {
  readonly type = vendeursConstants.REQUEST_VENDEUR_DELETE;
  constructor(public payload = null) { }
}

export class RequestVendeurDeleteComplete implements Action {
  readonly type = vendeursConstants.REQUEST_VENDEUR_DELETE_COMPLETE;
  constructor(public payload = null) { }
}

export class RequestVendeurDeleteError implements Action {
  readonly type = vendeursConstants.REQUEST_VENDEUR_DELETE_ERROR;
  constructor(public payload = null) { }
}

export class RequestVendeursNext implements Action {
  readonly type = vendeursConstants.REQUEST_VENDEURS_NEXT;
  constructor(public payload = null) { }
}

export class RequestVendeursNextComplete implements Action {
  readonly type = vendeursConstants.REQUEST_VENDEURS_NEXT_COMPLETE;
  constructor(public payload = null) { }
}

export class RequestVendeursNextError implements Action {
  readonly type = vendeursConstants.REQUEST_VENDEURS_NEXT_ERROR;
  constructor(public payload = null) { }
}

export class RequestVendeursPrev implements Action {
  readonly type = vendeursConstants.REQUEST_VENDEURS_PREV;
  constructor(public payload = null) { }
}

export class RequestVendeursPrevComplete implements Action {
  readonly type = vendeursConstants.REQUEST_VENDEURS_PREV_COMPLETE;
  constructor(public payload = null) { }
}

export class RequestVendeursPrevError implements Action {
  readonly type = vendeursConstants.REQUEST_VENDEURS_PREV_ERROR;
  constructor(public payload = null) { }
}

export type Actions =
  | RequestVendeur
  | RequestVendeurComplete
  | RequestVendeurError
  | RequestVendeurs
  | RequestVendeursComplete
  | RequestVendeursError
  | RequestVendeursExport
  | RequestVendeursExportComplete
  | RequestVendeursExportError
  | RequestVendeurCreate
  | RequestVendeurCreateComplete
  | RequestVendeurCreateError
  | RequestVendeurUpdate
  | RequestVendeurUpdateComplete
  | RequestVendeurUpdateError
  | RequestVendeurDelete
  | RequestVendeurDeleteComplete
  | RequestVendeurDeleteError
  | RequestResetVendeurComplete;
