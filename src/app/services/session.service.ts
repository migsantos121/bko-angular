import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions } from '@angular/http';
import { URLSearchParams } from '@angular/http';
import { environment } from '../../environments/environment';
import { ApisBaseService } from './base.service';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class SessionService extends ApisBaseService {
  redirect_url: string;

  constructor(protected _http: Http) {
    super(_http);
  }

  isLogged() {
    const token = localStorage.getItem('bo::token');
    const user = localStorage.getItem('bo::user');
    // tslint:disable-next-line:curly

    if(!tokenNotExpired(null, token)) {
      this.destroyAuth();
    }

    if (token && user) 
      return tokenNotExpired(null, token);
      
    return false;
  }

  getCurrentUser() {
    const url = `${environment.API_URL}/users/current_user/`;
    return this.getRequest(url);
  }

  postOauth(credential) {
    const url = `${environment.BO_SRV_URL}/bo/auth/login`;
    return this.postRequest(url, credential);

  }

  destroyAuth() {
    const url = `${environment.BO_SRV_URL}/bo/auth/logout`;
    return this.postRequest(url, {});
  }

}
