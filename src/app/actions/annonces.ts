import { Action } from '@ngrx/store';

import * as annoncesConstants from '../constants/annonces';

export class RequestAnnonces implements Action {
  readonly type = annoncesConstants.REQUEST_ANNONCES;
  constructor(public payload = null) { }
}

export class RequestAnnoncesNext implements Action {
  readonly type = annoncesConstants.REQUEST_ANNONCES_NEXT;
  constructor(public payload = null) { }
}

export class RequestAnnoncesNextComplete implements Action {
  readonly type = annoncesConstants.REQUEST_ANNONCES_NEXT_COMPLETE;
  constructor(public payload = null) { }
}

export class RequestAnnoncesNextError implements Action {
  readonly type = annoncesConstants.REQUEST_ANNONCES_NEXT_ERROR;
  constructor(public payload = null) { }
}

export class RequestAnnoncesPrev implements Action {
  readonly type = annoncesConstants.REQUEST_ANNONCES_PREV;
  constructor(public payload = null) { }
}

export class RequestAnnoncesPrevComplete implements Action {
  readonly type = annoncesConstants.REQUEST_ANNONCES_PREV_COMPLETE;
  constructor(public payload = null) { }
}

export class RequestAnnoncesPrevError implements Action {
  readonly type = annoncesConstants.REQUEST_ANNONCES_PREV_ERROR;
  constructor(public payload = null) { }
}

export class RequestAnnoncesComplete implements Action {
  readonly type = annoncesConstants.REQUEST_ANNONCES_COMPLETE;
  constructor(public payload: any[]) { }
}

export class RequestModerateAnnonce implements Action {
  readonly type = annoncesConstants.REQUEST_MODERATE_ANNONCE;
  constructor(public payload = null) { }
}

export class RequestModerateAnnonceComplete implements Action {
  readonly type = annoncesConstants.REQUEST_MODERATE_ANNONCE_COMPLETE;
  constructor(public payload: any[]) { }
}

export class RequestModerateAnnonceError implements Action {
  readonly type = annoncesConstants.REQUEST_MODERATE_ANNONCE_ERROR;
  constructor(public payload: any[]) { }
}

export class RequestAnnoncesError implements Action {
  readonly type = annoncesConstants.REQUEST_ANNONCES_ERROR;
  constructor(public payload: Object) { }
}

export class RequestGetAnnonce implements Action {
  readonly type = annoncesConstants.REQUEST_GET_ANNONCE;
  constructor(public payload = null) { }
}

export class RequestGetAnnoncePremium implements Action {
  readonly type = annoncesConstants.REQUEST_GET_ANNONCE_PREMIUM;
  constructor(public payload = null) { }
}

export class RequestGetAnnoncesEtatStats implements Action {
  readonly type = annoncesConstants.REQUEST_ANNONCES_STATUS_STATS;
  constructor(public payload = null) { }
}

export class RequestGetAnnoncesEtatStatsComplete implements Action {
  readonly type = annoncesConstants.REQUEST_ANNONCES_STATUS_STATS_COMPLETE;
  constructor(public payload = {}) { }
}

export class RequestGetAnnonceComplete implements Action {
  readonly type = annoncesConstants.REQUEST_GET_ANNONCE_COMPLETE;
  constructor(public payload: any) { }
}

export class RequestGetAnnonceError implements Action {
  readonly type = annoncesConstants.REQUEST_GET_ANNONCE_ERROR;
  constructor(public payload: Object) { }
}

export class RequestGetAnnoncePremiumComplete implements Action {
  readonly type = annoncesConstants.REQUEST_GET_ANNONCE_PREMIUM_COMPLETE;
  constructor(public payload: any) { }
}

export class RequestGetAnnoncePremiumError implements Action {
  readonly type = annoncesConstants.REQUEST_GET_ANNONCE_PREMIUM_ERROR;
  constructor(public payload: Object) { }
}

export class RequestGetAnnoncesEtatStatseError implements Action {
  readonly type = annoncesConstants.REQUEST_ANNONCES_STATUS_STATS_ERROR;
  constructor(public payload: Object) { }
}

export class RequestCreateAnnonce implements Action {
  readonly type = annoncesConstants.REQUEST_CREATE_ANNONCE;
  constructor(public payload = null) { }
}

