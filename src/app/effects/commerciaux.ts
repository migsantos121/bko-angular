// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/catch';
//
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
//
// import {Action, Store} from '@ngrx/store';
// import { Effect, Actions, toPayload } from '@ngrx/effects';
// import { of } from 'rxjs/observable/of';
//
//
// import { ApisService } from '../services/apis.service';
// import * as fromRoot from '../reducers';
// import * as commerciauxConstants from '../constants/commerciaux';
// import * as commerciauxActions from '../actions/commerciaux';
//
//
// @Injectable()
// export class CommerciauxEffects {
//
//   constructor (
//     private _actions$: Actions,
//     private _store: Store<fromRoot.State>,
//     private _apisService: ApisService) {}
//
//   @Effect()
//   requestCommercial$: Observable<Action> = this._actions$
//     .ofType(commerciauxConstants.REQUEST_COMMERCIAL)
//     .map(toPayload)
//     .switchMap((params) => {
//       return this._apisService.getCommercial(params)
//         .map(data => new commerciauxActions.RequestCommercialComplete(data))
//         .catch(error => of (new commerciauxActions.RequestCommercialError(error)))
//     });
//
//   @Effect()
//   requestCommerciaux$: Observable<Action> = this._actions$
//     .ofType(commerciauxConstants.REQUEST_COMMERCIAUX)
//     .map(toPayload)
//     .switchMap((params) => {
//       return this._apisService.getCommerciaux(params)
//         .map(data => new commerciauxActions.RequestCommerciauxComplete(data))
//         .catch(error => of (new commerciauxActions.RequestCommerciauxError(error)))
//     });
//
//   @Effect()
//   requestCreateCommercial$: Observable<Action> = this._actions$
//     .ofType(commerciauxConstants.REQUEST_COMMERCIAL_CREATE)
//     .map(toPayload)
//     .switchMap((params) => {
//       return this._apisService.postCommercial(params)
//         .map(data => new commerciauxActions.RequestCommerciauxCreateComplete(data))
//         .catch(error => of (new commerciauxActions.RequestCommerciauxCreateError(error)))
//     });
//
//   @Effect()
//   requestUpdateCommerciaux$: Observable<Action> = this._actions$
//     .ofType(commerciauxConstants.REQUEST_COMMERCIAL_UPDATE)
//     .map(toPayload)
//     .switchMap((params) => {
//       return this._apisService.putCommercial(params)
//         .map(data => new commerciauxActions.RequestCommerciauxUpdateComplete(data))
//         .catch(error => of (new commerciauxActions.RequestCommerciauxUpdateError(error)))
//     });
//
//   @Effect()
//   requestDeleteCommerciaux$: Observable<Action> = this._actions$
//     .ofType(commerciauxConstants.REQUEST_COMMERCIAL_DELETE)
//     .map(toPayload)
//     .switchMap((params) => {
//       return this._apisService.deleteCommercial(params)
//         .map(data => new commerciauxActions.RequestCommerciauxDeleteComplete(params))
//         .catch(error => of (new commerciauxActions.RequestCommerciauxDeleteError(error)))
//     });
//
//
//
// }
