import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../reducers';
import * as session from '../../actions/session';

@Component({
  selector: 'app-sign-in',
  template: `<div class="card panel panel-default ks-light ks-panel ks-login">
              <div class="card-block">
                <bo-sign-in-form [isPending]="isPending$ | async"
                      (onFormSubmit)="onFormSubmit($event)">
                </bo-sign-in-form>

              </div>
          </div>
`,
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public notifications$: Observable<Object[]>;
  public isPending$: Observable<boolean>;
  public data$: Observable<Object>;
  public config$: Observable<Object>;

  constructor(private _store: Store<fromRoot.State>) {
    this.isPending$ = _store.select(fromRoot.getSessionStatus);
    this.notifications$ = _store.select(fromRoot.getMessages);
    this.config$ = _store.select(fromRoot.getSessionConfig);
  }

  ngOnInit() {
  }

  onFormSubmit(formValues: Object) {
    this._store.dispatch(new session.RequestOauthAction(formValues));
  }

}
