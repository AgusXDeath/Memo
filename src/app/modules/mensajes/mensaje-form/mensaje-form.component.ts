import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MensajesService } from '../servicio/mensajes.service';

@Component({
  selector: 'app-mensaje-form',
  templateUrl: './mensaje-form.component.html',
  styleUrls: ['./mensaje-form.component.css']
})
export class MensajeFormComponent {
  mensaje: any = {
    emisor: '',
    receptor: '',
    mensaje: '',
    estadoEnviado: false,
    estadoPapelera: false
  };

  constructor(
    public dialogRef: MatDialogRef<MensajeFormComponent>,
    private mensajesService: MensajesService,
    @Inject(MAT_DIALOG_DATA) public data: any // Recibe el mensaje (si está editando)
  ) {
    if (data) {
      this.mensaje = { ...data }; // Si es edición, asigna los datos del mensaje al formulario
    }
  }

  onEnviar(): void {
    this.mensaje.estadoEnviado = true;

    // Verifica si el mensaje tiene un ID para determinar si es edición o creación
    if (this.mensaje.idMensajes) {
      // Si tiene ID, se actualiza el mensaje
      this.mensajesService.updateMensaje(this.mensaje.idMensajes, this.mensaje).subscribe(() => {
        this.dialogRef.close(true); // Cierra el modal y recarga la lista de mensajes
      });
    } else {
      // Si no tiene ID, crea un nuevo mensaje
      this.mensajesService.createMensaje(this.mensaje).subscribe(() => {
        this.dialogRef.close(true); // Cierra el modal y recarga la lista de mensajes
      });
    }
  }

  onGuardar(): void {
    // Similar a `onEnviar`, pero para guardar como borrador
    if (this.mensaje.idMensajes) {
      // Actualiza el mensaje si tiene ID
      this.mensajesService.updateMensaje(this.mensaje.idMensajes, this.mensaje).subscribe(() => {
        this.dialogRef.close(true); // Cierra el modal
      });
    } else {
      // Crea un nuevo mensaje como borrador
      this.mensajesService.createMensaje(this.mensaje).subscribe(() => {
        this.dialogRef.close(true); // Cierra el modal
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
