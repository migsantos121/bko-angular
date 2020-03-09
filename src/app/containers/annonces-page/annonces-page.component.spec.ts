import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnoncesPageComponent } from './annonces-page.component';

describe('AnnoncesPageComponent', () => {
  let component: AnnoncesPageComponent;
  let fixture: ComponentFixture<AnnoncesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AnnoncesPageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnoncesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it(`should have as title 'Annonces'`, async(() => {
    const fixture = TestBed.createComponent(AnnoncesPageComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Annonces');
  }));
});
