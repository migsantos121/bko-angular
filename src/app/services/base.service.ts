import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { Http, Headers, RequestOptions } from '@angular/http';
import { URLSearchParams } from '@angular/http';


export class ApisBaseService {

  constructor(protected _http: Http) { }

  getRequest(url) {
    const token = localStorage.getItem('bo::token');
    const headers = new Headers({
      Authorization: `Bearer ${token}`, 'X-API-KEY': environment.X_API_KEY
    });
    const options = new RequestOptions({ headers: headers });
    return this._http.get(url, options)
      .map(response => response.json())
      .catch(e => {
        if (e.status === 401) {
          this.redirect();
          return Observable.throw('Unauthorized');
        }
      });
  }

  deleteRequest(url) {
    const token = localStorage.getItem('bo::token');
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json', 'X-API-KEY': environment.X_API_KEY
    });
    const options = new RequestOptions({ headers: headers });
    return this._http.delete(url, options)
      .map(response => response.json())
      .catch(e => {
        if (e.status === 401) {
          this.redirect();
          return Observable.throw('Unauthorized');
        }
      });
  }

  postRequest(url, params) {
    const token = localStorage.getItem('bo::token');
    const headers = new Headers({
      Authorization: `Bearer ${token}`, 'Content-type': 'application/json', 'X-API-KEY': environment.X_API_KEY
    });
    const options = new RequestOptions({ headers: headers });
    return this._http
      .post(url, params, options)
      .map(response => response.json())
      .catch(e => {
        if (e.status === 401) {
          this.redirect();
          return Observable.throw('Unauthorized');
        }
      });
  }


  putRequest(url, params) {
    const token = localStorage.getItem('bo::token');
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json', 'X-API-KEY': environment.X_API_KEY
    });
    const options = new RequestOptions({ headers: headers });
    return this._http
      .put(url, params, options)
      .map(response => response.json())
      .catch(e => {
        if (e.status === 401) {
          this.redirect();
          return Observable.throw('Unauthorized');
        }
      });
  }

  redirect() {
    localStorage.clear();
    if (window.location.pathname !== '/sign_in') {
      window.location.href = '/sign_in';
    }
  }

}
