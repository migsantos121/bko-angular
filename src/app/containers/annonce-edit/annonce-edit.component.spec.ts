import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceEditComponent } from './annonce-edit.component';

describe('AnnonceEditComponent', () => {
  let component: AnnonceEditComponent;
  let fixture: ComponentFixture<AnnonceEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AnnonceEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnonceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
