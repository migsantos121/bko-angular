import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { go } from '@ngrx/router-store';
// import * as jwtDecode from 'jwt-decode';

import { ApisService } from '../services/apis.service';
import * as sessionConstants from '../constants/sessions';
import * as sessionActions from '../actions/session';
import * as fromRoot from '../reducers';
import { SessionService } from '../services';
const jwtDecode = require('jwt-decode');

@Injectable()
export class SessionEffects {

  @Effect()
  requestOauth$: Observable<Action> = this._actions$
    .ofType(sessionConstants.REQUEST_OAUTH)
    .map(toPayload)
    .switchMap((params) => {
      return this._apisService.postOauth(params)
        .map((data) => {
          const parsedToken = jwtDecode(data['auth_token']);
          if (data.auth_token && data.status === 'success') {
            localStorage.setItem('bo::token', data.auth_token);
            localStorage.setItem('bo::token_expire', parsedToken.exp);
            localStorage.setItem('bo::role', parsedToken.role);
            localStorage.setItem('bo::user_id', parsedToken.sub);
            localStorage.setItem('bo::user', JSON.stringify(parsedToken));
            const user = data.parsedToken;
            return new sessionActions.RequestOauthCompleteAction(user);
          } else return new sessionActions.RequestOauthErrorAction(data);
        })
        .catch((error) => of(new sessionActions.RequestOauthErrorAction(error)));
    });


  @Effect()
  destroyOauth$: Observable<Action> = this._actions$
    .ofType(sessionConstants.REQUEST_DESTROY_OAUTH)
    .map(toPayload)
    .switchMap(() => {
      return this._apisService.destroyAuth()
        .map(() => {
          localStorage.clear();
          this._store.dispatch(go(['sign_in']));
          return new sessionActions.RequestDestroyOauthCompleteAction({});
        })
        .catch((error) => of(new sessionActions.RequestDestroyOauthErrorAction(error)));
    });



  constructor(private _actions$: Actions,
    private _apisService: SessionService,
    private _store: Store<fromRoot.State>) { }
}
