import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Action, Store } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';

import * as activitesConstants from '../constants/activite';
import * as activitesActions from '../actions/activites';
import * as fromRoot from '../reducers';
import { VendeurService } from '../services';

@Injectable()
export class ActivitesEffects {


  @Effect()
  requestActivites$: Observable<Action> = this._actions$
    .ofType(activitesConstants.REQUEST_ACTIVITES)
    .map(toPayload)
    .switchMap(params => {
      return this._apisService
        .getActivites(params)
        .map(data => new activitesActions.RequestActivitesComplete(data))
        .catch(error => of(new activitesActions.RequestActivitesError(error)));
    });

  constructor(
    private _actions$: Actions,
    private _store: Store<fromRoot.State>,
    private _apisService: VendeurService
  ) { }
}
