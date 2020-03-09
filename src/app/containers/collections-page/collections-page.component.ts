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
import { NgForm } from '@angular/forms';

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

declare const jQuery: any;
import * as fromRoot from '../../reducers';
import { ApisService } from '../../services/apis.service';

import * as sessionConstants from '../../constants/sessions';
import * as sessionActions from '../../actions/session';
import * as annoncesActions from '../../actions/annonces';
import * as categoriesActions from '../../actions/categories';
import * as collectionsActions from '../../actions/collections';
import * as paysActions from '../../actions/pays';
import { MomentModule } from '../../../../node_modules/angular2-moment';

@Component({
  selector: 'app-collections-page',
  templateUrl: './collections-page.component.html',
  styleUrls: ['./collections-page.component.css']
})
export class CollectionsPageComponent implements OnInit {
  pays$: Observable<Pays[]>;
  originPays: Pays[];
  editCollection: Collection;
  collection: Collection;
  collection$: Observable<Collection>;
  collections$: Observable<Collection[]>;
  collectionStatus$: Observable<Boolean>;
  user$: Observable<User>;
  config$: Observable<any>;
  status$: Observable<any>;
  recherche = '';
  loading = false;
  titre$ = '';
  titre: string;
  description: string;
  pays: any;
  tmpPhoto: object = {};
  collectionForm: FormGroup;
  editCollectionForm: FormGroup;
  ngForm: NgForm;
  daterange: any = {};
  editdaterange: any = {};
  editFormDateRange: string;
  edithomepagesponsoring: boolean;

  editFormErrors = {
    titre: '',
    pays: '',
    photo: ''
  };
  formErrors = {
    titre: '',
    pays: '',
    photo: '',
  };

  validationMessages = {
    titre: {
      required: 'Le titre est obligatoire.'
    },
    pays: {
      required: '`Le pays est obligatoire.`'
    },
    photo: {
      required: '`La photo est obligatoire.`'
    }
  };
  constructor(private _store: Store<fromRoot.State>) {
    this.titre$ = 'Collections';
    this.buildForm();
    // this.buildEditForm();
    this.user$ = _store.select(fromRoot.getSessionUser);
    this.config$ = _store.select(fromRoot.getSessionConfig);
    this.collection$ = _store.select(fromRoot.getCollection);
    this.collections$ = _store.select(fromRoot.getCollections);
    this.pays$ = _store.select(fromRoot.getPays);
    this.status$ = _store.select(fromRoot.getCollectionStatus);
    this.loading = true;
    this.status$.subscribe(val => {
      if (val === true) {
        this.loading = true;
      } else {
        this.loading = false;
      }
    });
    this.collection$.subscribe(val => {
      if ( val ) {
        this.collection = val;
      }
    });
    this.pays$.subscribe(data => {
      if ( data ) {
        this.originPays = data;
      }
    });
  }

  onSelectCollection(collection: Collection) {
    this._store.dispatch(new collectionsActions.RequestCollection(collection));
  }

  search() {
    this._store.dispatch(
      new collectionsActions.RequestCollections(this.recherche)
    );
  }

  reset() {
    this._store.dispatch(new collectionsActions.RequestCollections());
  }

  setCollection(collection: Collection) {
    this.editCollection = collection;
    this.edithomepagesponsoring = this.editCollection.homepage_sponsoring;
    for(let i of this.originPays){
      if( i.id === collection.pays.id ){
        this.pays = i.id;
      }
    }
    this.titre = collection.titre;
    this.description = collection.description;

    this.editFormErrors = {
      titre: '',
      pays: '',
      photo: ''
    };
    this.setEditFormDateRange();
    jQuery('.bd-modal-edit-form').modal('show');
  }

  setEditFormDateRange() {
    this.daterange = {};
    let start_sponsoring, end_sponsoring;
    if ( this.editCollection.start_sponsoring !== undefined && this.editCollection.end_sponsoring !== undefined ) {
      start_sponsoring = this.editCollection.start_sponsoring.split('T')[0];
      end_sponsoring = this.editCollection.end_sponsoring.split('T')[0];
      this.editFormDateRange = `${start_sponsoring} - ${end_sponsoring}`;
    } else {
      start_sponsoring = this.formatDate(Date.now(), '/');
      end_sponsoring = this.formatDate(Date.now(), '/');
      this.editFormDateRange = `${start_sponsoring} - ${end_sponsoring}`;
    }
  }

  deleteCollection(collection: Collection) {
    this._store.dispatch(
      new collectionsActions.RequestCollectionsDelete(collection)
    );
  }

