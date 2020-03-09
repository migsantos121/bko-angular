import { Component, OnInit } from '@angular/core';
import * as sessionActions from '../../actions/session';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';

@Component({
  selector: 'bo-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {
  user_name = 'Angular';
  user_mail = 'mail@angular.com';
  role = localStorage.getItem('bo::role');
  constructor(private _store: Store<fromRoot.State>) { }

  ngOnInit() {
    const user: object = JSON.parse(localStorage.getItem('bo::user'));
    this.user_name = user['username'];
    this.user_mail = user['username'] + '@angular.com';
    this.role = localStorage.getItem('bo::role');
  }

  logout() {
    this._store.dispatch(new sessionActions.RequestDestroyOauthAction({}));
  }

  isAdmin() {
    return this.role === 'admin';
  }

  isModerator() {
    return this.role === 'moderator';
  }

  isFreelancer() {
    return this.role === 'freelancer';
  }

}
