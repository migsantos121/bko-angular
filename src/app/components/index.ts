import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MomentModule } from 'angular2-moment';
import { PipesModule } from '../pipes';
import { ImgFallbackModule } from 'ngx-img-fallback';

import { SignInFormComponent } from './sign-in-form/sign-in-form.component';
import { AsideComponent } from './aside/aside.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { AnnonceFormComponent } from './annonce-form/annonce-form.component';
import { CategoriesTableComponent } from './categories-table/categories-table.component';
import { AnnonceEditModalComponent } from './annonce-edit-modal/annonce-edit-modal.component';
import { PremiumModalComponent } from './premium-modal/premium-modal.component';
import { ModerateurModalComponent } from './moderateur-modal/moderateur-modal.component';
import { StatModalComponent } from './stat-modal/stat-modal.component';
import { LoadingModule } from 'ngx-loading';
import { Daterangepicker } from 'ng2-daterangepicker';
import { ImageEditComponent } from './image-edit/image-edit.component';

export const COMPONENTS = [
  SignInFormComponent,
  AsideComponent,
  NavbarComponent,
  HeaderComponent,
  AnnonceFormComponent,
  CategoriesTableComponent,
  PremiumModalComponent,
  AnnonceEditModalComponent,
  ModerateurModalComponent,
  StatModalComponent,
  ImageEditComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    MomentModule,
    LoadingModule,
    PipesModule,
    Daterangepicker,
    ImgFallbackModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule { }
