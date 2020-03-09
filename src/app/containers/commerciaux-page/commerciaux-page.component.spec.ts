import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommerciauxPageComponent } from './commerciaux-page.component';

describe('CommerciauxPageComponent', () => {
  let component: CommerciauxPageComponent;
  let fixture: ComponentFixture<CommerciauxPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommerciauxPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommerciauxPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
