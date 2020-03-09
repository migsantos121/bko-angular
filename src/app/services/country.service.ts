import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class CountryService {
	constructor(private http: Http){
	}

	getCountryData() {
		const url = "../assets/country/country.json";
		return this.http.get(url).map(res => res.json());
	}
}
