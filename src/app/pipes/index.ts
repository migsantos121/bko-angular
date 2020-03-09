import { NgModule } from '@angular/core';
import { TypeAnnoncePipe, EtatProduitPipe, SortPipe } from './annonces.pipes';
import { EtatAnnoncePipe } from './annonces.pipes';
import { RoleModerateurPipe } from './annonces.pipes';
import { KeysPipe } from './annonces.pipes';
export const PIPES = [
  TypeAnnoncePipe,
  EtatAnnoncePipe,
  EtatProduitPipe,
  RoleModerateurPipe,
  KeysPipe,
  SortPipe,
];

@NgModule({
  declarations: PIPES,
  exports: PIPES
})
export class PipesModule { }
