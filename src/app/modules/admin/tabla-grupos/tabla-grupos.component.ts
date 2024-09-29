import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModalAgregarGrupoComponent } from './modal-agregar-grupo/modal-agregar-grupo.component';

@Component({
  selector: 'app-tabla-grupos',
  templateUrl: './tabla-grupos.component.html',
  styleUrls: ['./tabla-grupos.component.css']
})
export class TablaGruposComponent implements OnInit {
  grupos = new MatTableDataSource<any>([]);
  selectedGrupo: any = { IdGrupo: null, descripcion: '' };

  constructor(private apiService: UsuariosService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadGrupos();
  }

  loadGrupos() {
    this.apiService.getGrupos().subscribe(data => {
      this.grupos.data = data;
    });
  }

  // Abre el modal para agregar un nuevo grupo
  openCreateForm(): void {
    const dialogRef = this.dialog.open(ModalAgregarGrupoComponent, {
      width: '300px',
      data: { descripcion: '' } // Se abre el modal vacío para agregar
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const nuevoGrupo = { descripcion: result };
        this.createGrupo(nuevoGrupo);
      }
    });
  }

  // Abre el modal para editar un grupo existente
  openEditForm(grupo: any): void {
    const dialogRef = this.dialog.open(ModalAgregarGrupoComponent, {
      width: '300px',
      data: { descripcion: grupo.Descripcion } // Se envían los datos actuales para la edición
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const grupoActualizado = { descripcion: result };
        this.updateGrupo(grupo.IdGrupo, grupoActualizado);
      }
    });
  }

  // Crear un grupo nuevo
  createGrupo(grupo: any) {
    this.apiService.createGrupo(grupo).subscribe(response => {
      console.log('Grupo creado:', response);
      this.loadGrupos();  // Recargar la tabla después de crear
    }, error => {
      console.error('Error al crear grupo:', error);
    });
  }

  // Actualizar un grupo existente
  updateGrupo(id: number, grupo: any) {
    this.apiService.updateGrupo(id, grupo).subscribe(response => {
      console.log('Grupo actualizado:', response);
      this.loadGrupos();  // Recargar la tabla después de actualizar
    }, error => {
      console.error('Error al actualizar grupo:', error);
    });
  }

  // Eliminar un grupo
  deleteGrupo(id: number) {
    this.apiService.deleteGrupo(id).subscribe(response => {
      console.log('Grupo eliminado:', response);
      this.loadGrupos();  // Recargar la tabla después de eliminar
    }, error => {
      console.error('Error al eliminar grupo:', error);
    });
  }
}
