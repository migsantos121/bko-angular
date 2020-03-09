import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Freelancer, FreelancerEvent } from 'app/models/freelancer';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as fromRoot from '../../reducers';
import * as freelancerActions from '../../actions/freelancers';
import * as customType from '../../models/constants';
import { CountryService } from '../../services/country.service';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'bo-freelancers-page',
  templateUrl: './freelancers-page.component.html',
  styleUrls: ['./freelancers-page.component.css']
})
export class FreelancersPageComponent implements OnInit {
  status$: Observable<any>;
  freelancers$: Observable<Freelancer[]>;
  freelancer$: Observable<Freelancer>;
  freelancerEvents$: Observable<FreelancerEvent[]>;
  errors$: Observable<Object>;
  searchForm: FormGroup;
  addForm: FormGroup;
  titre = 'Freelancers';
  erreur = {};
  customType = customType;
  loading = true;
  currentUserId = JSON.parse(localStorage.getItem('bo::user'))['sub'];
  role = localStorage.getItem('bo::role');
  user_id = localStorage.getItem('bo::user_id');
  countries : any;

  constructor(private _store: Store<fromRoot.State>, private _countryService : CountryService) {
    this.status$ = _store.select(fromRoot.getFreelancerStatus);
    this.freelancers$ = _store.select(fromRoot.getFreelancers);
    this.freelancerEvents$ = _store.select(fromRoot.getFreelancerEvents);
    this.freelancer$ = _store.select(fromRoot.getFreelancer);
    this.errors$ = _store.select(fromRoot.getFreelancerError);
    this.errors$.subscribe(val => {
      if (val && val['_body']) {
        console.log(JSON.parse(val['_body']));
        this.erreur = JSON.parse(val['_body']);
      }
    });
  }

  ngOnInit() {
    if(!this.isFreelancer())
      this._store.dispatch(new freelancerActions.RequestFreelancers());
    else
      this._store.dispatch(new freelancerActions.RequestFreelancer(this.user_id));

    this._countryService.getCountryData().subscribe(res => {
      this.countries = res;
    }, err => {
      console.log(err);
      return false;
    });
  }

  onFormSubmit(value) {
    console.log(value);
  }

  addNewUser() {
    this._store.dispatch(new freelancerActions.RequestResetFreelancer());
    this._store.dispatch(new freelancerActions.RequestNewFreelancer());
  }

  isFreelancer() {
    return this.role === 'freelancer';
  }

  convertCountryCodeToName(code) {
    if(this.countries != undefined){
      for(let country of this.countries)
        if(country.code == code)
          return country.name;
    }
  }

  editer(user) {
    this._store.dispatch(new freelancerActions.RequestFreelancer(user.user_id));
  }

}
