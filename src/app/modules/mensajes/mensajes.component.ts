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
  displayedColumns: string[] = ['emisor', 'receptor', 'mensaje', 'acciones']; // Agrega la columna de acciones aquí

  constructor(private mensajesService: MensajesService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadMensajes();
  }

  loadMensajes(): void {
    this.mensajesService.getMensajes().subscribe(data => {
      this.mensajes = data;
    });
  }

  openFormDialog(mensaje?: any): void {
    const dialogRef = this.dialog.open(MensajeFormComponent, {
      width: '400px',
      data: mensaje || { emisor: '', receptor: '', mensaje: '' } // Pasa datos si está editando
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

  deleteMensaje(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este mensaje?')) {
      this.mensajesService.deleteMensaje(id).subscribe(() => {
        this.loadMensajes(); // Vuelve a cargar la lista después de eliminar
      });
    }
  }

  moveToPapelera(mensaje: any): void {
    mensaje.estadoPapelera = true; // Cambia el estado a papelera
    this.mensajesService.updateMensaje(mensaje.id, mensaje).subscribe(() => {
      this.loadMensajes(); // Vuelve a cargar la lista después de mover a papelera
    });
  }
}