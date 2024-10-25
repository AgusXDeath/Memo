import { TestBed } from '@angular/core/testing';

import { ServicioBeService } from './servicio-be.service';

describe('ServicioBeService', () => {
  let service: ServicioBeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioBeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
