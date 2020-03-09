import { Action } from '@ngrx/store';

import * as moderateursConstants from '../constants/moderateurs';

export class RequestModerateur implements Action {
  readonly type = moderateursConstants.REQUEST_MODERATEUR;
  constructor(public payload = null) { }
}

export class RequestNewModerateur implements Action {
  readonly type = moderateursConstants.REQUEST_NEW_MODERATEUR;
  constructor(public payload = null) { }
}

export class RequestResetModerateur implements Action {
  readonly type = moderateursConstants.REQUEST_RESET_MODERATEUR;
  constructor(public payload = null) { }
}

export class RequestModerateurComplete implements Action {
  readonly type = moderateursConstants.REQUEST_MODERATEUR_COMPLETE;
  constructor(public payload = null) { }
}


export class RequestModerateurError implements Action {
  readonly type = moderateursConstants.REQUEST_MODERATEUR_ERROR;
  constructor(public payload = null) { }
}


export class RequestModerateurs implements Action {
  readonly type = moderateursConstants.REQUEST_MODERATEURS;
  constructor(public payload = null) { }
}

export class RequestModerateursComplete implements Action {
  readonly type = moderateursConstants.REQUEST_MODERATEURS_COMPLETE;
  constructor(public payload = null) { }
}

export class RequestModerateursError implements Action {
  readonly type = moderateursConstants.REQUEST_MODERATEURS_ERROR;
  constructor(public payload = null) { }
}


export class RequestCreateModerateur implements Action {
  readonly type = moderateursConstants.REQUEST_MODERATEUR_CREATE;
  constructor(public payload = null) { }
}

export class RequestCreateModerateurComplete implements Action {
  readonly type = moderateursConstants.REQUEST_MODERATEUR_CREATE_COMPLETE;
  constructor(public payload = null) { }
}

export class RequestCreateModerateurError implements Action {
  readonly type = moderateursConstants.REQUEST_MODERATEUR_CREATE_ERROR;
  constructor(public payload = null) { }
}

export class RequestUpdateModerateur implements Action {
  readonly type = moderateursConstants.REQUEST_MODERATEUR_UPDATE;
  constructor(public payload = null) { }
}

export class RequestUpdateModerateurComplete implements Action {
  readonly type = moderateursConstants.REQUEST_MODERATEUR_UPDATE_COMPLETE;
  constructor(public payload = null) { }
}

export class RequestUpdateModerateurError implements Action {
  readonly type = moderateursConstants.REQUEST_MODERATEUR_UPDATE_ERROR;
  constructor(public payload = null) { }
}

export class RequestUpdateModerateurProfile implements Action {
  readonly type = moderateursConstants.REQUEST_MODERATEUR_PROFILE_UPDATE;
  constructor(public payload = null) { }
}

export class RequestUpdateModerateurProfileComplete implements Action {
  readonly type = moderateursConstants.REQUEST_MODERATEUR_PROFILE_UPDATE_COMPLETE;
  constructor(public payload = null) { }
}

export class RequestUpdateModerateurProfileError implements Action {
  readonly type = moderateursConstants.REQUEST_MODERATEUR_PROFILE_UPDATE_ERROR;
  constructor(public payload = null) { }
}

export class RequestDeleteModerateur implements Action {
  readonly type = moderateursConstants.REQUEST_MODERATEUR_DELETE;
  constructor(public payload = null) { }
}

export class RequestDeleteModerateurComplete implements Action {
  readonly type = moderateursConstants.REQUEST_MODERATEUR_DELETE_COMPLETE;
  constructor(public payload = null) { }
}

export class RequestDeleteModerateurError implements Action {
  readonly type = moderateursConstants.REQUEST_MODERATEUR_DELETE_ERROR;
  constructor(public payload = null) { }
}

export class RequestDeleteModerateurCanceled implements Action {
  readonly type = moderateursConstants.REQUEST_MODERATEUR_DELETE_CANCELED;
  constructor(public payload = null) { }
}


export class RequestUpdateModerateurPassword implements Action {
  readonly type = moderateursConstants.REQUEST_MODERATEUR_PASSWORD;
  constructor(public payload = null) { }
}

export class RequestUpdateModerateurPasswordComplete implements Action {
  readonly type = moderateursConstants.REQUEST_MODERATEUR_PASSWORD_COMPLETE;
  constructor(public payload = null) { }
}

export class RequestUpdateModerateurPasswordError implements Action {
  readonly type = moderateursConstants.REQUEST_MODERATEUR_PASSWORD_ERROR;
  constructor(public payload = null) { }
}


export type Actions
  = RequestModerateur
  | RequestNewModerateur
  | RequestResetModerateur
  | RequestModerateurComplete
  | RequestModerateurError
  | RequestModerateurs
  | RequestModerateursComplete
  | RequestModerateursError
  | RequestCreateModerateur
  | RequestCreateModerateurComplete
  | RequestCreateModerateurError
  | RequestUpdateModerateur
  | RequestUpdateModerateurComplete
  | RequestUpdateModerateurError
  | RequestDeleteModerateur
  | RequestDeleteModerateurComplete
  | RequestDeleteModerateurError
  | RequestDeleteModerateurCanceled
  | RequestUpdateModerateurProfile
  | RequestUpdateModerateurProfileComplete
  | RequestUpdateModerateurProfileError
  | RequestUpdateModerateurPassword
  | RequestUpdateModerateurPasswordComplete
  | RequestUpdateModerateurPasswordError;
