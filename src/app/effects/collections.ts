import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Action, Store } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';

import { ApisService } from '../services/apis.service';
import * as collectionsConstants from '../constants/collections';
import * as collectionsActions from '../actions/collections';
import * as fromRoot from '../reducers';
import { CollectionService } from '../services';


@Injectable()
export class CollectionsEffects {

  @Effect()
  requestCollections$: Observable<Action> = this._actions$
    .ofType(collectionsConstants.REQUEST_COLLECTIONS)
    .map(toPayload)
    .switchMap((params) => {
      return this._apisService.getCollections(params)
        .map(data => new collectionsActions.RequestCollectionsComplete(data))
        .catch(error => of(new collectionsActions.RequestCollectionsError(error)));
    });

  @Effect()
  requestCreateCollection$: Observable<Action> = this._actions$
    .ofType(collectionsConstants.REQUEST_COLLECTION_CREATE)
    .map(toPayload)
    .switchMap((params) => {
      console.log(params);
      return this._apisService.postCollection(params)
        .map(data => new collectionsActions.RequestCollectionsCreateComplete(data))
        .catch(error => of(new collectionsActions.RequestCollectionsCreateError(error)));
    });

  @Effect()
  requestGetCollection$: Observable<Action> = this._actions$
    .ofType(collectionsConstants.REQUEST_COLLECTION)
    .map(toPayload)
    .switchMap((params) => {
      return this._apisService
        .getCollection(params)
        .map(data => new collectionsActions.RequestCollectionComplete(data))
        .catch(error => of(new collectionsActions.RequestCollectionError(error)));
    });

  @Effect()
  requestUpdateCollection$: Observable<Action> = this._actions$
    .ofType(collectionsConstants.REQUEST_COLLECTION_UPDATE)
    .map(toPayload)
    .switchMap((params) => {
      console.log(params);
      return this._apisService.putCollection(params)
        .map(data => new collectionsActions.RequestCollectionsUpdateComplete(data))
        .catch(error => of(new collectionsActions.RequestCollectionsUpdateError(error)));
    });
  @Effect()
  requestDeleteCollection$: Observable<Action> = this._actions$
    .ofType(collectionsConstants.REQUEST_COLLECTION_DELETE)
    .map(toPayload)
    .switchMap((params) => {
      console.log(params);
      return this._apisService.deleteCollection(params)
        .map(data => new collectionsActions.RequestCollectionsDeleteComplete(data))
        .catch(error => of(new collectionsActions.RequestCollectionsDeleteError(error)));
    });
  @Effect()
  requestDeleteAnnonceFromCollection$: Observable<Action> = this._actions$
    .ofType(collectionsConstants.REQUEST_DELETE_ANNONCE_FROM_COLLECTION)
    .map(toPayload)
    .switchMap(params => {
      return this._apisService
        .deleteAnnonceFromCollection(params)
        .map(data => {
          console.log(data);
          return new collectionsActions.RequestDeleteAnnonceFromCollectionComplete(data)
        })
        .catch(error => of(new collectionsActions.RequestDeleteAnnonceFromCollectionError(error)));
    });
  
  constructor(
    private _actions$: Actions,
    private _store: Store<fromRoot.State>,
    private _apisService: CollectionService) { }
}
