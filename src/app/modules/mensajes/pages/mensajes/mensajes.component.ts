import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ModalMensajesComponent } from '../modal-mensajes/modal-mensajes.component';
import { MatTableDataSource } from '@angular/material/table'; // Para el dataSource

// Define un tipo para tus mensajes
interface Mensaje {
  id: number; // Asegúrate de que esto coincida con tu modelo
  emisor: string;
  receptor: string;
  mensaje: string;
  estadoLeido: boolean;
  estadoRecibido: boolean;
  estadoFavorito: boolean;
  estadoPapelera: boolean;
}

@Component({
  selector: 'app-tabla-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {
  mensajes: MatTableDataSource<Mensaje> = new MatTableDataSource(); // Cambia a MatTableDataSource con el tipo definido

  constructor(private usuariosService: UsuariosService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadMensajes();
  }

  loadMensajes(): void {
    this.usuariosService.getMensajes().subscribe(
      mensajes => {
        this.mensajes.data = mensajes; // Asigna los datos al dataSource
      },
      error => {
        console.error('Error al cargar los mensajes', error); // Manejo de errores
      }
    );
  }

  openCreateForm(): void {
    const dialogRef = this.dialog.open(ModalMensajesComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usuariosService.createMensaje(result).subscribe(() => this.loadMensajes());
      }
    });
  }

  openEditForm(mensaje: Mensaje): void {
    const dialogRef = this.dialog.open(ModalMensajesComponent, {
      width: '400px',
      data: mensaje
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usuariosService.updateMensaje(mensaje.id, result).subscribe(() => this.loadMensajes());
      }
    });
  }

  toggleFavorito(mensaje: Mensaje): void {
    mensaje.estadoFavorito = !mensaje.estadoFavorito; // Cambiar el estado de favorito
    this.usuariosService.updateMensaje(mensaje.id, mensaje).subscribe(() => this.loadMensajes());
  }
  
  moverPapelera(mensaje: Mensaje): void {
    mensaje.estadoPapelera = true; // Marcar el mensaje como en papelera
    this.usuariosService.updateMensaje(mensaje.id, mensaje).subscribe(() => this.loadMensajes());
  }

  deleteMensaje(id: number): void {
    this.usuariosService.deleteMensaje(id).subscribe(() => this.loadMensajes());
  }
}
