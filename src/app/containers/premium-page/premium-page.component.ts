import {
  Component,
  OnInit,
  AfterViewInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/delay';
declare const jQuery: any;

import { Store } from '@ngrx/store';
import * as _ from 'lodash';
interface IServerResponse {
  items: Annonce[];
  total: number;
}

import { User } from '../../models/user';
import { Annonce } from '../../models/annonce';
import { Collection } from '../../models/collection';
import { Categorie } from '../../models/categorie';
import { Pays } from '../../models/pays';

import * as fromRoot from '../../reducers';
import { ApisService } from '../../services/apis.service';

import * as sessionConstants from '../../constants/sessions';
import * as sessionActions from '../../actions/session';
import * as annoncesActions from '../../actions/annonces';
import * as categoriesActions from '../../actions/categories';
import * as paysActions from '../../actions/pays';
import * as collectionsActions from '../../actions/collections';

@Component({
  selector: 'bo-premium-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './premium-page.component.html',
  styleUrls: ['./premium-page.component.css']
})
export class PremiumPageComponent implements OnInit {
  current_page = 1;
  filtre$ = 0;
  titre$: string;
  promoteForm: FormGroup;
  searchForm: FormGroup;
  user$: Observable<User>;
  config$: Observable<any>;
  stats$: Observable<any>;
  annonce$: Observable<Annonce>;
  annonces$: Observable<Annonce[]>;
  categories$: Observable<Categorie[]>;
  pays$: Observable<Pays[]>;
  collections$: Observable<Collection[]>;
  annonceStatus$: Observable<Boolean>;

  asyncAnnonces: Observable<Annonce[]>;
  annonce: Annonce;
  loading = false;
  loading_spinner = false;
  total: number;
  total_page: number;
  next = '';
  prev = '';
  count$: Observable<number>;
  status$: Observable<any>;
  nextPage$: Observable<string>;
  prevPage$: Observable<string>;
  selectedRow: number;
  filter: object = {};
  page: number = null;
  directionLinks = true;
  autoHide = false;


  constructor(private _store: Store<fromRoot.State>) {
    this.buildSearchForm();
    this.titre$ = 'Annonces premium';
    this.user$ = _store.select(fromRoot.getSessionUser);
    this.config$ = _store.select(fromRoot.getSessionConfig);
    this.nextPage$ = _store.select(fromRoot.getAnnoncesNext);
    this.prevPage$ = _store.select(fromRoot.getAnnoncesPrev);
    this.count$ = _store.select(fromRoot.getAnnoncesCount);
    this.stats$ = _store.select(fromRoot.getAnnoncesStats);
    this.status$ = _store.select(fromRoot.getAnnonceStatus);
    this.annonce$ = _store.select(fromRoot.getAnnonce);
    this.annonces$ = _store.select(fromRoot.getAnnonces);
    this.pays$ = _store.select(fromRoot.getPays);
    this.categories$ = _store.select(fromRoot.getCategories);
    this.collections$ = _store.select(fromRoot.getCollections);
    this.loading = true;
    this.filtre$ = 0;
    this.count$.subscribe(val => {
      if (val !== 0) {
        this.total = Math.ceil(val / 30);
        // tslint:disable-next-line:curly
      } else this.total = 0;
    });
    this.prevPage$.subscribe(val => (this.prev = val));
    this.nextPage$.subscribe(val => (this.next = val));
    this.status$.subscribe(val => {
      console.log(val);
      if (val === true) {
        this.loading = true;
        // tslint:disable-next-line:curly
      } else this.loading = false;
    });
  }

  ngOnInit() {
    this._store.dispatch(new sessionActions.RequestGetCurrentUserAction());
    this._store.dispatch(
      new annoncesActions.RequestAnnonces({ etat: 1, filter: 0 })
    );
    
    this._store.dispatch(new annoncesActions.RequestAnnoncesNext());
    this._store.dispatch(new annoncesActions.RequestAnnoncesPrev());
    this._store.dispatch(new annoncesActions.RequestGetAnnoncesEtatStats());
    this._store.dispatch(new categoriesActions.RequestCategories());
    this._store.dispatch(new paysActions.RequestPays());
    this._store.dispatch(new collectionsActions.RequestCollections());
  }

  getPage() {
    this.current_page += 1;
    this._store.dispatch(new annoncesActions.RequestAnnonces(this.next));
  }

  getPreviousPage() {
    this.current_page -= 1;
    this._store.dispatch(new annoncesActions.RequestAnnonces(this.prev));
  }

  search() {
    this._store.dispatch(new annoncesActions.RequestAnnonces(this.filter));
  }

  onFormSubmit(formValue) {
    console.log(formValue);
    const data = formValue;
    // tslint:disable-next-line:curly
    if (typeof (data['id'] === 'undefined')) data['id'] = this.annonce.id;
    this._store.dispatch(new annoncesActions.RequestPromotionCreate(data));
  }

  setClickedRow(index) {
    this.selectedRow = index;
  }

  goToPage() {
    let url: any = null;
    const subscription = this.nextPage$.subscribe(val => (url = val));
    subscription.unsubscribe();
    const newURL = this.updateURLParameter(url, 'page', this.page);
    this._store.dispatch(new annoncesActions.RequestAnnonces(newURL));
  }

  getAdList($event) {
    this.filtre$ = $event;
    this.searchForm.patchValue({
      filter: $event,
      etat : 1
    });
    this._store.dispatch(
      new annoncesActions.RequestAnnonces(this.searchForm.value)
    );
  }

  onSelectAnnonce(annonce: Annonce) {
    this.annonce = annonce;
    this._store.dispatch(
      new annoncesActions.RequestGetAnnoncePremium({ id: annonce.id })
    );
  }

  rePromote(annonce: Annonce) {
    this.annonce = annonce;
    this._store.dispatch(
      new annoncesActions.RequestGetAnnoncePremium({ id: annonce.id })
    );
  }

  stopPromoting(annonce: Annonce) {
    this.annonce = annonce;
    this._store.dispatch(
      new annoncesActions.RequestStopPromoting({ id: annonce.id })
    );
  }

  cancelPromoting(annonce: Annonce) {
    this.annonce = annonce;
    this._store.dispatch(
      new annoncesActions.RequestCancelPromoting({ id: annonce.id })
    );
  }

  onUpdateAnnonce(ad: Annonce) {
    this._store.dispatch(new annoncesActions.RequestGetAnnonce({ id: ad.id }));
  }

  buildSearchForm(): void {
    this.searchForm = new FormGroup({
      pays: new FormControl(''),
      categorie: new FormControl(''),
      keyword: new FormControl(''),
      etat: new FormControl(1),
      filter: new FormControl(this.filtre$)
    });

    this.searchForm.valueChanges.subscribe(data => (this.filter = data));
  }

  updateURLParameter(url, param, paramVal) {
    console.log(url);
    let newAdditionalURL = '';
    let tempArray = url.split('?');
    const baseURL = tempArray[0];
    const additionalURL = tempArray[1];
    let temp = '';
    if (additionalURL) {
      tempArray = additionalURL.split('&');
      for (let i = 0; i < tempArray.length; i++) {
        if (tempArray[i].split('=')[0] != param) {
          newAdditionalURL += temp + tempArray[i];
          temp = '&';
        }
      }
    }

    const rows_txt = temp + '' + param + '=' + paramVal;
    return baseURL + '?' + newAdditionalURL + rows_txt;
  }
}
