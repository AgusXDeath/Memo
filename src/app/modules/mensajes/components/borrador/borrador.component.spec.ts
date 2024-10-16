import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorradorComponent } from './borrador.component';

describe('BorradorComponent', () => {
  let component: BorradorComponent;
  let fixture: ComponentFixture<BorradorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BorradorComponent]
    });
    fixture = TestBed.createComponent(BorradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
