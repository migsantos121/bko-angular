import 'zone.js';
import 'reflect-metadata';

import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload';
import { MomentModule } from 'angular2-moment';
import { Daterangepicker } from 'ng2-daterangepicker';
import { Ng2ImgMaxModule } from 'ng2-img-max';

export declare let require: any;

import {
  ImageCompressService,
  ResizeOptions,
  ImageUtilityService
} from 'ng2-image-compress';

import { StoreModule } from '@ngrx/store';
import { RouterStoreModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { LoadingModule } from 'ngx-loading';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/index';
import { ChartsModule } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FintTheme from 'fusioncharts/themes/fusioncharts.theme.fint';
import { FusionChartsModule } from 'angular4-fusioncharts';
import { DataTablesModule } from 'angular-datatables';
import { PipesModule } from './pipes';
FusionChartsModule.fcRoot(FusionCharts, Charts, FintTheme);


// Effects & Services
import { ApisService } from './services/apis.service';
import { SessionEffects } from './effects/session';
import { NotificationsEffects } from './effects/notifications';
import { CategoriesEffects } from './effects/categorie';
import { AnnoncesEffects } from './effects/annonces';
import { PaysEffects } from './effects/pays';
import { CollectionsEffects } from './effects/collections';
import { DashboardEffects } from 'app/effects/dashboard';
import { VendeursEffects } from 'app/effects/vendeur';
import { ActivitesEffects } from 'app/effects/activite';
import { ModerateursEffects } from 'app/effects/moderateur';
import { FreelancersEffects } from 'app/effects/freelancer';
import { AppGuard } from './guards/is-authenticated';
import { AdminOnly } from './guards/admin-only';

import { reducer } from './reducers';
import { routes } from './routes';

// Components
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { SignInComponent } from './containers/sign-in/sign-in.component';
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
import { FreelancersPageComponent } from './containers/freelancers-page/freelancers-page.component';
import { AnnonceService, SessionService, CollectionService, CategorieService, ModerateurService } from './services';
import { VendeurService } from './services/vendeur.service';
import { CountryService } from './services/country.service'
import { ProfileComponent } from './containers/profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignInComponent,
    AnnoncesPageComponent,
    CategoriesPageComponent,
    AnnonceEditComponent,
    CollectionsPageComponent,
    PremiumPageComponent,
    VendeursPageComponent,
    VendeurProfileComponent,
    ExportPushComponent,
    CommerciauxPageComponent,
    ProfileComponent,
    ModerateursPageComponent,
    FreelancersPageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MomentModule,
    FileUploadModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    PipesModule,
    FusionChartsModule,
    DataTablesModule,
    ComponentsModule,
    ChartsModule,
    ReactiveFormsModule,
    LoadingModule,
    Ng2ImgMaxModule,
    NgxChartsModule,
    Daterangepicker,
    RouterModule.forRoot(routes, { useHash: false, enableTracing: false }),
    StoreModule.provideStore(reducer),
    RouterStoreModule.connectRouter(),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    EffectsModule.run(SessionEffects),
    EffectsModule.run(AnnoncesEffects),
    EffectsModule.run(CategoriesEffects),
    EffectsModule.run(PaysEffects),
    EffectsModule.run(DashboardEffects),
    EffectsModule.run(VendeursEffects),
    EffectsModule.run(ActivitesEffects),
    EffectsModule.run(CollectionsEffects),
    EffectsModule.run(NotificationsEffects),
    EffectsModule.run(ModerateursEffects),
    EffectsModule.run(FreelancersEffects),
  ],
  providers: [ApisService, AnnonceService, VendeurService, CategorieService,
    CollectionService, SessionService, ModerateurService, AppGuard, AdminOnly, ImageCompressService, ResizeOptions, CountryService],
  bootstrap: [AppComponent],
  exports: [PipesModule]
})
export class AppModule { }
