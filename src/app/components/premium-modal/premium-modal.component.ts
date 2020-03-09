import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ViewChild } from '@angular/core';
import { Annonce } from 'app/models/annonce';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare var moment;
@Component({
  selector: 'bo-premium-modal',
  templateUrl: './premium-modal.component.html',
  styleUrls: ['./premium-modal.component.css']
})

export class PremiumModalComponent implements OnInit {
  @ViewChild('pForm') myForm;
  @Input() annonce: Annonce;
  @Output() onFormSubmit = new EventEmitter();
  promoteForm: FormGroup;
  daterange: any = {};
  options: any = {
    locale: { format: 'YYYY-MM-DD' },
    alwaysShowCalendars: false,
    autoUpdateInput: false
  };
  protomotionDate: string;

  formErrors = {
    ad_id: '',
    collection: ''
  };

  validationMessages = {
    collection: {
      required: 'La collection est obligatoire.'
    }
  };

  constructor() {
    this.buildForm();
  }

  ngOnInit() {
  }


  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
      if (changes['annonce'] && changes['annonce'].currentValue) {
      const annonce = changes['annonce'].currentValue;
      this.promoteForm.patchValue({
        ad_id: '',
        start_date: new Date(),
        end_date: new Date(),
        homepage: false
      });
    }
  }

  buildForm(): void {
    this.promoteForm = new FormGroup({
      ad_id: new FormControl(''),
      start_date: new FormControl('', Validators.required),
      end_date: new FormControl('', Validators.required),
      homepage: new FormControl('', Validators.required)
    });

    this.promoteForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.promoteForm) {
      return;
    }

    const form = this.promoteForm;

    for (const field of Object.keys(this.formErrors)) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key of Object.keys(control.errors)) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  submitForm(value) {
    console.log(value);
    if (this.daterange.start === undefined || this.daterange.end === undefined) {
      alert('Choisissez une date de début et une date de fin');
      return;
    }

    const formValue = value;
    formValue.start_date = this.daterange.start.format('YYYY-MM-DD');
    formValue.end_date = this.daterange.end.format('YYYY-MM-DD');
    this.onFormSubmit.emit(formValue);
    this.promoteForm.reset();
    this.protomotionDate = '';
    // this.promoteForm.patchValue({end_date: new Date()});
  }

  public selectedDate(value: any, datepicker?: any) {
    datepicker.start = value.start;
    datepicker.end = value.end;

    this.daterange.start = value.start;
    this.daterange.end = value.end;
    this.daterange.label = value.label;
    
    this.protomotionDate = value.start.format('YYYY-MM-DD') + ' - ' + value.end.format('YYYY-MM-DD');
  }

}
