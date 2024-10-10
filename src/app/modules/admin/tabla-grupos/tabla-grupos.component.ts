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
  // Fuente de datos para la tabla de grupos
  grupos = new MatTableDataSource<any>([]);
  selectedGrupo: any = { idGrupo: null, descripcion: '' };  // Grupo seleccionado

  // Inyecta el servicio de usuarios y MatDialog
  constructor(private apiService: UsuariosService, public dialog: MatDialog) {}

  // Cargar grupos al iniciar el componente
  ngOnInit(): void {
    this.loadGrupos();
  }

  // Cargar los grupos y contar los usuarios por grupo
  loadGrupos() {
    this.apiService.getGrupos().subscribe(grupos => {
      console.log('Grupos:', grupos); // Log de los grupos
      this.apiService.getUsuarios().subscribe(usuarios => {
        console.log('Usuarios:', usuarios); // Log de los usuarios
        this.grupos.data = grupos.map(grupo => {
          const cantidadUsuarios = usuarios.filter(u => u.idGrupo === grupo.idGrupo).length;
          return { ...grupo, cantidadUsuarios };  // Añadir la cantidad de usuarios
        });
      });
    }, error => {
      console.error('Error al cargar grupos:', error);
    });
  }
 
  

  // Abrir modal para agregar un nuevo grupo
  openCreateForm(): void {
    const dialogRef = this.dialog.open(ModalAgregarGrupoComponent, {
      width: '300px',
      data: { descripcion: '' }  // Modal vacío para agregar un nuevo grupo
    });

    // Suscribirse al cierre del modal y agregar el nuevo grupo si hay datos
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const nuevoGrupo = { descripcion: result };
        this.createGrupo(nuevoGrupo);
      }
    });
  }

  // Abrir modal para editar un grupo existente
  openEditForm(grupo: any): void {
    const dialogRef = this.dialog.open(ModalAgregarGrupoComponent, {
      width: '300px',
      data: { descripcion: grupo.Descripcion }  // Modal con datos del grupo a editar
    });

    // Suscribirse al cierre del modal y actualizar el grupo si hay cambios
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const grupoActualizado = { descripcion: result };
        this.updateGrupo(grupo.idGrupo, grupoActualizado);
      }
    });
  }

  // Método para crear un nuevo grupo
  createGrupo(grupo: any) {
    this.apiService.createGrupo(grupo).subscribe(response => {
      console.log('Grupo creado:', response);
      this.loadGrupos();  // Recargar la tabla después de crear el grupo
    }, error => {
      console.error('Error al crear grupo:', error);
    });
  }

  // Método para actualizar un grupo existente
  updateGrupo(id: number, grupo: any) {
    this.apiService.updateGrupo(id, grupo).subscribe(response => {
      console.log('Grupo actualizado:', response);
      this.loadGrupos();  // Recargar la tabla después de actualizar el grupo
    }, error => {
      console.error('Error al actualizar grupo:', error);
    });
  }

  // Método para eliminar un grupo
  deleteGrupo(id: number) {
    this.apiService.deleteGrupo(id).subscribe(response => {
      console.log('Grupo eliminado:', response);
      this.loadGrupos();  // Recargar la tabla después de eliminar el grupo
    }, error => {
      console.error('Error al eliminar grupo:', error);
    });
  }
}