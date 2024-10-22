import { TestBed } from '@angular/core/testing';

import { ServicioEService } from './servicio-e.service';

describe('ServicioEService', () => {
  let service: ServicioEService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioEService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