export class RequestCreateAnnonceComplete implements Action {
  readonly type = annoncesConstants.REQUEST_CREATE_ANNONCE_COMPLETE;
  constructor(public payload: any[]) { }
}

export class RequestCreateAnnonceError implements Action {
  readonly type = annoncesConstants.REQUEST_CREATE_ANNONCE_ERROR;
  constructor(public payload: Object) { }
}

export class RequestUpdateAnnonce implements Action {
  readonly type = annoncesConstants.REQUEST_UPDATE_ANNONCE;
  constructor(public payload: any) { }
}

export class RequestUpdateAnnonceComplete implements Action {
  readonly type = annoncesConstants.REQUEST_UPDATE_ANNONCE_COMPLETE;
  constructor(public payload: any) { }
}

export class RequestUpdateAnnonceError implements Action {
  readonly type = annoncesConstants.REQUEST_UPDATE_ANNONCE_ERROR;
  constructor(public payload: Object) { }
}

export class RequestGetAnnoncesEtatStatsError implements Action {
  readonly type = annoncesConstants.REQUEST_ANNONCES_STATUS_STATS_ERROR;
  constructor(public payload: Object) { }
}

export class RequestDeleteAnnonce implements Action {
  readonly type = annoncesConstants.REQUEST_DELETE_ANNONCE;
  constructor(public payload) { }
}

export class RequestDeleteAnnonceComplete implements Action {
  readonly type = annoncesConstants.REQUEST_DELETE_ANNONCE_COMPLETE;
  constructor(public payload: any[]) { }
}

export class RequestDeleteAnnonceError implements Action {
  readonly type = annoncesConstants.REQUEST_DELETE_ANNONCE_ERROR;
  constructor(public payload: Object) { }
}

export class RequestLinkAnnonce implements Action {
  readonly type = annoncesConstants.REQUEST_LINK_ANNONCE;
  constructor(public payload = null) { }
}

export class RequestLinkAnnonceComplete implements Action {
  readonly type = annoncesConstants.REQUEST_LINK_ANNONCE_COMPLETE;
  constructor(public payload: any[]) { }
}

export class RequestLinkAnnonceError implements Action {
  readonly type = annoncesConstants.REQUEST_LINK_ANNONCE_ERROR;
  constructor(public payload: any[]) { }
}

export class RequestCreateAnnonceCollection implements Action {
  readonly type = annoncesConstants.REQUEST_CREATE_ANNONCE_COLLECTION;
  constructor(public payload = null) { }
}

export class RequestCreateAnnonceCollectionComplete implements Action {
  readonly type = annoncesConstants.REQUEST_CREATE_ANNONCE_COLLECTION_COMPLETE;
  constructor(public payload: any[]) { }
}

export class RequestCreateAnnonceCollectionError implements Action {
  readonly type = annoncesConstants.REQUEST_CREATE_ANNONCE_COLLECTION_ERROR;
  constructor(public payload: any[]) { }
}

export class RequestEditAnnonce implements Action {
  readonly type = annoncesConstants.REQUEST_EDIT_ANNONCE;
  constructor(public payload = null) { }
}

export class RequestEditAnnonceComplete implements Action {
  readonly type = annoncesConstants.REQUEST_EDIT_ANNONCE_COMPLETE;
  constructor(public payload: any[]) { }
}

export class RequestEditAnnonceError implements Action {
  readonly type = annoncesConstants.REQUEST_EDIT_ANNONCE_ERROR;
  constructor(public payload: Object) { }
}

export class RequestResetAnnonceComplete implements Action {
  readonly type = annoncesConstants.REQUEST_RESET_ANNONCE_COMPLETE;
  constructor(public payload = {}) { }
}

export class RequestPromotionCreate implements Action {
  readonly type = annoncesConstants.REQUEST_PROMOTION_CREATE;
  constructor(public payload = null) { }
}

export class RequestPromotionError implements Action {
  readonly type = annoncesConstants.REQUEST_PROMOTION_ERROR;
  constructor(public payload: Object) { }
}

export class RequestPromotionComplete implements Action {
  readonly type = annoncesConstants.REQUEST_PROMOTION_COMPLETE;
  constructor(public payload = {}) { }
}

export class RequestStopPromoting implements Action {
  readonly type = annoncesConstants.REQUEST_STOP_PROMOTING;
  constructor(public payload = null) { }
}
export class RequestCancelPromoting implements Action {
  readonly type = annoncesConstants.REQUEST_CANCEL_PROMO;
  constructor(public payload = null) { }
}


