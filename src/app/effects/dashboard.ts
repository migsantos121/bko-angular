import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Action, Store } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';

import { ApisService } from '../services/apis.service';
import * as dashboardConstants from '../constants/dashboard';
import * as dashboardActions from '../actions/dashboard';
import * as fromRoot from '../reducers';

@Injectable()
export class DashboardEffects {

  @Effect()
  requestDashboardKeyword$: Observable<Action> = this._actions$
    .ofType(dashboardConstants.REQUEST_CHART_KEYWORD)
    .map(toPayload)
    .switchMap(() => {
      return this._apisService
        .getKeywordsCloud()
        .map(data => new dashboardActions.RequestChartKeywordComplete(data))
        .catch(error => of(new dashboardActions.RequestChartKeywordError(error)));
    });

  @Effect()
  requestDashboardData$: Observable<Action> = this._actions$
    .ofType(dashboardConstants.REQUEST_CHART_DATA)
    .map(toPayload)
    .switchMap(() => {
      return this._apisService
        .getDashboardData()
        .map(data => new dashboardActions.RequestChartDataComplete(data))
        .catch(error => of(new dashboardActions.RequestChartDataError(error)));
    });

  constructor(
    private _actions$: Actions,
    private _store: Store<fromRoot.State>,
    private _apisService: ApisService
  ) { }
}
