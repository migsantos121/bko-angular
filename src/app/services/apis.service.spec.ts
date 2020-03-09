import { TestBed, inject } from '@angular/core/testing';

import { ApisService } from './apis.service';

describe('ApisService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApisService]
    });
  });

  it('should ...', inject([ApisService], (service: ApisService) => {
    expect(service).toBeTruthy();
  }));
});
