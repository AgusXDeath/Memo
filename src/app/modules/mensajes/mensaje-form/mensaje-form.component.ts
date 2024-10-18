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
  estadoLeido: false,  // Añadido
  estadoEnviado: false,
  estadoFavorito: false,  // Añadido
  estadoPapelera: false,
  estadoRecibido: false   // Añadido

  };

  constructor(
    public dialogRef: MatDialogRef<MensajeFormComponent>,
    private mensajesService: MensajesService,
    @Inject(MAT_DIALOG_DATA) public data: any // Recibe el mensaje (si está editando)
  ) {
    if (data && data.idMensajes) {
      this.mensaje = { ...data }; // Si es edición, asigna los datos del mensaje al formulario
    } else {
      this.mensaje = { emisor: '', receptor: '', mensaje: '', estadoEnviado: false, estadoPapelera: false }; // Si es nuevo, inicializa un mensaje vacío
    }
  }

  private guardarMensaje(): void {
    if (this.mensaje.idMensajes) {
      // Si tiene ID, actualiza el mensaje
      this.mensajesService.updateMensaje(this.mensaje.idMensajes, this.mensaje).subscribe(() => {
        this.dialogRef.close(true); // Cierra el modal
      });
    } else {
      // Si no tiene ID, crea un nuevo mensaje
      this.mensajesService.createMensaje(this.mensaje).subscribe(() => {
        this.dialogRef.close(true); // Cierra el modal
      });
    }
  }

  onEnviar(): void {
    this.mensaje.estadoEnviado = true;
    this.mensaje.estadoLeido = false;   // Asegura que esté no leído cuando se envíe
    this.guardarMensaje();
  }
  
  onGuardar(): void {
    this.mensaje.estadoEnviado = false;
    this.mensaje.estadoLeido = false;   // Puede estar no leído si se guarda como borrador
    this.guardarMensaje();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}