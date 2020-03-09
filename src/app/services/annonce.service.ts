import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions } from '@angular/http';
import { URLSearchParams } from '@angular/http';
import { environment } from '../../environments/environment';
import { ApisBaseService } from './base.service';

@Injectable()
export class AnnonceService extends ApisBaseService {
  redirect_url: string;

  constructor(protected _http: Http) {
    super(_http);
  }

  getAnnonce(params) {
    const url = `${environment.SERVER_URL}/api/bo-annonces/${params.id}/`;
    return this.getRequest(url);
  }

  getAnnonces(params: any = null) {
    console.log(params);
    let url = new URL(`${environment.SERVER_URL}/api/bo-annonces/`);

    if (params) {
      if (typeof params === 'object' && params.hasOwnProperty('user_id')) {
        if (params['user_id']) {
          url.searchParams.set('user_id', params['user_id']);
        }
      }
      if (typeof params === 'object' && params.hasOwnProperty('categorie')) {
        if (params['categorie']) {
          url.searchParams.set('categorie', params['categorie']);
        }
      }
      if (typeof params === 'object' && params.hasOwnProperty('pays')) {
        if (params['pays']) {
          url.searchParams.set('pays', params['pays']);
        }
      }
      if (typeof params === 'object' && params.hasOwnProperty('keyword')) {
        if (params['keyword']) {
          url.searchParams.set('keyword', params['keyword']);
        }
      }
      if (typeof params === 'object' && params.hasOwnProperty('filter')) {
        if (params['filter']) {
          url.searchParams.set('filter', params['filter']);
        }
      }
      if (typeof params === 'object' && params.hasOwnProperty('etat')) {
        url.searchParams.set('etat', params['etat']);
      }
      if (typeof params === 'object' && params.hasOwnProperty('page_size')) {
        if (params['page_size']) {
          url.searchParams.set('page_size', params['page_size']);
        }
      }

      if (typeof params === 'string' && params != null) {
        url = new URL(params);
      }
    }

    return this.getRequest(url.href);
  }

  postAnnonceCollection(params) {
    const url = `${environment.SERVER_URL}/api/bo/add_to_collection/`;
    return this.postRequest(url, params);
  }

  deletePhoto(params) {
    const url = `${environment.SERVER_URL}/api/bo/delete_picture/`;
    return this.postRequest(url, params);
  }

  updatePicture(params) {
    const url = `${environment.SERVER_URL}/api/bo/picture_upload/`;
    return this.postRequest(url, params);
  }

  getAnnoncesStats(params) {
    const url = `${environment.SERVER_URL}/api/bo/annonces_etat_stats/`;
    return this.getRequest(url);
  }

  putAnnonce(params) {
    const url = `${environment.SERVER_URL}/api/bo/update_annonce/`;
    return this.postRequest(url, params);
  }

  getAnnonceLink(params) {
    const url = `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyBQ7M3UFoUD05QiWnvRd5coAp49V_qk5w4`;
    const data = {
      longDynamicLink: `https://je55n.app.goo.gl/?link=http://angular.com/ad/${
        params.id
        }&apn=com.devengine.paladin.angular&ibi=com.angular.ios`,
      suffix: { option: 'SHORT' }
    };
    return this.postRequest(url, data);
  }

  moderateAnnonce(params) {
    const url = `${environment.SERVER_URL}/api/bo/moderate_ad/`;
    const data = { ad_id: params.id, action: params.etat, token: params.token };
    return this.postRequest(url, data);
  }

  postPromotion(params) {
    const url = `${environment.SERVER_URL}/api/bo/promote/`;
    return this.postRequest(url, params);
  }

  stopPromotion(params) {
    const url = `${environment.SERVER_URL}/api/bo/stop_promoting/`;
    return this.postRequest(url, params);
  }

  cancelPromo(params) {
    const url = `${environment.SERVER_URL}/api/bo/cancel_promo/`;
    return this.postRequest(url, params);
  }

  refreshCache() {
    const url = `${environment.SERVER_URL}/api/bo/bo_refresh_cache/`;
    return this.getRequest(url);
  }

  searchAnnonces(payload){
    let url = new URL(`${environment.SERVER_URL}/api/bo-annonces/`);
    if (payload.params['user_id']) {
      url.searchParams.set('user_id', payload.params['user_id']);
    }
    if(payload.categorie && payload.categorie !== 'all'){
      url.searchParams.set('categorie',payload.categorie)
    }
    if(payload.statut && payload.statut !== 'all'){
      url.searchParams.set('etat',payload.statut)
    }
    if (payload.keyword) {
      url.searchParams.set('keyword', payload['keyword']);
    }
    return this.getRequest(url.href)
      .map(data=>{
        return data.results
    });
  }

}
