import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionsPageComponent } from './collections-page.component';

describe('CollectionsPageComponent', () => {
  let component: CollectionsPageComponent;
  let fixture: ComponentFixture<CollectionsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CollectionsPageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
