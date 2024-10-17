import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMensajesComponent } from './modal-mensajes.component';

describe('ModalMensajesComponent', () => {
  let component: ModalMensajesComponent;
  let fixture: ComponentFixture<ModalMensajesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalMensajesComponent]
    });
    fixture = TestBed.createComponent(ModalMensajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
