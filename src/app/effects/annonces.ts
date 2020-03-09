import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Action, Store } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';

import * as annoncesConstants from '../constants/annonces';
import * as annoncesActions from '../actions/annonces';
import { AnnonceService } from '../services';

@Injectable()
export class AnnoncesEffects {
  @Effect()
  requestOauth$: Observable<Action> = this._actions$
    .ofType(annoncesConstants.REQUEST_ANNONCES)
    .map(toPayload)
    .switchMap(params => {
      return this._apisService
        .getAnnonces(params)
        .map(data => new annoncesActions.RequestAnnoncesComplete(data))
        .catch(error => of(new annoncesActions.RequestAnnoncesError(error)));
    });

  @Effect()
  requestGetAnnonce$: Observable<Action> = this._actions$
    .ofType(annoncesConstants.REQUEST_GET_ANNONCE)
    .map(toPayload)
    .switchMap(params => {
      return this._apisService
        .getAnnonce(params)
        .map(data => new annoncesActions.RequestGetAnnonceComplete(data))
        .catch(error => of(new annoncesActions.RequestGetAnnonceError(error)));
    });

  @Effect()
  requestGetAnnoncePremium$: Observable<Action> = this._actions$
    .ofType(annoncesConstants.REQUEST_GET_ANNONCE_PREMIUM)
    .map(toPayload)
    .switchMap(params => {
      return this._apisService
        .getAnnonce(params)
        .map(data => new annoncesActions.RequestGetAnnoncePremiumComplete(data))
        .catch(error =>
          of(new annoncesActions.RequestGetAnnoncePremiumError(error))
        );
    });

  @Effect()
  requestGetAnnoncesEtatStats$: Observable<Action> = this._actions$
    .ofType(annoncesConstants.REQUEST_ANNONCES_STATUS_STATS)
    .map(toPayload)
    .switchMap(params => {
      return this._apisService
        .getAnnoncesStats(params)
        .map(
          data => new annoncesActions.RequestGetAnnoncesEtatStatsComplete(data)
        )
        .catch(error =>
          of(new annoncesActions.RequestGetAnnoncesEtatStatsError(error))
        );
    });

  @Effect()
  requestUpdateAnnonce$: Observable<Action> = this._actions$
    .ofType(annoncesConstants.REQUEST_UPDATE_ANNONCE)
    .map(toPayload)
    .switchMap(params => {
      return this._apisService
        .putAnnonce(params)
        .map(data => {
          let message = 'Votre annonce a été modifié avec succés';
          if (params['etat_type']) {
            if (params['etat_type'] === 1) {
              message = 'Votre annonce a été validée avec succés';
            }
            if (params['etat_type'] === 2) {
              message = 'Votre annonce a été rejetté avec succés';
            }
          }
          const data_bis = data;
          data_bis['message'] = message;
          return new annoncesActions.RequestUpdateAnnonceComplete(data_bis);
        })
        .catch(error =>
          of(new annoncesActions.RequestUpdateAnnonceError(error))
        );
    });

  @Effect()
  requestEditAnnonce$: Observable<Action> = this._actions$
    .ofType(annoncesConstants.REQUEST_EDIT_ANNONCE)
    .map(toPayload)
    .switchMap(params => {
      return this._apisService
        .putAnnonce(params)
        .map(data => new annoncesActions.RequestEditAnnonceComplete(data))
        .catch(error => of(new annoncesActions.RequestEditAnnonceError(error)));
    });

  @Effect()
  requestLinkAnnonce$: Observable<Action> = this._actions$
    .ofType(annoncesConstants.REQUEST_LINK_ANNONCE)
    .map(toPayload)
    .switchMap(params => {
      return this._apisService
        .getAnnonceLink(params)
        .map(data => new annoncesActions.RequestLinkAnnonceComplete(data))
        .catch(error => of(new annoncesActions.RequestLinkAnnonceError(error)));
    });

  @Effect()
  requestCreateAnnonceCollection$: Observable<Action> = this._actions$
    .ofType(annoncesConstants.REQUEST_CREATE_ANNONCE_COLLECTION)
    .map(toPayload)
    .switchMap(params => {
      return this._apisService
        .postAnnonceCollection(params)
        .map(
          data =>
            new annoncesActions.RequestCreateAnnonceCollectionComplete(data)
        )
        .catch(error =>
          of(new annoncesActions.RequestCreateAnnonceCollectionError(error))
        );
    });

