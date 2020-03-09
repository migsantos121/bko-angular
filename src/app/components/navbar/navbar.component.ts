import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as sesionsActions from '../../actions/session';
import * as sessionConstants from '../../constants/sessions';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';

@Component({
  selector: 'bo-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user_name = 'Angular';
  user_mail = 'mail@angular.com';
  user_role = localStorage.getItem('bo::role');

  constructor(private _store: Store<fromRoot.State>, ) { }

  ngOnInit() {
    const user: object = JSON.parse(localStorage.getItem('bo::user'));
    // tslint:disable-next-line:no-unused-expression
    user['firstname'] ? this.user_name = user['firstname'] + ' ' + user['lastname'] : this.user_name = user['username'];
    this.user_mail = user['username'] + '@angular.com';
  }

  logout() {
    console.log('logout');
    this._store.dispatch(new sesionsActions.RequestDestroyOauthAction({}));
  }

}
