import { TestBed, async } from '@angular/core/testing';

import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FileUploadModule } from 'ng2-file-upload';
import { MomentModule } from 'angular2-moment';
import { Daterangepicker } from 'ng2-daterangepicker';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FintTheme from 'fusioncharts/themes/fusioncharts.theme.fint';
import { FusionChartsModule } from 'angular4-fusioncharts';
FusionChartsModule.fcRoot(FusionCharts, Charts, FintTheme);


import { PipesModule } from './pipes';
import { reducer } from './reducers';

import { AppComponent } from './app.component';
import { SignInComponent } from './containers/sign-in/sign-in.component';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { AnnoncesPageComponent } from './containers/annonces-page/annonces-page.component';
import { CategoriesPageComponent } from './containers/categories-page/categories-page.component';
import { AnnonceEditComponent } from './containers/annonce-edit/annonce-edit.component';
import { CollectionsPageComponent } from './containers/collections-page/collections-page.component';
import { PremiumPageComponent } from 'app/containers/premium-page/premium-page.component';
import { VendeursPageComponent } from './containers/vendeurs-page/vendeurs-page.component';
import { ExportPushComponent } from './containers/export-push/export-push.component';
import { VendeurProfileComponent } from './containers/vendeur-profile/vendeur-profile.component';
import { CommerciauxPageComponent } from './containers/commerciaux-page/commerciaux-page.component';
import { ModerateursPageComponent } from './containers/moderateurs-page/moderateurs-page.component';

import { ComponentsModule } from './components/index';

import { RouterModule } from '@angular/router';
import { routes } from './routes';

import { LoadingModule } from 'ngx-loading';
import { APP_BASE_HREF } from '@angular/common';
import { ApisService } from './services/apis.service';

describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        SignInComponent,
        AnnoncesPageComponent,
        CollectionsPageComponent,
        CategoriesPageComponent,
        AnnonceEditComponent,
        PremiumPageComponent,
        VendeursPageComponent,
        ExportPushComponent,
        VendeurProfileComponent,
        CommerciauxPageComponent,
        ModerateursPageComponent,
        DashboardComponent
      ],
      imports: [
        ComponentsModule,
        LoadingModule,
        FormsModule,
        HttpModule,
        MomentModule,
        FileUploadModule,
        NoopAnimationsModule,
        BrowserAnimationsModule,
        PipesModule,
        NgxChartsModule,
        ComponentsModule,
        Daterangepicker,
        LoadingModule,
        FusionChartsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes)
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }, ApisService]
    }).compileComponents();
  }));

  fit('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  // xit(`should have as title 'app works!'`, async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('app works!');
  // }));

  // xit('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('app works!');
  // }));
});
