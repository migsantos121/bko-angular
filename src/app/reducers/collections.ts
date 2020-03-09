import * as collectionsActions from '../actions/collections';
import * as collectionsConstants from '../constants/collections';

import { Collection } from '../models/collection';

export interface State {
  collection: Collection;
  collections: Collection[];
  next: '';
  prev: '';
  isPending: boolean;
  error: Object;
}

const collectionInitialState: State = {
  collection: null,
  collections: null,
  next: '',
  prev: '',
  isPending: false,
  error: {}
};

export function reducer(
  state = collectionInitialState,
  action: collectionsActions.Actions
) {
  switch (action.type) {
    case collectionsConstants.REQUEST_COLLECTION:
    case collectionsConstants.REQUEST_COLLECTION_CREATE:
    case collectionsConstants.REQUEST_COLLECTION_UPDATE:
    case collectionsConstants.REQUEST_COLLECTION_DELETE:
    case collectionsConstants.REQUEST_COLLECTIONS:
    case collectionsConstants.REQUEST_DELETE_ANNONCE_FROM_COLLECTION:{
      return Object.assign({}, state, {
        isPending: true
      });
    }
    case collectionsConstants.REQUEST_COLLECTIONS_COMPLETE: {
      return Object.assign({}, state, {
        collections: action.payload['results'],
        next: action.payload['next'],
        prev: action.payload['previous'],
        isPending: false,
        error: {}
      });
    }

    case collectionsConstants.REQUEST_COLLECTION_COMPLETE: {
      console.log(action.payload);
      return Object.assign({}, state, {
        collection: action.payload,
        isPending: false,
        error: {}
      });
    }
    case collectionsConstants.REQUEST_COLLECTION_CREATE_COMPLETE: {
      return Object.assign({}, state, {
        collections: [action.payload['collection'], ...state.collections],
        isPending: false,
        error: {}
      });
    }
    case collectionsConstants.REQUEST_DELETE_ANNONCE_FROM_COLLECTION_COMPLETE: {
      console.log(action.payload);
      return Object.assign({}, state, {
        collection: action.payload['current_state'],
        isPending: false,
        error: {}
      });
    }
    case collectionsConstants.REQUEST_COLLECTION_UPDATE_COMPLETE: {
      return Object.assign({}, state, {
        collections: state.collections.map(collection => {
          // tslint:disable-next-line:curly
          if (collection.id === action.payload['collection']['id'])
            return action.payload['collection'];
          return collection;
        }),
        isPending: false,
        error: {}
      });
    }
    case collectionsConstants.REQUEST_COLLECTION_DELETE_COMPLETE: {
      return Object.assign({}, state, {
        collections: state.collections.filter(collection => {
          return collection.id !== action.payload['id'];
        }),
        isPending: false,
        error: {}
      });
    }
    case collectionsConstants.REQUEST_COLLECTION_CREATE_ERROR:
    case collectionsConstants.REQUEST_COLLECTION_UPDATE_ERROR:
    case collectionsConstants.REQUEST_COLLECTION_DELETE_ERROR:
    case collectionsConstants.REQUEST_COLLECTION_ERROR:
    case collectionsConstants.REQUEST_COLLECTIONS_ERROR: 
    case collectionsConstants.REQUEST_DELETE_ANNONCE_FROM_COLLECTION_ERORR:{
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

export const getCollection = (state: State) => state.collection;
export const getCollections = (state: State) => state.collections;
export const getCollectionStatus = (state: State) => state.isPending;
export const getCollectionError = (state: State) => state.error;
