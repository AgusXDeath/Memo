import { Component } from '@angular/core';
import { MensajesService } from 'src/app/services/mensajes.service';

@Component({
  selector: 'app-enviar-mensaje',
  templateUrl: './enviar-mensaje.component.html',
  styleUrls: ['./enviar-mensaje.component.css']
})
export class EnviarMensajeComponent {
  destinatario: string = '';
  mensaje: string = '';

  constructor(private mensajesService: MensajesService) {}


  enviarMensaje(): void {
    this.mensajesService.enviarMensaje(this.destinatario, this.mensaje).subscribe(
      response => {
        console.log('Mensaje enviado:', response);
        // Aquí puedes agregar lógica para actualizar la vista o mostrar un mensaje al usuario.
        this.limpiarFormulario();
      },
      error => {
        console.error('Error al enviar mensaje:', error);
        // Aquí puedes agregar lógica para mostrar un mensaje de error al usuario.
      }
    )
  }


  cancelar() {
    this.limpiarFormulario();
  }
  
  limpiarFormulario() {
    this.destinatario = '';
    this.mensaje = '';
  }
}

