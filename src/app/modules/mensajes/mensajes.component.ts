import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MensajeFormComponent } from './mensaje-form/mensaje-form.component';
import { MensajesService } from './servicio/mensajes.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {
  mensajes: any[] = [];
  displayedColumns: string[] = ['emisor', 'receptor', 'mensaje', 'acciones'];

  constructor(private mensajesService: MensajesService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadMensajes();
  }

  loadMensajes(): void {
    this.mensajesService.getMensajes().subscribe(data => {
      this.mensajes = data;
      console.log("Mensajes cargados:", this.mensajes);
    });
  }

  openFormDialog(mensaje?: any): void {
    const dialogRef = this.dialog.open(MensajeFormComponent, {
      width: '400px',
      data: mensaje || { emisor: '', receptor: '', mensaje: '', idMensajes: null } // Agrega idMensajes por si es nuevo
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadMensajes(); // Actualiza la lista después de enviar o guardar
      }
    });
  }

  editMensaje(mensaje: any): void {
    this.openFormDialog(mensaje); // Abre el formulario con los datos del mensaje a editar
  }

  deleteMensaje(mensaje: any): void {
    console.log("Mensaje recibido para eliminar:", mensaje);
    if (!mensaje || !mensaje.idMensajes) {
      console.error("Mensaje o ID no disponible", mensaje);
      return;
    }
    const id = mensaje.idMensajes;
    console.log("Eliminando mensaje con ID:", id);
    if (confirm('¿Estás seguro de que deseas eliminar este mensaje?')) {
      this.mensajesService.deleteMensaje(id).subscribe(() => {
        console.log("Mensaje eliminado");
        this.loadMensajes();
      }, error => {
        console.error("Error eliminando mensaje:", error);
      });
    }
  }

 
}
