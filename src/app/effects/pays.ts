import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Action, Store } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';

import { ApisService } from '../services/apis.service';
import * as paysConstants from '../constants/pays';
import * as paysActions from '../actions/pays';
import * as fromRoot from '../reducers';


@Injectable()
export class PaysEffects {

  @Effect()
  requestPays$: Observable<Action> = this._actions$
    .ofType(paysConstants.REQUEST_PAYS)
    .map(toPayload)
    .switchMap((params) => {
      return this._apisService.getPays()
        .map(data => new paysActions.RequestPaysComplete(data))
        .catch(error => of(new paysActions.RequestPaysError(error)));
    });

  constructor(
    private _actions$: Actions,
    private _store: Store<fromRoot.State>,
    private _apisService: ApisService) { }

}
