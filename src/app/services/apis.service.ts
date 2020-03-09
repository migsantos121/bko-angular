import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions } from '@angular/http';
import { URLSearchParams } from '@angular/http';
import { environment } from '../../environments/environment';
import { ApisBaseService } from './base.service';

@Injectable()
export class ApisService extends ApisBaseService {

  constructor(protected _http: Http) {
    super(_http);
  }

  getPays() {
    const url = `${environment.SERVER_URL}/countries_list/`;
    return this.getRequest(url);
  }

  getKeywordsCloud() {
    const url = `${environment.SERVER_URL}/api/bo/dashboard_keywords/`;
    return this.getRequest(url);
  }


  getDashboardData() {
    const url = `${environment.SERVER_URL}/api/bo/dashboard/`;
    return this.getRequest(url);
  }
}
