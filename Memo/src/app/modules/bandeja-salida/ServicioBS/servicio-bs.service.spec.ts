import { TestBed } from '@angular/core/testing';

import { ServicioBsService } from './servicio-bs.service';

describe('ServicioBsService', () => {
  let service: ServicioBsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioBsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
