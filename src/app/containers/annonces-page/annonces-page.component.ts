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
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  ImageCompressService,
  ResizeOptions,
  ImageUtilityService,
  IImage,
  SourceImage
} from 'ng2-image-compress';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/delay';

import { Store } from '@ngrx/store';
import * as _ from 'lodash';

import { User } from '../../models/user';
import { Annonce } from '../../models/annonce';
import { Categorie } from '../../models/categorie';
import { Collection } from '../../models/collection';
import { Pays } from '../../models/pays';

import * as fromRoot from '../../reducers';

import * as sessionConstants from '../../constants/sessions';
import * as sessionActions from '../../actions/session';
import * as annoncesActions from '../../actions/annonces';
import * as categoriesActions from '../../actions/categories';
import * as collectionsActions from '../../actions/collections';
import * as paysActions from '../../actions/pays';
import * as customType from '../../models/constants';
import { updateURLParameter } from 'app/utils';
import { AnnonceService } from '../../services';

@Component({
  selector: 'bo-annonces-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './annonces-page.component.html',
  styleUrls: ['./annonces-page.component.css']
})
export class AnnoncesPageComponent implements OnInit {
  url$ = 0;
  current_page = 1;
  titre$: string;
  collectionForm: FormGroup;
  searchForm: FormGroup;
  user$: Observable<User>;
  config$: Observable<any>;
  stats$: Observable<any>;
  annonce: Annonce;
  ad: Annonce;
  annonce$: Observable<Annonce>;
  annonces$: Observable<Annonce[]>;
  categories$: Observable<Categorie[]>;
  categories: Categorie[];
  pays$: Observable<Pays[]>;
  collections$: Observable<Collection[]>;
  annonceStatus$: Observable<Boolean>;
  customType = customType;
  sub_categories: Array<Object>;
  editForm: FormGroup;
  imageForm: FormGroup;
  display_updload = 0;
  imgLoading = false;
  asyncAnnonces: Observable<Annonce[]>;
  loading = true;
  loading_spinner = false;
  status$: Observable<any>;
  total: number;
  total_page: number;
  next = '';
  prev = '';
  nextPage$: Observable<string>;
  prevPage$: Observable<string>;
  count$: Observable<number>;
  selectedRow: number;
  categorie_val: Categorie;
  categories_select = Array;
  sub_categorie: Categorie;
  filter: object = {};
  page: number = null;
  labels: any = {
    previousLabel: 'Previous',
    nextLabel: 'Next',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`
  };
  results: object;
  directionLinks = true;
  autoHide = false;
  deal_type_display = 0;
  placeholder = '../../../assets/img/no_image_available.png';
  selectedImage: any;
  processedImages: any = [];
  showTitle = false;

  constructor(
    private _store: Store<fromRoot.State>,
    private _apisService: AnnonceService,
    private imgCompressService: ImageCompressService
  ) {
    this.buildSearchForm();
    this.titre$ = 'Annonces';
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
    // this.loading = true;

    this.url$ = 0;
    this.categories$.subscribe(val => {
      this.categories = val;
    });
    this.count$.subscribe(val => {
      if (val !== 0) {
        this.total = Math.ceil(val / 30);
      } else { this.total = 0; }
    });

    this.status$.subscribe(val => {
      if (val === true) {
        this.loading = true;
      } else { this.loading = false; }
    });
    this.prevPage$.subscribe(val => (this.prev = val));
    this.nextPage$.subscribe(val => (this.next = val));
    this.annonce$.subscribe(val => {

      this.annonce = val;
      const annonce = val;
      if (val) {
        this.annonce = val;
        this.ad = val;
      }
    });
  }

  ngOnInit() {
    this._store.dispatch(new sessionActions.RequestGetCurrentUserAction());
    this._store.dispatch(new annoncesActions.RequestAnnonces({ etat: 0 }));
    this._store.dispatch(new annoncesActions.RequestAnnoncesNext());
    this._store.dispatch(new annoncesActions.RequestAnnoncesPrev());
    this._store.dispatch(new annoncesActions.RequestGetAnnoncesEtatStats());
    this._store.dispatch(new categoriesActions.RequestCategories());
    this._store.dispatch(new paysActions.RequestPays());
    this._store.dispatch(new collectionsActions.RequestCollections());
  }

  getPicture(annonce) {
    let picture = '';
    // tslint:disable-next-line:curly
    if (annonce.photo1 && annonce.photo1.thumb)
      picture = annonce.photo1.thumb;
    // tslint:disable-next-line:curly
    else if (!annonce.photo1.thumb && annonce.photo2 && annonce.photo2.thumb)
      picture = annonce.photo2.thumb;
    // tslint:disable-next-line:curly
    else if (!annonce.photo1.thumb && !annonce.photo2.thumb && annonce.photo3 && annonce.photo3.thumb)
      picture = annonce.photo3.thumb;
    // tslint:disable-next-line:curly
    else
      picture = this.placeholder;
    return picture;
  }

  onImageChange(fileInput: any) {
    const option: ResizeOptions = new ResizeOptions();
    option.Resize_Max_Height = 700;
    option.Resize_Max_Width = 450;
    option.Resize_Quality = 80;
    option.Resize_Type = 'image/png';
    const images: Array<IImage> = [];
    ImageCompressService.filesToCompressedImageSource(
      fileInput.target.files
    ).then(observableImages => {
      observableImages.subscribe(
        image => {
          images.push(image);
          this.imageForm.get('id').setValue(this.annonce.id);
          this.imageForm.get('name').setValue('photo' + this.display_updload);
          this.imageForm.get('avatar').setValue({
            filename: image.fileName,
            filetype: image.type,
            value: image.compressedImage.imageDataUrl.split(
              'data:image/jpeg;base64,/9j/'
            )[1]
          });
          console.log(this.imageForm.value);
        },
        error => {
          console.log('Error while converting');
        }
      );
    });
  }

  refreshCache() {
    this._store.dispatch(new annoncesActions.RequestAnnonceRefreshCache({}));
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

  setClickedRow(index) {
    this.selectedRow = index;
  }

  goToPage() {
    const url: any = null;
    this.current_page = this.page;
    const newURL = updateURLParameter(this.next, 'page', this.page);
    this._store.dispatch(new annoncesActions.RequestAnnonces(newURL));
  }

  getAdWaiting($event) {
    this.url$ = 0;
    this.searchForm.reset();
    this.searchForm.patchValue({
      etat: 0,
      categorie: '',
      pays: ''
    });
    this._store.dispatch(new annoncesActions.RequestAnnonces({ etat: 0 }));
  }

  getAllAd($event) {
    this.url$ = -1;
    this.searchForm.reset();
    this.searchForm.patchValue({
      etat: '',
      categorie: '',
      pays: ''
    });
    this._store.dispatch(new annoncesActions.RequestAnnonces());
  }

  getValidatedAd($event) {
    this.url$ = 1;
    this.searchForm.reset();
    this.searchForm.patchValue({
      etat: 1,
      categorie: '',
      pays: ''
    });
    this._store.dispatch(new annoncesActions.RequestAnnonces({ etat: 1 }));
  }

  getRejectedAd($event) {
    this.url$ = 2;
    this.searchForm.reset();
    this.searchForm.patchValue({
      etat: 2,
      categorie: '',
      pays: ''
    });
    this._store.dispatch(new annoncesActions.RequestAnnonces({ etat: 2 }));
  }

  getSignaledAd($event) {
    this.url$ = 4;
    this.searchForm.reset();
    this.searchForm.patchValue({
      etat: 4,
      categorie: '',
      pays: ''
    });
    this._store.dispatch(new annoncesActions.RequestAnnonces({ etat: 4 }));
  }

  onSelectAnnonce(annonce: Annonce) {
    this._store.dispatch(new annoncesActions.RequestGetAnnonce(annonce));
  }

  onUpdateAnnonce(ad: Annonce) {
    this._store.dispatch(new annoncesActions.RequestGetAnnonce({ id: ad.id }));
  }

  onFormSubmit(formValue: Object) {
    console.log(formValue);
    this._store.dispatch(new annoncesActions.RequestUpdateAnnonce(formValue));
    this._store.dispatch(new annoncesActions.RequestAnnonces({ etat: 1 }));
  }

  onResetAnnonce() {
    this._store.dispatch(new annoncesActions.RequestResetAnnonceComplete());
    this.annonce$ = null;
  }

  onCollectionFormSubmit(formValue) {
    const data = formValue;
    data.ad_id = this.ad.id;
    this._store.dispatch(
      new annoncesActions.RequestCreateAnnonceCollection(data)
    );
  }


  buildSearchForm(): void {
    this.searchForm = new FormGroup({
      pays: new FormControl(''),
      categorie: new FormControl(''),
      keyword: new FormControl(''),
      etat: new FormControl(this.url$)
    });

    this.searchForm.valueChanges.subscribe(data => (this.filter = data));
  }

  moderateAd(params) {
    this._store.dispatch(new annoncesActions.RequestUpdateAnnonce(params));
  }

  generateLink(ad) {
    if (ad) {
      this._store.dispatch(
        new annoncesActions.RequestLinkAnnonce({ id: ad })
      );
    }
  }

  submitImage(event) {
    const formModel = event;
    this._store.dispatch(
      new annoncesActions.RequestUpdatePictureAnnonce(formModel)
    );
  }

  deletePhoto(nbre) {
    const params = { id: this.annonce.id, name: 'photo' + nbre };
    this._store.dispatch(
      new annoncesActions.RequestDeletePictureAnnonce(params)
    );
  }

}
