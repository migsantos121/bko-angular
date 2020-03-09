import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportPushComponent } from './export-push.component';

describe('ExportPushComponent', () => {
  let component: ExportPushComponent;
  let fixture: ComponentFixture<ExportPushComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExportPushComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportPushComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
