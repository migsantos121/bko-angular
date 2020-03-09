import {
  Component,
  OnInit,
  AfterViewInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { saveAs } from 'file-saver/FileSaver';
import { Http, Headers } from '@angular/http';
import { Store } from '@ngrx/store';

import { Pays } from '../../models/pays';

import * as fromRoot from '../../reducers';
import * as moderateursActions from '../../actions/moderateurs';
import * as paysActions from '../../actions/pays';
import { Moderateur } from '../../models/moderateur';

@Component({
  selector: 'bo-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  titre$ = 'Edition profile';
  userForm: FormGroup;
  passwordForm: FormGroup;
  pays$: Observable<Pays[]>;
  moderateur$: Observable<Moderateur>;
  status$: Observable<any>;
  loading = true;
  role = localStorage.getItem('bo::role');

  constructor(private http: Http, private _store: Store<fromRoot.State>) {
    this.buildUserForm();
    this.moderateur$ = _store.select(fromRoot.getModerateur);
    this.pays$ = _store.select(fromRoot.getPays);
    this.status$ = _store.select(fromRoot.getModerateurStatus);

    this.moderateur$.subscribe(val => {
      if (val && val['data']) {
        const user = val['data'];
        this.userForm.patchValue({
          user_id: user.user_id,
          firstname: user.firstname,
          lastname: user.lastname,
          username: user.username,
          role: user.role
        });

        this.passwordForm.patchValue({
          user_id: user.user_id
        });
      }
    });
  }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('bo::user'));
    this._store.dispatch(new moderateursActions.RequestModerateur({ 'user_id': user['sub'] }));
  }

  buildUserForm() {
    this.userForm = new FormGroup({
      user_id: new FormControl(''),
      firstname: new FormControl({ value: '', disabled: this.canEdit() }),
      lastname: new FormControl({ value: '', disabled: this.canEdit() }),
      role: new FormControl({ value: '', disabled: this.canEdit() }),
      username: new FormControl({ value: '', disabled: true }),
    });

    this.passwordForm = new FormGroup({
      user_id: new FormControl(''),
      old_password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
      confirm_password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)])
    }, this.passwordMatchValidator);
  }

  onFormSubmit(value) {
    console.log(value);
    this._store.dispatch(new moderateursActions.RequestUpdateModerateurProfile(value));
  }

  onPasswordFormSubmit(value) {
    console.log(value);
    delete value.confirm_password;
    this.passwordForm.reset();
    this._store.dispatch(new moderateursActions.RequestUpdateModerateurPassword(value));
  }

  passwordMatchValidator(fg: FormGroup) {
    return fg.get('password').value === fg.get('confirm_password').value ? null : { 'mismatch': true };
  };

  canEdit() {
    return this.role !== 'admin';
  }

}
