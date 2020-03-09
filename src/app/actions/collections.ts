import { Action } from '@ngrx/store';

import * as collectionsConstants from '../constants/collections';


export class RequestCollection implements Action {
  readonly type = collectionsConstants.REQUEST_COLLECTION;
  constructor(public payload = null) { }
}

export class RequestCollectionComplete implements Action {
  readonly type = collectionsConstants.REQUEST_COLLECTION_COMPLETE;
  constructor(public payload = null) { }
}

export class RequestCollectionError implements Action {
  readonly type = collectionsConstants.REQUEST_COLLECTION_ERROR;
  constructor(public payload = null) { }
}

export class RequestResetCollectionComplete implements Action {
  readonly type = collectionsConstants.REQUEST_RESET_COLLECTION_COMPLETE;
  constructor(public payload = {}) { }
}

export class RequestCollections implements Action {
  readonly type = collectionsConstants.REQUEST_COLLECTIONS;
  constructor(public payload = null) { }
}

export class RequestCollectionsComplete implements Action {
  readonly type = collectionsConstants.REQUEST_COLLECTIONS_COMPLETE;
  constructor(public payload: any[]) { }
}

export class RequestCollectionsError implements Action {
  readonly type = collectionsConstants.REQUEST_COLLECTIONS_ERROR;
  constructor(public payload = null) { }
}

export class RequestCollectionsCreate implements Action {
  readonly type = collectionsConstants.REQUEST_COLLECTION_CREATE;
  constructor(public payload = null) { }
}

export class RequestCollectionsCreateComplete implements Action {
  readonly type = collectionsConstants.REQUEST_COLLECTION_CREATE_COMPLETE;
  constructor(public payload: any) { }
}

export class RequestCollectionsCreateError implements Action {
  readonly type = collectionsConstants.REQUEST_COLLECTION_CREATE_ERROR;
  constructor(public payload: Object) { }
}

export class RequestCollectionsUpdate implements Action {
  readonly type = collectionsConstants.REQUEST_COLLECTION_UPDATE;
  constructor(public payload = null) { }
}

export class RequestCollectionsUpdateComplete implements Action {
  readonly type = collectionsConstants.REQUEST_COLLECTION_UPDATE_COMPLETE;
  constructor(public payload = null) { }
}

export class RequestCollectionsUpdateError implements Action {
  readonly type = collectionsConstants.REQUEST_COLLECTION_UPDATE_ERROR;
  constructor(public payload = null) { }
}

export class RequestCollectionsDelete implements Action {
  readonly type = collectionsConstants.REQUEST_COLLECTION_DELETE;
  constructor(public payload = null) { }
}

export class RequestCollectionsDeleteComplete implements Action {
  readonly type = collectionsConstants.REQUEST_COLLECTION_DELETE_COMPLETE;
  constructor(public payload = null) { }
}

export class RequestCollectionsDeleteError implements Action {
  readonly type = collectionsConstants.REQUEST_COLLECTION_DELETE_ERROR;
  constructor(public payload = null) { }
}

export class RequestDeleteAnnonceFromCollection implements Action {
  readonly type = collectionsConstants.REQUEST_DELETE_ANNONCE_FROM_COLLECTION;
  constructor(public payload:any) { }
}

export class RequestDeleteAnnonceFromCollectionComplete implements Action {
  readonly type = collectionsConstants.REQUEST_DELETE_ANNONCE_FROM_COLLECTION_COMPLETE;
  constructor(public payload:any) { }
}

export class RequestDeleteAnnonceFromCollectionError implements Action {
  readonly type = collectionsConstants.REQUEST_DELETE_ANNONCE_FROM_COLLECTION_ERORR;
  constructor(public payload:any) { }
}





export type Actions
  =
  RequestCollection
  | RequestCollectionComplete
  | RequestCollectionError
  | RequestCollections
  | RequestCollectionsComplete
  | RequestCollectionsError
  | RequestCollectionsCreate
  | RequestCollectionsCreateComplete
  | RequestCollectionsCreateError
  | RequestCollectionsUpdate
  | RequestCollectionsUpdateComplete
  | RequestCollectionsUpdateError
  | RequestCollectionsDelete
  | RequestCollectionsDeleteComplete
  | RequestCollectionsDeleteError
  | RequestResetCollectionComplete
  | RequestDeleteAnnonceFromCollection
  | RequestDeleteAnnonceFromCollectionComplete
  | RequestDeleteAnnonceFromCollectionError;