  @Effect()
  requestModerateAnnonce$: Observable<Action> = this._actions$
    .ofType(annoncesConstants.REQUEST_MODERATE_ANNONCE)
    .map(toPayload)
    .switchMap(params => {
      return this._apisService
        .moderateAnnonce(params)
        .map(data => new annoncesActions.RequestModerateAnnonceComplete(data))
        .catch(error =>
          of(new annoncesActions.RequestModerateAnnonceError(error))
        );
    });

  @Effect()
  requestCreatePromotion$: Observable<Action> = this._actions$
    .ofType(annoncesConstants.REQUEST_PROMOTION_CREATE)
    .map(toPayload)
    .switchMap(params => {
      return this._apisService
        .postPromotion(params)
        .map(data => {
          if (data['success'] === true) {
            return new annoncesActions.RequestPromotionComplete({
              message: 'Promotion ajouté!',
              success: data['success'],
              id: data['id']
            });
          } else {
            return new annoncesActions.RequestPromotionError(data);
          }
        })
        .catch(error => of(new annoncesActions.RequestPromotionError(error)));
    });

  @Effect()
  requestStopPromotion$: Observable<Action> = this._actions$
    .ofType(annoncesConstants.REQUEST_STOP_PROMOTING)
    .map(toPayload)
    .switchMap(params => {
      return this._apisService
        .stopPromotion(params)
        .map(data => {
          console.log(data);
          if (data['success'] === true) {
            return new annoncesActions.RequestPromotionComplete({
              message: 'Promotion en cours de l\'annonce arretée!',
              success: data['success'],
              id: data['id']
            });
          } else {
            return new annoncesActions.RequestPromotionError(data);
          }
        })
        .catch(error => of(new annoncesActions.RequestPromotionError(error)));
    });

  @Effect()
  requestCancelPromo$: Observable<Action> = this._actions$
    .ofType(annoncesConstants.REQUEST_CANCEL_PROMO)
    .map(toPayload)
    .switchMap(params => {
      return this._apisService
        .cancelPromo(params)
        .map(data => {
          console.log(data);
          if (data['success'] === true) {
            return new annoncesActions.RequestPromotionComplete({
              message: 'Promotion de l\'annonce annulée!',
              success: data['success'],
              id: data['id']
            });
          } else {
            return new annoncesActions.RequestPromotionError(data);
          }
        })
        .catch(error => of(new annoncesActions.RequestPromotionError(error)));
    });

  @Effect()
  requestUploadPicture$: Observable<Action> = this._actions$
    .ofType(annoncesConstants.REQUEST_ANNONCE_PICTURE_UPLOAD)
    .map(toPayload)
    .switchMap(params => {
      return this._apisService
        .updatePicture(params)
        .map(data => new annoncesActions.RequestUpdatePictureAnnonceComplete(data))
        .catch(error =>
          of(new annoncesActions.RequestUpdatePictureAnnonceError(error))
        );
    });


  @Effect()
  requestDeletePicture$: Observable<Action> = this._actions$
    .ofType(annoncesConstants.REQUEST_ANNONCE_PICTURE_DELETE)
    .map(toPayload)
    .switchMap(params => {
      return this._apisService
        .deletePhoto(params)
        .map(data => new annoncesActions.RequestDeletePictureAnnonceComplete(data))
        .catch(error =>
          of(new annoncesActions.RequestDeletePictureAnnonceError(error))
        );
    });


  @Effect()
  requestRefreshCache$: Observable<Action> = this._actions$
    .ofType(annoncesConstants.REQUEST_ANNONCE_REFRESH_CACHE)
    .map(toPayload)
    .switchMap(data => {
      return this._apisService
        .refreshCache()
        .map(data => new annoncesActions.RequestAnnonceRefreshCacheComplete(data))
        .catch(error => of(new annoncesActions.RequestAnnonceRefreshCacheError(error)));
    });

  @Effect()
  searchElement$ : Observable<Action> = this._actions$
  .ofType(annoncesConstants.SEARCH_ELEMENT)
  .map(toPayload)
  .switchMap(payload=> {
    return this._apisService
      .searchAnnonces(payload)
      .map(data =>  new annoncesActions.SearchElementComplete(data))
      .catch(error => of(new annoncesActions.SearchElementError(error)));
  });


  constructor(private _actions$: Actions, private _apisService: AnnonceService) { }
}
