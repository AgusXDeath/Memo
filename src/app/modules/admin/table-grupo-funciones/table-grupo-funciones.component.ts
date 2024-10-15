import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModalAgregarGrupofuncionesComponent } from './modal-agregar-grupofunciones/modal-agregar-grupofunciones.component';

@Component({
  selector: 'app-table-grupo-funciones',
  templateUrl: './table-grupo-funciones.component.html',
  styleUrls: ['./table-grupo-funciones.component.css']
})
export class TablaGruposFuncionesComponent implements OnInit {

  gruposFunciones = new MatTableDataSource<any>([]);

  constructor(private gruposFuncionesService: UsuariosService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadGruposFunciones();
  }

  loadGruposFunciones() {
    this.gruposFuncionesService.getGrupoFunciones().subscribe(gruposFunciones => {
      this.gruposFunciones.data = gruposFunciones;
    }, error => {
      console.error('Error al cargar grupos funciones:', error);
    });
  }

  openCreateForm(): void {
    const dialogRef = this.dialog.open(ModalAgregarGrupofuncionesComponent, {
      width: '300px',
      data: { idGrupo: null, idFunciones: null, ver: false, insertar: false, modificar: false, borrar: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createGrupoFuncion(result);
      }
    });
  }

  openEditForm(grupoFuncion: any): void {
    const dialogRef = this.dialog.open(ModalAgregarGrupofuncionesComponent, {
      width: '300px',
      data: { 
        idGrupo: grupoFuncion.idGrupo, 
        idFunciones: grupoFuncion.idFunciones, 
        ver: grupoFuncion.ver, 
        insertar: grupoFuncion.insertar, 
        modificar: grupoFuncion.modificar, 
        borrar: grupoFuncion.borrar 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateGrupoFuncion(grupoFuncion.idGruposFunciones, result);
      }
    });
  }

  createGrupoFuncion(grupoFuncion: any): void {
    this.gruposFuncionesService.createGrupoFuncion(grupoFuncion).subscribe(() => {
      this.loadGruposFunciones();
    });
  }

  updateGrupoFuncion(id: number, grupoFuncion: any): void {
    this.gruposFuncionesService.updateGrupoFuncion(id, grupoFuncion).subscribe(() => {
      this.loadGruposFunciones();
    });
  }

  deleteGrupoFuncion(id: number): void {
    this.gruposFuncionesService.deleteGrupoFuncion(id).subscribe(() => {
      this.loadGruposFunciones();
    });
  }
}
