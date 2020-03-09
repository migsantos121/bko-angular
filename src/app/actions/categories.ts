import { Action } from '@ngrx/store';

import * as categoriesConstants from '../constants/categories';


export class RequestCategorie implements Action {
  readonly type = categoriesConstants.REQUEST_CATEGORIE;
  constructor(public payload = null) { }
}

export class RequestCategorieComplete implements Action {
  readonly type = categoriesConstants.REQUEST_CATEGORIE_COMPLETE;
  constructor(public payload = null) { }
}

export class RequestCategorieError implements Action {
  readonly type = categoriesConstants.REQUEST_CATEGORIE_ERROR;
  constructor(public payload = null) { }
}

export class RequestResetCategorieComplete implements Action {
  readonly type = categoriesConstants.REQUEST_RESET_CATEGORIE_COMPLETE;
  constructor(public payload = {}) { }
}

export class RequestCategories implements Action {
  readonly type = categoriesConstants.REQUEST_CATEGORIES;
  constructor(public payload = null) { }
}

export class RequestCategoriesComplete implements Action {
  readonly type = categoriesConstants.REQUEST_CATEGORIES_COMPLETE;
  constructor(public payload = null) { }
}

export class RequestCategoriesError implements Action {
  readonly type = categoriesConstants.REQUEST_CATEGORIES_ERROR;
  constructor(public payload = null) { }
}

export class RequestCategoriesCreate implements Action {
  readonly type = categoriesConstants.REQUEST_CATEGORIE_CREATE;
  constructor(public payload = null) { }
}

export class RequestCategoriesCreateComplete implements Action {
  readonly type = categoriesConstants.REQUEST_CATEGORIE_CREATE_COMPLETE;
  constructor(public payload = null) { }
}

export class RequestCategoriesCreateError implements Action {
  readonly type = categoriesConstants.REQUEST_CATEGORIE_CREATE_ERROR;
  constructor(public payload = null) { }
}

export class RequestCategoriesUpdate implements Action {
  readonly type = categoriesConstants.REQUEST_CATEGORIE_UPDATE;
  constructor(public payload = null) { }
}

export class RequestCategoriesUpdateComplete implements Action {
  readonly type = categoriesConstants.REQUEST_CATEGORIE_UPDATE_COMPLETE;
  constructor(public payload = null) { }
}

export class RequestCategoriesUpdateError implements Action {
  readonly type = categoriesConstants.REQUEST_CATEGORIE_UPDATE_ERROR;
  constructor(public payload = null) { }
}

export class RequestCategoriesDelete implements Action {
  readonly type = categoriesConstants.REQUEST_CATEGORIE_DELETE;
  constructor(public payload = null) { }
}

export class RequestCategoriesDeleteComplete implements Action {
  readonly type = categoriesConstants.REQUEST_CATEGORIE_DELETE_COMPLETE;
  constructor(public payload = null) { }
}

export class RequestCategoriesDeleteError implements Action {
  readonly type = categoriesConstants.REQUEST_CATEGORIE_DELETE_ERROR;
  constructor(public payload = null) { }
}


export type Actions
  =
  RequestCategorie
  | RequestCategorieComplete
  | RequestCategorieError
  | RequestCategories
  | RequestCategoriesComplete
  | RequestCategoriesError
  | RequestCategoriesCreate
  | RequestCategoriesCreateComplete
  | RequestCategoriesCreateError
  | RequestCategoriesUpdate
  | RequestCategoriesUpdateComplete
  | RequestCategoriesUpdateError
  | RequestCategoriesDelete
  | RequestCategoriesDeleteComplete
  | RequestCategoriesDeleteError
  | RequestResetCategorieComplete;
