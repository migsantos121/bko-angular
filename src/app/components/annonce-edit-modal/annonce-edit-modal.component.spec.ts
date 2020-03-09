import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceEditModalComponent } from './annonce-edit-modal.component';
import { ImgFallbackModule } from 'ngx-img-fallback';

describe('AnnonceEditModalComponent', () => {
  let component: AnnonceEditModalComponent;
  let fixture: ComponentFixture<AnnonceEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AnnonceEditModalComponent],
      imports: [ImgFallbackModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnonceEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
