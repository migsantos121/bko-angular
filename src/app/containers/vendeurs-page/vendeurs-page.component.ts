import {
  Component,
  OnInit,
  AfterViewInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  ElementRef
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';

import { Vendeur } from '../../models/vendeur';
import { Pays } from '../../models/pays';
import { User } from '../../models/user';

import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import * as fromRoot from '../../reducers';

import * as sessionConstants from '../../constants/sessions';
import * as sessionActions from '../../actions/session';
import * as vendeurActions from '../../actions/vendeurs';
import * as activiteActions from '../../actions/activites';
import * as annoncesActions from '../../actions/annonces';
import * as paysActions from '../../actions/pays';
import { updateURLParameter } from 'app/utils';
import { Annonce } from 'app/models/annonce';
import { Activite } from 'app/models/activite';

@Component({
  selector: 'bo-vendeurs-page',
  templateUrl: './vendeurs-page.component.html',
  styleUrls: ['./vendeurs-page.component.css', '../../../assets/styles/apps/tickets.css']
})
export class VendeursPageComponent implements OnInit {
  current_page = 1;
  recherche: any;
  titre$: string;
  searchForm: FormGroup;
  user$: Observable<User>;
  config$: Observable<any>;
  pays$: Observable<Pays[]>;
  vendeurs$: Observable<Vendeur[]>;
  export_vendeurs$: Observable<Vendeur[]>;
  vendeur$: Observable<Vendeur>;
  vendeurStatus$: Observable<Boolean>;
  annonces$: Observable<Annonce[]>;
  activites$: Observable<Activite[]>;
  vendeur: Vendeur;
  vendeurs = [];
  loading = false;
  total: number;
  total_page: number;
  next = '';
  prev = '';
  page: number = null;
  status$: Observable<any>;
  nextPage$: Observable<string>;
  prevPage$: Observable<string>;
  count$: Observable<number>;
  filter: object = {};
  finished = false;
  selector = '.main-panel';

  constructor(private _store: Store<fromRoot.State>, private elm: ElementRef) {
    this.buildSearchForm();
    this.titre$ = 'Vendeurs';
    this.user$ = _store.select(fromRoot.getSessionUser);
    this.config$ = _store.select(fromRoot.getSessionConfig);
    this.nextPage$ = _store.select(fromRoot.getVendeursNext);
    this.annonces$ = _store.select(fromRoot.getAnnonces);
    this.activites$ = _store.select(fromRoot.getActivites);
    this.prevPage$ = _store.select(fromRoot.getVendeursPrev);
    this.count$ = _store.select(fromRoot.getVendeursCount);
    this.status$ = _store.select(fromRoot.getVendeurStatus);
    this.vendeur$ = _store.select(fromRoot.getVendeur);
    this.vendeurs$ = _store.select(fromRoot.getVendeurs);
    this.export_vendeurs$ = _store.select(fromRoot.getVendeursExport);
    this.pays$ = _store.select(fromRoot.getPays);
    this.loading = true;
    this.count$.subscribe(val => {
      if (val !== 0) {
        this.total = Math.ceil(val / 30);
        // tslint:disable-next-line:curly
      } else this.total = 0;
    });
    this.status$.subscribe(val => {
      if (val === true) {
        this.loading = true;
        // tslint:disable-next-line:curly
      } else
        this.loading = false;
    });
    this.prevPage$.subscribe(val => (this.prev = val));
    this.nextPage$.subscribe(val => (this.next = val));
    this.vendeur$.subscribe(val => {
      this.vendeur = val;
    });
    this.vendeurs$.subscribe(val => {
      if (val) {
        this.vendeurs = this.vendeurs.concat(val);
      }
    });
    this.export_vendeurs$.subscribe(
      val => {
        if (val) {
          new Angular2Csv(val, 'My Report', { headers: Object.keys(val[0]) });
        }
      });

  }

  ngOnInit() {
    this._store.dispatch(new sessionActions.RequestGetCurrentUserAction());
    this._store.dispatch(new vendeurActions.RequestVendeurs());
    this._store.dispatch(new vendeurActions.RequestVendeursNext());
    this._store.dispatch(new vendeurActions.RequestVendeursPrev());
    this._store.dispatch(new paysActions.RequestPays());
  }

  onScroll() {
    console.log('scrolled!!');
  }

  onSelectVendeur(vendeur: Vendeur) {
    this._store.dispatch(new vendeurActions.RequestVendeur(vendeur));
    this._store.dispatch(
      new activiteActions.RequestActivites({ user_id: vendeur.id, page_size: 5 })
    );
    this._store.dispatch(
      new annoncesActions.RequestAnnonces({ user_id: vendeur.id, page_size: 5 })
    );
  }

  export() {
    console.log(this.searchForm.value);
    this._store.dispatch(new vendeurActions.RequestVendeursExport(this.searchForm.value));
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  getPage() {
    this.current_page += 1;
    this._store.dispatch(new vendeurActions.RequestVendeurs(this.next));
  }

  getPreviousPage() {
    this.current_page -= 1;
    console.log(this.prev);
    this._store.dispatch(new vendeurActions.RequestVendeurs(this.prev));
  }

  goToPage() {
    const url: any = null;
    this.current_page = this.page;
    const newURL = updateURLParameter(this.next, 'page', this.page);
    this._store.dispatch(new vendeurActions.RequestVendeurs(newURL));
  }

  search(formValue) {
    console.log(this.filter);
    this.vendeurs = [];
    this._store.dispatch(new vendeurActions.RequestVendeurs(this.filter));
  }

  reset() {
    this.vendeurs = [];
    this._store.dispatch(new vendeurActions.RequestVendeurs());
  }

  buildSearchForm(): void {
    this.searchForm = new FormGroup({
      pays: new FormControl(''),
      keyword: new FormControl(''),
      last_signin: new FormControl(''),
      last_posting: new FormControl(''),
      inscrit_moins_de: new FormControl(''),
      nbre_annonces: new FormControl(''),
      nbre_produits_vendus: new FormControl('')
    });
    this.searchForm.valueChanges.subscribe(data => (this.filter = data));
  }
}
