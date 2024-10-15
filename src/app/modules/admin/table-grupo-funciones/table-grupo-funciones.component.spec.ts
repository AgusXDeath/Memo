import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableGrupoFuncionesComponent } from './table-grupo-funciones.component';

describe('TableGrupoFuncionesComponent', () => {
  let component: TableGrupoFuncionesComponent;
  let fixture: ComponentFixture<TableGrupoFuncionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableGrupoFuncionesComponent]
    });
    fixture = TestBed.createComponent(TableGrupoFuncionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
