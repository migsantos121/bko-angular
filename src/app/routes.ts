import { Routes } from '@angular/router';

import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { SignInComponent } from './containers/sign-in/sign-in.component';
import { AnnoncesPageComponent } from './containers/annonces-page/annonces-page.component';
import { CollectionsPageComponent } from './containers/collections-page/collections-page.component';
import { AnnonceEditComponent } from './containers/annonce-edit/annonce-edit.component';
import { CategoriesPageComponent } from './containers/categories-page/categories-page.component';
import { VendeursPageComponent } from './containers/vendeurs-page/vendeurs-page.component';
import { CommerciauxPageComponent } from './containers/commerciaux-page/commerciaux-page.component';
import { ModerateursPageComponent } from './containers/moderateurs-page/moderateurs-page.component';
import { FreelancersPageComponent } from './containers/freelancers-page/freelancers-page.component';


import { AppGuard } from './guards/is-authenticated';
import { AdminOnly } from './guards/admin-only';
import { PremiumPageComponent } from 'app/containers/premium-page/premium-page.component';
import { VendeurProfileComponent } from 'app/containers/vendeur-profile/vendeur-profile.component';
import { ExportPushComponent } from 'app/containers/export-push/export-push.component';
import { ProfileComponent } from './containers/profile/profile.component';

export const routes: Routes = [
  { path: 'sign_in', component: SignInComponent },
  { path: 'app', component: DashboardComponent, canActivate: [AppGuard] },
  {
    path: 'annonces',
    component: AnnoncesPageComponent,
    canActivate: [AppGuard]
  },
  { path: 'premium', component: PremiumPageComponent, canActivate: [AppGuard] },
  {
    path: 'collections',
    component: CollectionsPageComponent,
    canActivate: [AppGuard]
  },
  {
    path: 'annonces/:id/edit',
    component: AnnonceEditComponent,
    canActivate: [AppGuard]
  },
  {
    path: 'categories',
    component: CategoriesPageComponent,
    canActivate: [AppGuard, AdminOnly]
  },
  {
    path: 'export',
    component: ExportPushComponent,
    canActivate: [AppGuard, AdminOnly]
  },
  {
    path: 'vendeurs',
    component: VendeursPageComponent,
    canActivate: [AppGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AppGuard]
  },
  {
    path: 'vendeurs/:id',
    component: VendeurProfileComponent,
    canActivate: [AppGuard]
  },
  // {
  //   path: 'commerciaux',
  //   component: CommerciauxPageComponent,
  //   canActivate: [AppGuard]
  // },
  {
    path: 'moderateurs',
    component: ModerateursPageComponent,
    canActivate: [AppGuard, AdminOnly]
  },
  {
    path: 'freelancers',
    component: FreelancersPageComponent,
    canActivate: [AppGuard]
  },
  { path: '**', redirectTo: '/app', pathMatch: 'full' }
];
