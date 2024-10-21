import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModalAgregarUsuarioComponent } from './modal-agregar-usuario/modal-agregar-usuario.component';

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.css']
})

export class TablaUsuariosComponent implements OnInit {

  usuarios = new MatTableDataSource<any>([]);  // MatTableDataSource para la tabla de usuarios
  selectedUsuario: any = { idUsuario: null, nombreUsuario: '', mail: '', clave: '', idgrupo: '' };  // Usuario seleccionado

  // Inyecta el servicio UsuariosService
  constructor(private usuariosService: UsuariosService, public dialog: MatDialog) { }

  // Método para cargar los usuarios en la tabla
  ngOnInit(): void {
    this.loadUsuarios();
  }
  loadUsuarios() {
    this.usuariosService.getUsuarios().subscribe(usuarios => {
      console.log('Usuarios:', usuarios); // Verifica si se reciben los datos correctos
      this.usuariosService.getGrupos().subscribe(grupos => {
        console.log('Grupos:', grupos); // Verifica si los grupos también se reciben bien
  
        // Depuración para verificar la coincidencia de idGrupo
        this.usuarios.data = usuarios.map(usuario => {
          // Asegúrate de que los idGrupo sean del mismo tipo para la comparación
          const grupo = grupos.find(g => g.idGrupo === usuario.idGrupo);
          
          console.log('Grupo encontrado para el usuario', usuario.nombreUsuario, 'es:', grupo); // Verifica si se encuentra el grupo
  
          return {
            ...usuario,
            DescripcionGrupo: grupo ? grupo.descripcion : 'Sin grupo', // Asegúrate de que el nombre de la propiedad sea 'descripcion' (o lo que corresponda)
            showPassword: false
          };
        });
      });
    }, error => {
      console.error('Error al cargar usuarios:', error);
    });
  }

  togglePasswordVisibility(usuarios: any) {
    usuarios.showPassword = !usuarios.showPassword;  // Alterna la visibilidad de la contraseña
  }

 // Método para abrir el modal y agregar un usuario
openCreateForm(): void {
  const dialogRef = this.dialog.open(ModalAgregarUsuarioComponent, {
    width: '300px',
    data: { nombreUsuario: '', mail: '', clave: '', idGrupo: null }  // Asegúrate de inicializar idgrupo como null
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.createUsuario(result);  // Directamente pasa el resultado que contiene el nuevo usuario
    }
  });
}

// Método para abrir el modal y editar un usuario existente
openEditForm(usuario: any): void {
  const dialogRef = this.dialog.open(ModalAgregarUsuarioComponent, {
    width: '300px',
    data: { 
      nombreUsuario: usuario.nombreUsuario, 
      mail: usuario.mail, 
      clave: usuario.clave, 
      idgrupo: usuario.idGrupo 
    }  
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.updateUsuario(usuario.idUsuarios, result);  // Pasa directamente el resultado al actualizar
    }
  });
}

  // Método para crear un usuario
  createUsuario(usuario: any) {
    this.usuariosService.createUsuario(usuario).subscribe(response => {
      console.log('Usuario creado:', response);
      this.loadUsuarios();  // Recarga la tabla después de crear el usuario
    }, error => {
      console.error('Error al crear usuario:', error);
    });
  }

  // Método para actualizar un usuario
  updateUsuario(id: number, usuario: any) {
    this.usuariosService.updateUsuario(id, usuario).subscribe(response => {
      console.log('Usuario actualizado:', response);
      console.log('Actualizando usuario:', usuario);  // Verifica el contenido

      this.loadUsuarios();  // Recarga la tabla después de actualizar el usuario
    }, error => {
      console.error('Error al actualizar usuario:', error);
    });
  }

  // Método para eliminar un usuario
  deleteUsuario(id: number) {
    this.usuariosService.deleteUsuario(id).subscribe(response => {
      console.log('Usuario eliminado:', response);
      this.loadUsuarios();  // Recarga la tabla después de eliminar el usuario
    }, error => {
      console.error('Error al eliminar usuario:', error);
    });
  }
}