import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendeurProfileComponent } from './vendeur-profile.component';

describe('VendeurProfileComponent', () => {
  let component: VendeurProfileComponent;
  let fixture: ComponentFixture<VendeurProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VendeurProfileComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendeurProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
