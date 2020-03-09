
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions } from '@angular/http';
import { URLSearchParams } from '@angular/http';
import { environment } from '../../environments/environment';
import { ApisBaseService } from './base.service';

@Injectable()
export class VendeurService extends ApisBaseService {
  redirect_url: string;

  constructor(protected _http: Http) {
    super(_http);
  }

  getVendeur(params) {
    const url = `${environment.SERVER_URL}/api/bo-vendeurs/${params.id}`;
    return this.getRequest(url);
  }

  getVendeurs(params: any = null) {
    let url = new URL(`${environment.SERVER_URL}/api/bo-vendeurs/`);

    if (params) {
      if (typeof params === 'object' && params.hasOwnProperty('keyword')) {
        if (params['keyword']) {
          url.searchParams.set('keyword', params['keyword']);
        }
      }
      if (typeof params === 'object' && params.hasOwnProperty('pays')) {
        if (params['pays']) {
          url.searchParams.set('pays', params['pays']);
        }
      }
      if (typeof params === 'object' && params.hasOwnProperty('last_login')) {
        if (params['last_login']) {
          url.searchParams.set('last_login', params['last_login']);
        }
      }
      if (
        typeof params === 'object' &&
        params.hasOwnProperty('inscrit_moins_de')
      ) {
        if (params['inscrit_moins_de']) {
          url.searchParams.set('inscrit_moins_de', params['inscrit_moins_de']);
        }
      }
      if (typeof params === 'object' && params.hasOwnProperty('last_posting')) {
        if (params['last_posting']) {
          url.searchParams.set('last_posting', params['last_posting']);
        }
      }
      if (
        typeof params === 'object' &&
        params.hasOwnProperty('nbre_annonces')
      ) {
        url.searchParams.set('nbre_annonces', params['nbre_annonces']);
      }
      if (
        typeof params === 'object' &&
        params.hasOwnProperty('nbre_produits_vendus')
      ) {
        url.searchParams.set('nbre_produits_vendus', params['nbre_produits_vendus']);
      }

      if (typeof params === 'string' && params != null) {
        url = new URL(params);
      }
    }
    return this.getRequest(url.href);
  }

  getVendeursExport(params: any = null) {
    let url = new URL(`${environment.SERVER_URL}/api/bo-vendeurs_export/`);

    if (params) {
      if (typeof params === 'object' && params.hasOwnProperty('keyword')) {
        if (params['keyword']) {
          url.searchParams.set('keyword', params['keyword']);
        }
      }
      if (typeof params === 'object' && params.hasOwnProperty('pays')) {
        if (params['pays']) {
          url.searchParams.set('pays', params['pays']);
        }
      }
      if (typeof params === 'object' && params.hasOwnProperty('last_login')) {
        if (params['last_login']) {
          url.searchParams.set('last_login', params['last_login']);
        }
      }
      if (
        typeof params === 'object' &&
        params.hasOwnProperty('inscrit_moins_de')
      ) {
        if (params['inscrit_moins_de']) {
          url.searchParams.set('inscrit_moins_de', params['inscrit_moins_de']);
        }
      }
      if (typeof params === 'object' && params.hasOwnProperty('last_posting')) {
        if (params['last_posting']) {
          url.searchParams.set('last_posting', params['last_posting']);
        }
      }
      if (
        typeof params === 'object' &&
        params.hasOwnProperty('nbre_annonces')
      ) {
        if (params['nbre_annonces']) {
          url.searchParams.set('nbre_annonces', params['nbre_annonces']);
        }
      }
      if (
        typeof params === 'object' &&
        params.hasOwnProperty('nbre_produits_vendus')
      ) {
        if (params['nbre_produits_vendus']) {
          url.searchParams.set('nbre_produits_vendus', params['nbre_produits_vendus']);
        }
      }

      if (typeof params === 'string' && params != null) {
        url = new URL(params);
      }
    }
    return this.getRequest(url);
  }

  putVendeur(params) {
    const url = `${environment.SERVER_URL}/api/bo-vendeurs/${params.id}/`;
    return this.putRequest(url, params);
  }

  getActivites(params: any = null) {
    const url = new URL(`${environment.SERVER_URL}/api/bo-activites/`);
    if (params) {
      if (typeof params === 'object' && params.hasOwnProperty('user_id')) {
        if (params['user_id']) {
          url.searchParams.set('user_id', params['user_id']);
        }
      }
      if (typeof params === 'object' && params.hasOwnProperty('page_size')) {
        if (params['page_size']) {
          url.searchParams.set('page_size', params['page_size']);
        }
      }
    }
    return this.getRequest(url);
  }

}
