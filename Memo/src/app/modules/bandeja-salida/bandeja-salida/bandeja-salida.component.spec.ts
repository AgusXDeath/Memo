import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandejaSalidaComponent } from './bandeja-salida.component';

describe('BandejaSalidaComponent', () => {
  let component: BandejaSalidaComponent;
  let fixture: ComponentFixture<BandejaSalidaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BandejaSalidaComponent]
    });
    fixture = TestBed.createComponent(BandejaSalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
