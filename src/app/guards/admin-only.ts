import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { ApisService } from '../services/apis.service';
import { SessionService } from '../services';

@Injectable()
export class AdminOnly implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private _apisService: SessionService,
    private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.isAdmin();
  }

  canActivateChild(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {
    return this.isAdmin();
  }

  isAdmin(): boolean {
    const role = localStorage.getItem('bo::role');
    return 'admin' === role;
  }
}
