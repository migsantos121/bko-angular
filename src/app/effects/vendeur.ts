import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Action, Store } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';

import * as vendeursConstants from '../constants/vendeurs';
import * as vendeursActions from '../actions/vendeurs';
import * as fromRoot from '../reducers';
import { VendeurService } from '../services';

@Injectable()
export class VendeursEffects {


  @Effect()
  requestVendeur$: Observable<Action> = this._actions$
    .ofType(vendeursConstants.REQUEST_VENDEUR)
    .map(toPayload)
    .switchMap(params => {
      return this._apisService
        .getVendeur(params)
        .map(data => new vendeursActions.RequestVendeurComplete(data))
        .catch(error => of(new vendeursActions.RequestVendeurError(error)));
    });

  @Effect()
  requestVendeurs$: Observable<Action> = this._actions$
    .ofType(vendeursConstants.REQUEST_VENDEURS)
    .map(toPayload)
    .switchMap(params => {
      return this._apisService
        .getVendeurs(params)
        .map(data => new vendeursActions.RequestVendeursComplete(data))
        .catch(error => of(new vendeursActions.RequestVendeursError(error)));
    });

  @Effect()
  requestVendeursExport$: Observable<Action> = this._actions$
    .ofType(vendeursConstants.REQUEST_VENDEURS_EXPORT)
    .map(toPayload)
    .switchMap(params => {
      return this._apisService
        .getVendeursExport(params)
        .map(data => new vendeursActions.RequestVendeursExportComplete(data))
        .catch(error => of(new vendeursActions.RequestVendeursExportError(error)));
    });

  @Effect()
  requestUpdateVendeurs$: Observable<Action> = this._actions$
    .ofType(vendeursConstants.REQUEST_VENDEUR_UPDATE)
    .map(toPayload)
    .switchMap(params => {
      return this._apisService
        .putVendeur(params)
        .map(data => new vendeursActions.RequestVendeurUpdateComplete(data))
        .catch(error =>
          of(new vendeursActions.RequestVendeurUpdateError(error))
        );
    });

  constructor(
    private _actions$: Actions,
    private _store: Store<fromRoot.State>,
    private _apisService: VendeurService
  ) { }
}
