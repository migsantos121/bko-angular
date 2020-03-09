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
import * as freelancersConstants from '../constants/freelancers';
import * as freelancersActions from '../actions/freelancers';
import * as notificationsActions from '../actions/notifications';


@Injectable()
export class FreelancersEffects {

  @Effect()
  requestFreelancers$: Observable<Action> = this._actions$
    .ofType(freelancersConstants.REQUEST_FREELANCERS)
    .map(toPayload)
    .switchMap(() => {
      return this._apisService.getFreelancers()
        .map(data => {
          console.log(data);
          return new freelancersActions.RequestFreelancersComplete(data)
        })
        .catch(error => of(new freelancersActions.RequestFreelancersError(error)));
    });

  @Effect()
  requestGetFreelancer$: Observable<Action> = this._actions$
    .ofType(freelancersConstants.REQUEST_FREELANCER)
    .map(toPayload)
    .switchMap((params) => {
      return this._apisService.getFreelancer(params)
        .map(data => new freelancersActions.RequestFreelancerComplete(data))
        .catch(error => of(new freelancersActions.RequestFreelancerError(error)));
    });

  @Effect()
  requestGetFreelancerEvents$: Observable<Action> = this._actions$
    .ofType(freelancersConstants.REQUEST_FREELANCER_EVENTS)
    .map(toPayload)
    .switchMap((params) => {
      console.log('-------------Effects---------------');
      console.log(params);
      return this._apisService.getFreelancerEvents(params)
        .map(data => {
          console.log(data);
          return new freelancersActions.RequestFreelancerEventsComplete(data)
        })
        .catch(error => of(new freelancersActions.RequestFreelancerEventsError(error)));
    });

//   @Effect()
//   createModerateur$: Observable<Action> = this._actions$
//     .ofType(freelancersConstants.REQUEST_FREELANCER_CREATE)
//     .map(toPayload)
//     .switchMap((params) => {
//       return this._apisService.createModerateur(params)
//         .map(data => new freelancersActions.RequestCreateFreelancerComplete(data))
//         .catch(error => of(new freelancersActions.RequestCreateFreelancerError(error)));
//     });

//   @Effect()
//   updateModerateur$: Observable<Action> = this._actions$
//     .ofType(freelancersConstants.REQUEST_FREELANCER_UPDATE)
//     .map(toPayload)
//     .switchMap((params) => {
//       return this._apisService.updateModerateur(params)
//         .map(data => new freelancersActions.RequestUpdateFreelancerComplete(data))
//         .catch(error => of(new freelancersActions.RequestUpdateFreelancerError(error)));
//     });

//   @Effect()
//   updateProfile$: Observable<Action> = this._actions$
//     .ofType(freelancersConstants.REQUEST_FREELANCER_PROFILE_UPDATE)
//     .map(toPayload)
//     .switchMap((params) => {
//       return this._apisService.updateModerateur(params)
//         .map(data => new freelancersActions.RequestUpdateFreelancerProfileComplete(data))
//         .catch(error => of(new freelancersActions.RequestUpdateFreelancerProfileError(error)));
//     });

//   @Effect()
//   updatePassword$: Observable<Action> = this._actions$
//     .ofType(freelancersConstants.REQUEST_FREELANCER_PASSWORD)
//     .map(toPayload)
//     .switchMap((params) => {
//       return this._apisService.updateModerateurPassword(params)
//         .map(data => new freelancersActions.RequestUpdateFreelancerPasswordComplete(data))
//         .catch((error) => of(new freelancersActions.RequestUpdateFreelancerPasswordError(error)));
//     });

//   @Effect()
//   deleteModerateur$: Observable<Action> = this._actions$
//     .ofType(freelancersConstants.REQUEST_FREELANCER_DELETE)
//     .map(params => {
//       swal({
//         title: 'Êtes-vous sûr de vouloir effacer cet enregistrement?',
//         text: 'Cliquer en dehors de la boite de dialogue pour le fermer.',
//         icon: 'error',
//         dangerMode: true,
//       })
//         .then(willDelete => {
//           if (willDelete) {
//             this._apisService.deleteModerateur(params['payload'])
//               .subscribe(
//                 response => {
//                   console.log('response', response);
//                   console.log('sucess');
//                   this._store.dispatch(new freelancersActions.RequestDeleteFreelancerComplete(params));
//                 },
//                 error => {
//                   console.log(error);
//                   console.log('error');
//                   this._store.dispatch(new freelancersActions.RequestDeleteFreelancerError(error));
//                 });
//             // .map(data => this._store.dispatch(new freelancersActions.RequestDeleteModerateurComplete(data)))
//             // .catch(error => of(this._store.dispatch(new freelancersActions.RequestDeleteModerateurError(error))));
//           } else {
//             this._store.dispatch(new freelancersActions.RequestDeleteFreelancerCanceled());
//           }
//         });
//       return new notificationsActions.NotifyUser({
//         uuid: UUID.UUID(),
//         type: 'success',
//         title: 'Succès :-)',
//         text: 'Votre annonce a été modifié avec succés!'
//       });



//     });

  constructor(
    private _actions$: Actions,
    private _store: Store<fromRoot.State>,
    private _apisService: ModerateurService) { }

}
