import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Store } from '@ngrx/store';
import { go } from '@ngrx/router-store';
import * as fromRoot from '../../reducers';
import { Observable } from 'rxjs/Observable';
import * as dashboardActions from '../../actions/dashboard';


@Component({
  selector: 'bo-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  titre$: string;
  data: {};
  keywords$: Observable<Array<any>>;
  dashboard_data$: Observable<Object>;
  vendeur_acheteurs: any[];
  top_five: any[];
  top_five_users: any[];
  view: any[] = ['100%', '100%'];

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Pays';
  showYAxisLabel = true;
  yAxisLabel = 'Annonces';
  yAxisLabel2 = 'Utilisateurs';


  id = 'chart1';
  width = '100%';
  height = 400;
  type = 'mscombi2d';
  dataFormat = 'json';
  dataSource;

  role = localStorage.getItem('bo::role');

  constructor(private http: Http, private _store: Store<fromRoot.State>, ) {
    this.titre$ = 'Dashboard';
    // this.keywords$ = _store.select(fromRoot.getKeywords);
    this.dashboard_data$ = _store.select(fromRoot.getData);

    this.dashboard_data$.subscribe(val => {
      if (Object.keys(val).length !== 0) {
        this.data = val;
        this.vendeur_acheteurs = this.data['vendeurs_achteur_graphe'];
        this.top_five = this.data['top_five_pays'];
        this.top_five_users = this.data['top_five_pays_users'];
        this.dataSource = {
          'chart': {
            'caption': 'Répartition Annonces/Vendeurs/Acheteurs par Pays',
            'theme': 'zune'
          },
          'categories': [
            {
              'category': this.data['stat_pays_top']['pays']
            }
          ],
          'dataset': [
            {
              'seriesname': 'Nombre d\'annonce',
              'data': this.data['stat_pays_top']['annonce']
            },
            {
              'seriesname': 'Nombre de vendeur',
              'renderas': 'line',
              'showvalues': '0',
              'data': this.data['stat_pays_top']['seller']
            }
          ]
        };
      }
    });
  }


  ngOnInit() {
    // if(this.isFreelancer()){
    //   this._store.dispatch(go(['/freelancers']));
    // }
    this._store.dispatch(new dashboardActions.RequestChartData());
  }

  isFreelancer() {
    return this.role === 'freelancer';
  }


}
