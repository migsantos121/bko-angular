import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'bo-header',
  template: `
  <div class="ks-page-header">
    <section class="ks-title">
        <h3>{{title}}</h3>
        <button class="btn btn-primary-outline ks-light ks-content-nav-toggle" data-block-toggle=".ks-content-nav > .ks-nav">Menu</button>
    </section>
  </div>
  `
})
export class HeaderComponent {

  @Input() title: string;

  constructor() { }
}
