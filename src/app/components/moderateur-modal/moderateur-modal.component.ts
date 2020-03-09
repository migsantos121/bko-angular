import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { User } from 'app/models/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';


@Component({
  selector: 'bo-moderateur-modal',
  templateUrl: './moderateur-modal.component.html',
  styleUrls: ['./moderateur-modal.component.css']
})
export class ModerateurModalComponent implements OnInit {
  @Input() user: User;
  @Input() erreur = {};
  @Output() onFormSubmit = new EventEmitter();
  addForm: FormGroup;
  formErrors = { ad_id: '', collection: '' };
  new_user = true;
  password = '';
  message = '';
  titre = 'Ajouter un moderateur';
  countries : any;
  constructor(private _countryService: CountryService) {
    this.buildForm();
  }

  ngOnInit() {
    this._countryService.getCountryData().subscribe(res => {
      this.countries = res;
    }, err => {
      console.log(err);
      return false;
    });
    this.message = '';
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user'] && changes['user'].currentValue) {
      this.message = '';
      this.addForm.reset();
      const user = changes['user'].currentValue['data'];
      this.new_user = false;
      this.titre = 'Editer un moderateur';
      this.addForm.patchValue({
        user_id: user.user_id,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role,
        username: user.username,
        country: user.country
      });
      this.addForm.controls['username'].disable();
    } else if (changes['user'] && changes['user'].currentValue == null) {
      this.new_user = true;
      this.message = '';
      this.addForm.controls['username'].enable();
      this.titre = 'Ajouter un moderateur';
      this.addForm.reset();
    }
    if (changes['erreur'] && changes['erreur'].currentValue) {
      this.message = changes['erreur'].currentValue['message'];
    }
  }

  buildForm(): void {
    this.addForm = new FormGroup({
      user_id: new FormControl(''),
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.minLength(6), Validators.maxLength(30)]),
      confirm_password: new FormControl('', [Validators.minLength(6), Validators.maxLength(30)]),
      country: new FormControl('', Validators.required)
    }, this.passwordMatchValidator);

    this.addForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }



  onValueChanged(data?: any) {
    if (!this.addForm) {
      return;
    }
  }
  passwordMatchValidator(fg: FormGroup) {
    return fg.get('password').value === fg.get('confirm_password').value ? null : { 'mismatch': true };
  };

  submitForm(value) {
    console.log(value)
    const formValue = value;
    if (typeof formValue.password === 'object') {
      delete formValue.confirm_password;
      delete formValue.password;
    }

    if (this.new_user) {
      this.addForm.reset();
    }
    this.message = '';
    this.onFormSubmit.emit(formValue);
  }

}


