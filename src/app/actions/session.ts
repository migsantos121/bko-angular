import { Action } from '@ngrx/store';

import * as sessionConstants from '../constants/sessions';

export class RequestOauthAction implements Action {
  readonly type = sessionConstants.REQUEST_OAUTH;
  constructor(public payload: Object) { }
}

export class RequestOauthCompleteAction implements Action {
  readonly type = sessionConstants.REQUEST_OAUTH_COMPLETE;
  constructor(public payload: Object) { }
}

export class RequestOauthErrorAction implements Action {
  readonly type = sessionConstants.REQUEST_OAUTH_ERROR;
  constructor(public payload: Object) { }
}

export class RequestDestroyOauthAction implements Action {
  type = sessionConstants.REQUEST_DESTROY_OAUTH;
  constructor(public payload: Object) { }
}

export class RequestDestroyOauthCompleteAction implements Action {
  type = sessionConstants.REQUEST_DESTROY_OAUTH_COMPLETE;
  constructor(public payload: Object) { }
}

export class RequestDestroyOauthErrorAction implements Action {
  type = sessionConstants.REQUEST_DESTROY_OAUTH_ERROR;
  constructor(public payload: Object) { }
}

export class RequestGetCurrentUserAction implements Action {
  readonly type = sessionConstants.REQUEST_CURRENT_USER;
  constructor(public payload: Object = {}) { }
}

export class RequestGetCurrentUserCompleteAction implements Action {
  readonly type = sessionConstants.REQUEST_CURRENT_USER_COMPLETE;
  constructor(public payload: Object) { }
}

export class RequestGetCurrentUserErrorAction implements Action {
  readonly type = sessionConstants.REQUEST_CURRENT_USER_ERROR;
  constructor(public payload: Object) { }
}

export class RequestUpdateAccountAction implements Action {
  readonly type = sessionConstants.REQUEST_UPDATE_ACCOUNT;
  constructor(public payload: Object) { }
}

export class RequestUpdateAccountCompleteAction implements Action {
  readonly type = sessionConstants.REQUEST_UPDATE_ACCOUNT_COMPLETE;
  constructor(public payload: Object) { }
}

export class RequestUpdateAccountErrorAction implements Action {
  readonly type = sessionConstants.REQUEST_UPDATE_ACCOUNT_ERROR;
  constructor(public payload: Object) { }
}

export class RequestChangePasswordAction implements Action {
  readonly type = sessionConstants.REQUEST_CHANGE_PASSWORD;
  constructor(public payload: Object) { }
}

export class RequestChangePasswordCompleteAction implements Action {
  readonly type = sessionConstants.REQUEST_CHANGE_PASSWORD_COMPLETE;
  constructor(public payload: Object) { }
}

export class RequestChangePasswordErrorAction implements Action {
  readonly type = sessionConstants.REQUEST_CHANGE_PASSWORD_ERROR;
  constructor(public payload: Object) { }
}

export class RequestRefreshTokenAction implements Action {
  readonly type = sessionConstants.REQUEST_REFRESH_TOKEN;
  constructor(public payload: Object = {}) { }
}

export class RequestRefreshTokenCompleteAction implements Action {
  readonly type = sessionConstants.REQUEST_REFRESH_TOKEN_COMPLETE;
  constructor(public payload: Object = {}) { }
}

export class RequestRecoverPasswordAction implements Action {
  readonly type = sessionConstants.REQUEST_RECOVER_PASSWORD;
  constructor(public payload: Object = {}) { }
}

export class RequestRecoverPasswordCompleteAction implements Action {
  readonly type = sessionConstants.REQUEST_RECOVER_PASSWORD_COMPLETE;
  constructor(public payload: Object = {}) { }
}

export class RequestRecoverPasswordErrorAction implements Action {
  readonly type = sessionConstants.REQUEST_RECOVER_PASSWORD_ERROR;
  constructor(public payload: Object = {}) { }
}

export type Actions
  = RequestOauthAction
  | RequestOauthCompleteAction
  | RequestOauthErrorAction
  | RequestDestroyOauthAction
  | RequestDestroyOauthCompleteAction
  | RequestDestroyOauthErrorAction
  | RequestGetCurrentUserAction
  | RequestGetCurrentUserCompleteAction
  | RequestGetCurrentUserErrorAction
  | RequestUpdateAccountAction
  | RequestUpdateAccountCompleteAction
  | RequestUpdateAccountErrorAction
  | RequestChangePasswordAction
  | RequestChangePasswordCompleteAction
  | RequestChangePasswordErrorAction
  | RequestRefreshTokenAction
  | RequestRecoverPasswordAction
  | RequestRecoverPasswordAction
  | RequestRecoverPasswordCompleteAction
  | RequestRecoverPasswordErrorAction;
