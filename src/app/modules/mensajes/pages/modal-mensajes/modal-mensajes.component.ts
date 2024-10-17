import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-mensajes',
  templateUrl: './modal-mensajes.component.html',
  styleUrls: ['./modal-mensajes.component.css']
})
export class ModalMensajesComponent {
  emisor: string;
  receptor: string;
  mensaje: string;
  estadoLeido: boolean;
  estadoFavorito: boolean;

  constructor(
    public dialogRef: MatDialogRef<ModalMensajesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.emisor = data.emisor || '';
    this.receptor = data.receptor || '';
    this.mensaje = data.mensaje || '';
    this.estadoLeido = data.estadoLeido || false;
    this.estadoFavorito = data.estadoFavorito || false;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    const mensajeData = {
      emisor: this.emisor,
      receptor: this.receptor,
      mensaje: this.mensaje,
      estadoLeido: this.estadoLeido,
      estadoFavorito: this.estadoFavorito,
    };
    this.dialogRef.close(mensajeData);
  }
}
