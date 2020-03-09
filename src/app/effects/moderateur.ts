import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Action, Store } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { UUID } from 'angular2-uuid';

import swal from 'sweetalert';
import { ModerateurService } from '../services/moderateur.service';
import * as fromRoot from '../reducers';
import * as moderateursConstants from '../constants/moderateurs';
import * as moderateursActions from '../actions/moderateurs';
import * as notificationsActions from '../actions/notifications';


@Injectable()
export class ModerateursEffects {

  @Effect()
  requestModerateurs$: Observable<Action> = this._actions$
    .ofType(moderateursConstants.REQUEST_MODERATEURS)
    .map(toPayload)
    .switchMap(() => {
      return this._apisService.getModerateurs()
        .map(data => new moderateursActions.RequestModerateursComplete(data))
        .catch(error => of(new moderateursActions.RequestModerateursError(error)));
    });

  @Effect()
  requestGetModerateur$: Observable<Action> = this._actions$
    .ofType(moderateursConstants.REQUEST_MODERATEUR)
    .map(toPayload)
    .switchMap((params) => {
      return this._apisService.getModerateur(params)
        .map(data => new moderateursActions.RequestModerateurComplete(data))
        .catch(error => of(new moderateursActions.RequestModerateurError(error)));
    });

  @Effect()
  createModerateur$: Observable<Action> = this._actions$
    .ofType(moderateursConstants.REQUEST_MODERATEUR_CREATE)
    .map(toPayload)
    .switchMap((params) => {
      return this._apisService.createModerateur(params)
        .map(data => new moderateursActions.RequestCreateModerateurComplete(data))
        .catch(error => of(new moderateursActions.RequestCreateModerateurError(error)));
    });

  @Effect()
  updateModerateur$: Observable<Action> = this._actions$
    .ofType(moderateursConstants.REQUEST_MODERATEUR_UPDATE)
    .map(toPayload)
    .switchMap((params) => {
      return this._apisService.updateModerateur(params)
        .map(data => new moderateursActions.RequestUpdateModerateurComplete(data))
        .catch(error => of(new moderateursActions.RequestUpdateModerateurError(error)));
    });

  @Effect()
  updateProfile$: Observable<Action> = this._actions$
    .ofType(moderateursConstants.REQUEST_MODERATEUR_PROFILE_UPDATE)
    .map(toPayload)
    .switchMap((params) => {
      return this._apisService.updateModerateur(params)
        .map(data => new moderateursActions.RequestUpdateModerateurProfileComplete(data))
        .catch(error => of(new moderateursActions.RequestUpdateModerateurProfileError(error)));
    });

  @Effect()
  updatePassword$: Observable<Action> = this._actions$
    .ofType(moderateursConstants.REQUEST_MODERATEUR_PASSWORD)
    .map(toPayload)
    .switchMap((params) => {
      return this._apisService.updateModerateurPassword(params)
        .map(data => new moderateursActions.RequestUpdateModerateurPasswordComplete(data))
        .catch((error) => of(new moderateursActions.RequestUpdateModerateurPasswordError(error)));
    });

  @Effect()
  deleteModerateur$: Observable<Action> = this._actions$
    .ofType(moderateursConstants.REQUEST_MODERATEUR_DELETE)
    .map(params => {
      swal({
        title: 'Êtes-vous sûr de vouloir effacer cet enregistrement?',
        text: 'Cliquer en dehors de la boite de dialogue pour le fermer.',
        icon: 'error',
        dangerMode: true,
      })
        .then(willDelete => {
          if (willDelete) {
            this._apisService.deleteModerateur(params['payload'])
              .subscribe(
                response => {
                  console.log('response', response);
                  console.log('sucess');
                  this._store.dispatch(new moderateursActions.RequestDeleteModerateurComplete(params));
                },
                error => {
                  console.log(error);
                  console.log('error');
                  this._store.dispatch(new moderateursActions.RequestDeleteModerateurError(error));
                });
            // .map(data => this._store.dispatch(new moderateursActions.RequestDeleteModerateurComplete(data)))
            // .catch(error => of(this._store.dispatch(new moderateursActions.RequestDeleteModerateurError(error))));
          } else {
            this._store.dispatch(new moderateursActions.RequestDeleteModerateurCanceled());
          }
        });
      return new notificationsActions.NotifyUser({
        uuid: UUID.UUID(),
        type: 'success',
        title: 'Succès :-)',
        text: 'Votre annonce a été modifié avec succés!'
      });



    });

  constructor(
    private _actions$: Actions,
    private _store: Store<fromRoot.State>,
    private _apisService: ModerateurService) { }

}
