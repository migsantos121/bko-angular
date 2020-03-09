import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions } from '@angular/http';
import { URLSearchParams } from '@angular/http';
import { environment } from '../../environments/environment';
import { ApisBaseService } from './base.service';

@Injectable()
export class CollectionService extends ApisBaseService {

  constructor(protected _http: Http) {
    super(_http);
  }

  getCollections(params: any = null) {
    let url = `${environment.SERVER_URL}/api/collections/`;
    if (params) {
      url = `${environment.SERVER_URL}/api/collections/?keyword=${params}`;
    }
    return this.getRequest(url);
  }

  getCollection(params) {
    const url = `${environment.SERVER_URL}/api/collections/${params.id}`;
    return this.getRequest(url);
  }

  postCollection(params) {
    const url = `${environment.SERVER_URL}/api/bo/create_collection/`;
    return this.postRequest(url, params);
  }

  putCollection(params) {
    const url = `${environment.SERVER_URL}/api/bo/update_collection/`;
    return this.postRequest(url, params);
  }

  deleteCollection(params) {
    const url = `${environment.SERVER_URL}/api/bo/delete_collection/${params.id}/`;
    return this.deleteRequest(url);
  }

  deleteAnnonceFromCollection(params) {
    console.log(params);
    const url = `${environment.SERVER_URL}/api/bo/remove_from_collection/`;
    return this.postRequest(url, params);
  }

}
