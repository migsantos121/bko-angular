import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

import { SessionService } from './services';
/*
* AppComponent est composant de base de l'application, il definit le template
* html auquel va etre intégré tous les templates des composants fils.
*
*/
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @Input() title: any;
  constructor(public _apisService: SessionService) {
  }

  ngOnInit() {
  }


}
