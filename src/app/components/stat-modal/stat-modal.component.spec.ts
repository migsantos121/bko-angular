import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatModalComponent } from './stat-modal.component';

describe('StatModalComponent', () => {
  let component: StatModalComponent;
  let fixture: ComponentFixture<StatModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StatModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
