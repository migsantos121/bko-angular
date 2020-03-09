import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendeursPageComponent } from './vendeurs-page.component';

describe('VendeursPageComponent', () => {
  let component: VendeursPageComponent;
  let fixture: ComponentFixture<VendeursPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VendeursPageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendeursPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
