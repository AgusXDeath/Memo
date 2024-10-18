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
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onEnviar(): void {
    this.mensaje.estadoEnviado = true;
    this.mensajesService.createMensaje(this.mensaje).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  onGuardar(): void {
    this.mensajesService.createMensaje(this.mensaje).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
