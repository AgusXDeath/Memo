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

  usuarios = new MatTableDataSource<any>([]); // Utiliza MatTableDataSource
  selectedUsuario: any = { idUsuario: null, nombreUsuario: '', mail: '', clave: '', idgrupo: '' };  // Variable para almacenar el usuario seleccionado

  // Inyecta el servicio UsuariosService
  constructor(private usuariosService: UsuariosService, public dialog: MatDialog) { }

  //metodo para mostrar los usuarios en la tabla
  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios() {
    this.usuariosService.getUsuarios().subscribe(data => {
      console.log('Datos de la API:', data);  // Muestra lo que devuelve la API
      this.usuarios.data = data;  // Asigna los datos a la tabla
    });
  }

  // Metodo que abre el modal para agregar un usuario
  openCreateForm(): void {
    const dialogRef = this.dialog.open(ModalAgregarUsuarioComponent, {
      width: '300px',
      data: { nombreUsuario: '', mail: '', clave: '', idgrupo: '' } // se abre el modal vacio para agregar 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        /* const nuevoUsuario = { nombreUsuario: result, mail: result, clave: result, idgrupo: result }; */
        const { nombreUsuario, mail, clave, idgrupo } = result
        const nuevoUsuario = {
          nombreUsuario,
          mail,
          clave,
          idgrupo
        }
        this.createUsuario(nuevoUsuario);
      }
    });
  }

  // abre el modal para editar un usuario existente
  openEditForm(usuario: any): void {
    const dialogRef = this.dialog.open(ModalAgregarUsuarioComponent, {
      width: '300px',
      data: { nombreUsuario: usuario.NombreUsuario, mail: usuario.Mail, clave: usuario.Clave, idgrupo: usuario.IdGrupo } // Se envian los datos actuales para la edicion, los datos luego "usuarios." deben estar tal cual en la tabla de la bd
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        /* const usuarioActualizado = { nombreUsuario: result, mail: result, clave: result, idgrupo: result }; */
        const { nombreUsuario, mail, clave, idgrupo } = result
        const usuarioActualizado = {
          nombreUsuario,
          mail,
          clave,
          idgrupo
        }
        this.updateUsuario(usuario.IdUsuarios, usuarioActualizado); // "IdUsuarios" debe ser tal cual esté en la tabla de la bd
      }
    })
  }

  // metodo para crear un usuario
  createUsuario(usuario: any) {
    this.usuariosService.createUsuario(usuario).subscribe(response => {
      console.log('Usuario creado:', response);
      this.loadUsuarios(); // Recarga la tabla

    }, error => {
      console.error('Error al crear usuario:', error);
    });
  }

  // metodo para actualizar un usuario
  updateUsuario(id: number, usuario: any) {
    this.usuariosService.updateUsuario(id, usuario).subscribe(response => {
      console.log('Usuario actualizado:', response);
      this.loadUsuarios(); // Recarga la tabla
    }, error => {
      console.error('Error al actualizar usuario:', error);
    });
  }

  // metodo para eliminar un usuario
  deleteUsuario(id: number) {
    console.log(id);
    this.usuariosService.deleteUsuario(id).subscribe(response => {
      console.log('Usuario eliminado:', response);
      this.loadUsuarios(); // Recarga la tabla
    }, error => {
      console.error('Error al eliminar usuario:', error);
    });
  }

}  