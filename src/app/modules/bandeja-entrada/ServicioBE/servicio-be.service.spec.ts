import { TestBed } from '@angular/core/testing';

import { ServicioBEService } from './servicio-be.service';

describe('ServicioBEService', () => {
  let service: ServicioBEService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioBEService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
