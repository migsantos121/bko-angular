import * as _ from 'lodash';
import * as categoriesActions from '../actions/categories';
import * as categoriesConstants from '../constants/categories';

import { Categorie } from '../models/categorie';

export interface State {
  categorie: Categorie;
  categories: Categorie[];
  isPending: boolean;
  error: Object;
}

const categorieInitialState: State = {
  categorie: null,
  categories: null,
  isPending: false,
  error: {}
};

export function reducer(state = categorieInitialState, action: categoriesActions.Actions) {
  switch (action.type) {
    case categoriesConstants.REQUEST_CATEGORIE:
    case categoriesConstants.REQUEST_CATEGORIE_CREATE:
    case categoriesConstants.REQUEST_CATEGORIE_UPDATE:
    case categoriesConstants.REQUEST_CATEGORIE_DELETE:
    case categoriesConstants.REQUEST_CATEGORIES: {
      return Object.assign({}, state, {
        isPending: true
      });

    }
    case categoriesConstants.REQUEST_CATEGORIES_COMPLETE: {
      let tab = [];
      tab = [...action.payload];
      tab = _.sortBy(tab, 'nom');
      const new_items = [];
      tab.forEach(item => {
        const categorie = _.clone(item);
        const liste = [...item.childs];
        categorie['childs'] = _.sortBy(liste, 'nom');
        new_items.push(categorie);
      });
      console.log(new_items);

      return Object.assign({}, state, {
        categories: new_items,
        isPending: false,
        error: {}
      });
    }

    case categoriesConstants.REQUEST_CATEGORIE_COMPLETE: {
      return Object.assign({}, state, {
        categorie: action.payload,
        isPending: false,
        error: {}
      });
    }
    case categoriesConstants.REQUEST_CATEGORIE_CREATE_COMPLETE: {
      return Object.assign({}, state, {
        categories: [action.payload, ...state.categories],
        isPending: false,
        error: {}
      });
    }
    case categoriesConstants.REQUEST_CATEGORIE_UPDATE_COMPLETE: {
      return Object.assign({}, state, {
        categories: state.categories.map((moderateur) => {
          // tslint:disable-next-line:curly
          if (moderateur.id === action.payload['id'])
            return action.payload;
          return moderateur;
        }),
        isPending: false,
        error: {}
      });
    }
    case categoriesConstants.REQUEST_CATEGORIE_DELETE_COMPLETE: {
      return Object.assign({}, state, {
        categories: state.categories.filter((moderateur) => {
          return moderateur.id !== action.payload['id'];
        }),
        isPending: false,
        error: {}
      });
    }
    case categoriesConstants.REQUEST_CATEGORIE_CREATE_ERROR:
    case categoriesConstants.REQUEST_CATEGORIE_UPDATE_ERROR:
    case categoriesConstants.REQUEST_CATEGORIE_DELETE_ERROR:
    case categoriesConstants.REQUEST_CATEGORIE_ERROR:
    case categoriesConstants.REQUEST_CATEGORIES_ERROR: {
      return Object.assign({}, state, {
        isPending: false,
        error: action.payload
      });
    }

    default: {
      return state;
    }
  }

}


export const getCategorie = (state: State) => state.categorie;
export const getCategories = (state: State) => state.categories;
export const getCategorieStatus = (state: State) => state.isPending;
export const getCategorieError = (state: State) => state.error;
