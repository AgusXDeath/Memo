import { TestBed } from '@angular/core/testing';

import { ServicioBSService } from './servicio-bs.service';

describe('ServicioBSService', () => {
  let service: ServicioBSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioBSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
