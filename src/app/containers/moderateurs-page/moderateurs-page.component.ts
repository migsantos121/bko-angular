import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Moderateur } from 'app/models/moderateur';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as fromRoot from '../../reducers';
import * as moderateurActions from '../../actions/moderateurs';
import * as customType from '../../models/constants';


@Component({
  selector: 'bo-moderateurs-page',
  templateUrl: './moderateurs-page.component.html',
  styleUrls: ['./moderateurs-page.component.css']
})
export class ModerateursPageComponent implements OnInit {
  status$: Observable<any>;
  moderateurs$: Observable<Moderateur[]>;
  moderateur$: Observable<Moderateur>;
  errors$: Observable<Object>;
  searchForm: FormGroup;
  addForm: FormGroup;
  titre = 'Moderateurs';
  erreur = {};
  customType = customType;
  loading = true;
  currentUserId = JSON.parse(localStorage.getItem('bo::user'))['sub'];


  constructor(private _store: Store<fromRoot.State>) {
    this.status$ = _store.select(fromRoot.getModerateurStatus);
    this.moderateurs$ = _store.select(fromRoot.getModerateurs);
    this.moderateur$ = _store.select(fromRoot.getModerateur);
    this.errors$ = _store.select(fromRoot.getModerateurError);
    this.errors$.subscribe(val => {
      if (val && val['_body']) {
        console.log(JSON.parse(val['_body']));
        this.erreur = JSON.parse(val['_body']);
      }
    });
    console.log(this.currentUserId);
  }

  ngOnInit() {
    this._store.dispatch(new moderateurActions.RequestModerateurs());
  }

  onFormSubmit(value) {
    if (value.user_id) {
      this._store.dispatch(new moderateurActions.RequestUpdateModerateur(value));
    } else {
      this._store.dispatch(new moderateurActions.RequestCreateModerateur(value));
    }
  }

  editer(user) {
    this._store.dispatch(new moderateurActions.RequestModerateur(user));
  }

  delete(user) {
    this._store.dispatch(new moderateurActions.RequestDeleteModerateur(user));
  }

  addNewUser() {
    this._store.dispatch(new moderateurActions.RequestResetModerateur());
    this._store.dispatch(new moderateurActions.RequestNewModerateur());
  }



}
