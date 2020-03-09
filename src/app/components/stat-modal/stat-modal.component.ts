import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ViewChild } from '@angular/core';
import { DaterangePickerComponent } from 'ng2-daterangepicker';
import { Freelancer, FreelancerEvent } from 'app/models/freelancer';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as freelancerActions from '../../actions/freelancers';
import * as customType from '../../models/constants';
declare var moment;
@Component({
  selector: 'bo-stat-modal',
  templateUrl: './stat-modal.component.html',
  styleUrls: ['./stat-modal.component.css']
})
export class StatModalComponent implements OnInit {
  @Input() user: Freelancer;
  @Input() erreur = {};
  @Output() onFormSubmit = new EventEmitter();
  @ViewChild(DaterangePickerComponent)
  private picker: DaterangePickerComponent;

  addForm: FormGroup;
  formErrors = { ad_id: '', collection: '' };
  new_user = true;
  password = '';
  message = '';
  titre = 'Freelancer Event';
  daterange: any = {};
  freelancerEvents$: Observable<FreelancerEvent[]>;
  disableFilter = true;

  objectKey =Object.keys;
  public options: any = {
    locale: { format: 'DD/MM/YYYY' },
    alwaysShowCalendars: false,
  };
  constructor(private _store: Store<fromRoot.State>) {
    this.buildForm();
    this.freelancerEvents$ = _store.select(fromRoot.getFreelancerEvents);
  }

  ngAfterViewInit() {
    var startDate = new Date();
    var endDate = new Date();
    startDate.setMonth(startDate.getMonth()-1);
    this.picker.datePicker.setEndDate(moment(endDate));
    this.picker.datePicker.setStartDate(moment(startDate));
    this.daterange.start = moment(startDate),
    this.daterange.end = moment(endDate);
  }
  ngOnInit() {
    this.message = '';
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user'] && changes['user'].currentValue) {
      this.message = '';
      this.addForm.reset();
      const user = changes['user'].currentValue['data'];
      this.new_user = false;
      this.titre = 'Freelancer Event';
      this.addForm.patchValue({
        username: user.username
      });
      this.addForm.controls['username'].disable();
      this.disableFilter = true;
    }
  }

  buildForm(): void {
    this.addForm = new FormGroup({
      username: new FormControl('', Validators.required),
    });

    this.addForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.addForm) {
      return;
    }
  }

  public selectedDate(value: any, datepicker?: any) {
    datepicker.start = value.start;
    datepicker.end = value.end;

    this.daterange.start = value.start;
    this.daterange.end = value.end;
    this.daterange.label = value.label;
    this.disableFilter = true;
    console.log(this.daterange);
  }

  async submitForm(value) {
    this.disableFilter = false;
    const data = {
      date_start : this.daterange.start.format('X'),
      date_end : this.daterange.end.format('X'),
      commercial_code: value.username
    };

    await this._store.dispatch(new freelancerActions.RequestFreelancerEvents(data));

  }

  testfunc(events){
    var install :any = {}
    for(let event of events) {
      if(install[moment.unix(event.timestamp).format('YYYY/MM/DD')] == undefined)
      install[moment.unix(event.timestamp).format('YYYY/MM/DD')] = 1;
      else
      install[moment.unix(event.timestamp).format('YYYY/MM/DD')] += 1;
      // console.log(moment.unix(event.timestamp).format('YYYY/MM/DD'));
    }
    return install;
  }

}