export class RequestUpdatePictureAnnonce implements Action {
  readonly type = annoncesConstants.REQUEST_ANNONCE_PICTURE_UPLOAD;
  constructor(public payload: any) { }
}

export class RequestUpdatePictureAnnonceComplete implements Action {
  readonly type = annoncesConstants.REQUEST_ANNONCE_PICTURE_UPLOAD_COMPLETE;
  constructor(public payload: any) { }
}

export class RequestUpdatePictureAnnonceError implements Action {
  readonly type = annoncesConstants.REQUEST_ANNONCE_PICTURE_UPLOAD_ERROR;
  constructor(public payload: Object) { }
}

export class RequestDeletePictureAnnonce implements Action {
  readonly type = annoncesConstants.REQUEST_ANNONCE_PICTURE_DELETE;
  constructor(public payload: any) { }
}

export class RequestDeletePictureAnnonceComplete implements Action {
  readonly type = annoncesConstants.REQUEST_ANNONCE_PICTURE_DELETE_COMPLETE;
  constructor(public payload: any) { }
}

export class RequestDeletePictureAnnonceError implements Action {
  readonly type = annoncesConstants.REQUEST_ANNONCE_PICTURE_DELETE_ERROR;
  constructor(public payload: Object) { }
}


export class RequestAnnonceRefreshCache implements Action {
  readonly type = annoncesConstants.REQUEST_ANNONCE_REFRESH_CACHE;
  constructor(public payload: any) { }
}

export class RequestAnnonceRefreshCacheComplete implements Action {
  readonly type = annoncesConstants.REQUEST_ANNONCE_REFRESH_CACHE_COMPLETE;
  constructor(public payload: any) { }
}

export class RequestAnnonceRefreshCacheError implements Action {
  readonly type = annoncesConstants.REQUEST_ANNONCE_REFRESH_CACHE_ERROR;
  constructor(public payload: Object) { }
}

export class SearchElement implements Action {
  readonly type = annoncesConstants.SEARCH_ELEMENT;
  constructor(public payload: any) { }
}

export class SearchElementComplete implements Action {
  readonly type =annoncesConstants.SEARCH_ELEMENT_COMPLETE;
  constructor(public payload:any) { }
}

export class SearchElementError implements Action {
  readonly type = annoncesConstants.SEARCH_ELEMENT_ERROR;
  constructor(public payload:any) { }
}


export type Actions =
  | RequestAnnonces
  | RequestAnnoncesComplete
  | RequestAnnoncesError
  | RequestAnnonceRefreshCache
  | RequestAnnonceRefreshCacheComplete
  | RequestAnnonceRefreshCacheError
  | RequestUpdatePictureAnnonce
  | RequestUpdatePictureAnnonceComplete
  | RequestUpdatePictureAnnonceError
  | RequestDeletePictureAnnonce
  | RequestDeletePictureAnnonceComplete
  | RequestDeletePictureAnnonceError
  | RequestLinkAnnonce
  | RequestStopPromoting
  | RequestLinkAnnonceComplete
  | RequestCancelPromoting
  | RequestLinkAnnonceError
  | RequestEditAnnonce
  | RequestEditAnnonceComplete
  | RequestEditAnnonceError
  | RequestGetAnnonce
  | RequestGetAnnonceComplete
  | RequestGetAnnonceError
  | RequestCreateAnnonce
  | RequestCreateAnnonceComplete
  | RequestCreateAnnonceError
  | RequestUpdateAnnonce
  | RequestUpdateAnnonceComplete
  | RequestUpdateAnnonceError
  | RequestDeleteAnnonce
  | RequestDeleteAnnonceComplete
  | RequestDeleteAnnonceError
  | RequestResetAnnonceComplete
  | RequestModerateAnnonceError
  | RequestModerateAnnonceComplete
  | RequestGetAnnoncesEtatStats
  | RequestGetAnnoncesEtatStatsComplete
  | RequestGetAnnoncesEtatStatsError
  | RequestCreateAnnonceCollection
  | RequestCreateAnnonceCollectionComplete
  | RequestCreateAnnonceCollectionError
  | RequestPromotionCreate
  | RequestPromotionComplete
  | RequestPromotionError
  | RequestModerateAnnonce
  | SearchElement
  | SearchElementComplete
  | SearchElementError;
