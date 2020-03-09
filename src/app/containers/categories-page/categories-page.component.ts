import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import * as _ from 'lodash';

import { Categorie } from '../../models/categorie';

import * as fromRoot from '../../reducers';

import * as sessionActions from '../../actions/session';
import * as sessionConstants from '../../constants/sessions';
import * as categoriesActions from '../../actions/categories';


@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent implements OnInit {

  categorie: Observable<Categorie>;
  categories: Observable<Categorie[]>;
  categorieStatus: Observable<Boolean>;

  constructor(private _store: Store<fromRoot.State>) {
    this.categorie = _store.select(fromRoot.getCategorie);
    this.categories = _store.select(fromRoot.getCategories);
    this.categorieStatus = _store.select(fromRoot.getCategorieStatus);
  }

  ngOnInit() {
    this._store.dispatch(new categoriesActions.RequestCategories);
    console.log(this.categories);
  }

  onSelectCategorie(categorie: Categorie) {
    this._store.dispatch(new categoriesActions.RequestCategorie(categorie));
  }

}
