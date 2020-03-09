import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Categorie} from '../../models/categorie';

declare var $: any;

@Component({
  selector: 'bo-categories-table',
  template: `

    <table id="ks-datatable" class="table table-bordered dataTable no-footer">
    <thead>
      <tr role="row">
        <th class="sorting">Nom</th>
        <th class="sorting" >Nombre d'annonce(s)</th>
        <th class="sorting" >Rang</th>
        <th class="sorting" >Status</th>
        <th class="sorting" >&nbsp;</th>
      </tr>
    </thead>
      <tbody>
        <tr role="row" *ngFor="let categorie of categories">
          <td class="">
            <a href="#">{{categorie?.nom}}</a>
          </td>
          <td class="">{{categorie?.ads_count}}</td>
          <td>
            <span class="ks-name">{{categorie?.rank}}</span>
          </td>
          <td><span class="badge ks-circle badge-danger">Error</span></td>
          <td class="ks-controls">
            <div class="dropdown">
              <a class="btn btn-link" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="la la-ellipsis-h"></span>
              </a>
              <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    `,
  styleUrls: ['./categories-table.component.css']
})
export class CategoriesTableComponent implements AfterViewInit {

  @Input() categories: Categorie[];
  @Input() categorieStatus: boolean;
  @Output() onSelectCategorie = new EventEmitter<Categorie>();

  ngAfterViewInit() {

    $('table').datatable();
}


}
