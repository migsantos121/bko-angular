import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Action, Store } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';

import { ApisService } from '../services/apis.service';
import * as categoriesConstants from '../constants/categories';
import * as categoriesActions from '../actions/categories';
import * as fromRoot from '../reducers';
import { CategorieService } from '../services';


@Injectable()
export class CategoriesEffects {

  @Effect()
  requestCategorie$: Observable<Action> = this._actions$
    .ofType(categoriesConstants.REQUEST_CATEGORIE)
    .map(toPayload)
    .switchMap((params) => {
      return this._apisService.getCategorie(params)
        .map(data => new categoriesActions.RequestCategorieComplete(data))
        .catch(error => of(new categoriesActions.RequestCategorieError(error)));
    });

  @Effect()
  requestCategories$: Observable<Action> = this._actions$
    .ofType(categoriesConstants.REQUEST_CATEGORIES)
    .map(toPayload)
    .switchMap((params) => {
      return this._apisService
        .getCategories()
        .map(data => new categoriesActions.RequestCategoriesComplete(data))
        .catch(error => of(new categoriesActions.RequestCategoriesError(error)));
    });



  @Effect()
  requestCreateCategorie$: Observable<Action> = this._actions$
    .ofType(categoriesConstants.REQUEST_CATEGORIE_CREATE)
    .map(toPayload)
    .switchMap((params) => {
      return this._apisService.postCategorie(params)
        .map(data => new categoriesActions.RequestCategoriesCreateComplete(data))
        .catch(error => of(new categoriesActions.RequestCategoriesCreateError(error)));
    });

  @Effect()
  requestUpdateCategories$: Observable<Action> = this._actions$
    .ofType(categoriesConstants.REQUEST_CATEGORIE_UPDATE)
    .map(toPayload)
    .switchMap((params) => {
      return this._apisService.putCategorie(params)
        .map(data => new categoriesActions.RequestCategoriesUpdateComplete(data))
        .catch(error => of(new categoriesActions.RequestCategoriesUpdateError(error)));
    });

  @Effect()
  requestDeleteCategories$: Observable<Action> = this._actions$
    .ofType(categoriesConstants.REQUEST_CATEGORIE_DELETE)
    .map(toPayload)
    .switchMap((params) => {
      return this._apisService.deleteCategorie(params)
        .map(data => new categoriesActions.RequestCategoriesDeleteComplete(params))
        .catch(error => of(new categoriesActions.RequestCategoriesDeleteError(error)));
    });

  constructor(
    private _actions$: Actions,
    private _store: Store<fromRoot.State>,
    private _apisService: CategorieService) { }

}