  ngOnInit() {
    this._store.dispatch(new paysActions.RequestPays());
    this._store.dispatch(new collectionsActions.RequestCollections());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['collection'] && changes['collection'].currentValue) {
      const collection = changes['collection'].currentValue;
      this.collectionForm.patchValue({
        id: collection['id'],
        titre: collection['titre'],
        photo: collection['photo'],
        prix: collection['prix'],
        description: collection['description'],
        pays: collection['pays'],
        start_sponsoring: new Date(),
        end_sponsoring: new Date(),
        homepage_sponsoring: true,
        token: ''
      });
    }
  }

  onFormSubmit(formValue) {
    if (formValue.homepage_sponsoring) {
      if(this.daterange.start == undefined || this.daterange.end == undefined) {
        formValue.start_sponsoring = this.formatDatePost(Date.now(), '-');
        formValue.end_sponsoring = this.formatDatePost(Date.now(), '-');
      } else {
        formValue.start_sponsoring = this.daterange.start.format('YYYY-MM-DD');
        formValue.end_sponsoring = this.daterange.end.format('YYYY-MM-DD');
      }
    }
    console.log(formValue);
    this._store.dispatch(
      new collectionsActions.RequestCollectionsCreate(formValue)
    );
    this.collectionForm.reset();
    // this.onUpdateAnnonce.emit(this.collection);
  }

  onEditFormSubmit(editForm: NgForm) {
    let data: object = {};
    data = editForm.value;
    let flag = false;
    if (this.pays == '') {
      this.editFormErrors['pays'] = this.validationMessages['pays'].required;
      flag = true;
    }
    if (this.titre == '') {
      this.editFormErrors['titre'] = this.validationMessages['titre'].required;
      flag = true;
    }
    if (flag) {
      return;
    }

    if(data['homepage_sponsoring']) {
      if(this.editdaterange.start !== undefined &&  this.editdaterange.end !== undefined) {
        data['start_sponsoring'] = this.editdaterange.start.format('YYYY-MM-DD');
        data['end_sponsoring'] = this.editdaterange.end.format('YYYY-MM-DD');
      } else {
        data['start_sponsoring'] = this.formatDatePost(Date.now(), '-');
        data['end_sponsoring'] = data['start_sponsoring'];
      }
    }
    console.log(editForm.value);
    data['photo'] = this.tmpPhoto;
    data['token'] = localStorage.getItem('bo::token');
    data['id'] = this.editCollection.id;
    this._store.dispatch(new collectionsActions.RequestCollectionsUpdate(data));
    // this.onUpdateAnnonce.emit(this.collection);
    this.editdaterange = {};
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.collectionForm.get('photo').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        });
      };
    } else {
      this.formErrors['photo'] = this.validationMessages['photo']['required'];
    }

  }

  buildForm(): void {
    const token = sessionStorage.getItem('bo::token');
    this.collectionForm = new FormGroup({
      id: new FormControl(''),
      titre: new FormControl('', Validators.required),
      description: new FormControl(''),
      pays: new FormControl('', Validators.required),
      photo: new FormControl('', Validators.required),
      token: new FormControl(token),
      start_sponsoring: new FormControl(''),
      end_sponsoring: new FormControl(''),
      homepage_sponsoring: new FormControl(true)
    });

    this.collectionForm.valueChanges.subscribe(data =>
      this.onValueChanged(data)
    );
    this.onValueChanged();

  }

  onValueChanged(data?: any) {
    if (!this.collectionForm) {
      return;
    }
    const form = this.collectionForm;

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        // tslint:disable-next-line:forin
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  onFileChangeEdit(event) {
    console.log("Edit Form Photo change");
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.tmpPhoto = {
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        };
      };
    } else {
      this.editFormErrors['photo'] = this.validationMessages['photo']['required'];
    }
  }

  onDeleteAdFromCollection(adId) {
    const collectionId = document.getElementById('collectionId').innerHTML;
    const params = { ad_id: adId, collection_id: collectionId };
    this._store.dispatch(
      new collectionsActions.RequestDeleteAnnonceFromCollection(params)
    );
  }
  
  public selectedDate(value: any, datepicker?: any) {
    datepicker.start = value.start;
    datepicker.end = value.end;
  }

  formatDate(date, splitter) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2 ) {
      day = '0' + day;
    }
    return [month, day, year].join(splitter);
  }
  formatDatePost(date, splitter) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2 ) {
      day = '0' + day;
    }
    return [year, month, day].join(splitter);
  }
  getYYMMDD(date: string) {
    return date.split('T')[0];
  }
}
