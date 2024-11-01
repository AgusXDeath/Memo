import { Component } from '@angular/core';

@Component({
  selector: 'app-enviar-mensaje',
  templateUrl: './enviar-mensaje.component.html',
  styleUrls: ['./enviar-mensaje.component.css']
})
export class EnviarMensajeComponent {
  destinatario: string = '';
  asunto: string = '';
  mensaje: string = '';

  enviarMensaje() {
    if (this.destinatario && this.mensaje) {
      // Aquí puedes agregar la lógica para enviar el mensaje, como llamar a un servicio
      console.log('Mensaje enviado a:', this.destinatario);
      console.log('Asunto:', this.asunto);
      console.log('Mensaje:', this.mensaje);
      this.limpiarFormulario();
    } else {
      console.log('Por favor, completa todos los campos requeridos.');
    }
  }

  cancelar() {
    this.limpiarFormulario();
  }

  limpiarFormulario() {
    this.destinatario = '';
    this.asunto = '';
    this.mensaje = '';
  }
}