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
import { saveAs } from 'file-saver/FileSaver';
import { Http, Headers } from '@angular/http';
import { Store } from '@ngrx/store';

import { Categorie } from '../../models/categorie';
import { Pays } from '../../models/pays';

import * as fromRoot from '../../reducers';
import * as exportActions from '../../actions/export';
import * as categoriesActions from '../../actions/categories';
import * as paysActions from '../../actions/pays';
import * as _ from 'lodash';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'bo-export-push',
  templateUrl: './export-push.component.html',
  styleUrls: ['./export-push.component.css']
})
export class ExportPushComponent implements OnInit {
  titre$ = 'Export/Push';
  exportUserForm: FormGroup;
  sendNotifForm: FormGroup;
  exportReportForm: FormGroup;
  exportSearchForm: FormGroup;
  exportAdsForm: FormGroup;
  pays$: Observable<Pays[]>;
  categories$: Observable<Categorie[]>;
  SERVER_URL: string = environment.SERVER_URL;
  daterange: any = {};
  options: any = {
    locale: { format: 'YYYY-MM-DD' },
    alwaysShowCalendars: false,
  };

  constructor(private http: Http, private _store: Store<fromRoot.State>) {
    this.buildExportUserForm();
    this.pays$ = _store.select(fromRoot.getPays);
    this.categories$ = _store.select(fromRoot.getCategories);
  }

  ngOnInit() {
    this._store.dispatch(new categoriesActions.RequestCategories());
    this._store.dispatch(new paysActions.RequestPays());
  }

  buildExportUserForm() {
    this.exportUserForm = new FormGroup({
      from: new FormControl(''),
      to: new FormControl(''),
      filtreActionUser: new FormControl('')
    });
    this.sendNotifForm = new FormGroup({
      title: new FormControl(''),
      target: new FormControl(''),
      message: new FormControl('')
    });
    this.exportReportForm = new FormGroup({
      from: new FormControl(''),
      to: new FormControl(''),
      mail: new FormControl(''),
      pays: new FormControl('')
    });
    this.exportSearchForm = new FormGroup({
      from_to: new FormControl(''),
      // to: new FormControl(""),
      pays: new FormControl('')
    });
    this.exportAdsForm = new FormGroup({
      from: new FormControl(''),
      to: new FormControl(''),
      pays: new FormControl(''),
      categorie: new FormControl(''),
      onlyaccepted: new FormControl(''),
    });
  }

  onFormSubmit(value) {
    const data = value;
    console.log(this.daterange);
    data.from = this.daterange.start.format('YYYY-MM-DD');
    data.to = this.daterange.end.format('YYYY-MM-DD');
    const url = `${this.SERVER_URL}/export_user/?filtre=${data.filtreActionUser}&debut=${data.from}&fin=${data.to}`;
    this.saveFile(url, 'export_users');
  }

  onNotifFormSubmit(value) {
    const data = value;
    const token = localStorage.getItem('bo::token');
    const url = `${this.SERVER_URL}/api/bo/send_push/`;
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);
    this.http.post(url, data, { headers: headers })
      .toPromise()
      .then(response => this._store.dispatch(new exportActions.RequestSendNotifComplete({})));
  }

  onReportFormSubmit(value) {
    const data = value;
    const token = localStorage.getItem('bo::token');
    console.log(this.daterange);
    data.from = this.daterange.start.format('YYYY-MM-DD');
    data.to = this.daterange.end.format('YYYY-MM-DD');
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);
    const url = `${this.SERVER_URL}/export_report/?mail=${data.mail}&pays=${data.pays}&debut=${data.from}&fin=${data.to}`;
    this.http.get(url, { headers: headers })
      .toPromise()
      .then(response => this._store.dispatch(new exportActions.RequestSendReportComplete({})));
  }

  onAdsFormSubmit(value) {
    const data = value;
    console.log(this.daterange);
    data.from = this.daterange.start.format('YYYY-MM-DD');
    data.to = this.daterange.end.format('YYYY-MM-DD');
    // tslint:disable-next-line:max-line-length
    const url = `${this.SERVER_URL}/export_ad/?only-accepted=${data.onlyaccepted}&cat=${data.categorie}&pays=${data.pays}&debut=${data.from}&fin=${data.to}`;
    this.saveFile(url, 'export_annonces');
  }

  onSearchFormSubmit(value) {
    const data = value;
    console.log(this.daterange);
    data.from = this.daterange.start.format('YYYY-MM-DD');
    data.to = this.daterange.end.format('YYYY-MM-DD');
    console.log(data);
    const url = `${this.SERVER_URL}/export_search/?pays=${data.pays}&debut=${data.from}&fin=${data.to}`;
    this.saveFile(url, 'export_recherches');
  }

  saveFile(url, filename) {
    const token = localStorage.getItem('bo::token');
    const headers = new Headers();
    headers.append('Accept', 'text/plain');
    headers.append('Authorization', `Bearer ${token}`);
    this.http.get(url, { headers: headers })
      .toPromise()
      .then(response => this.saveToFileSystem(response, filename));
  }

  private saveToFileSystem(response, filename) {
    const blob = new Blob([response._body], { type: 'text/csv' });
    saveAs(blob, filename);
  }

  public selectedDate(value: any, datepicker?: any) {
    datepicker.start = value.start;
    datepicker.end = value.end;

    this.daterange.start = value.start;
    this.daterange.end = value.end;
    this.daterange.label = value.label;
  }


}
