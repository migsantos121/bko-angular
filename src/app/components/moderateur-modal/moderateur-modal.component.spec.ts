import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModerateurModalComponent } from './moderateur-modal.component';

describe('ModerateurModalComponent', () => {
  let component: ModerateurModalComponent;
  let fixture: ComponentFixture<ModerateurModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModerateurModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModerateurModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
