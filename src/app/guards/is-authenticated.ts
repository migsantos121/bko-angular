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
export class AppGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private _apisService: SessionService,
    private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {
    const url = `/${route.path}`;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this._apisService.isLogged()) { return true; }
    this._apisService.redirect_url = url;
    this._router.navigate(['/sign_in']);
    return false;
  }
}
