import { TestBed } from '@angular/core/testing';

import { ServicioBService } from './servicio-b.service';

describe('ServicioBService', () => {
  let service: ServicioBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
