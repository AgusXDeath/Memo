import { Component } from '@angular/core';

// Definición de la interfaz para un mensaje
interface Mensaje {
  emisor: string;
  receptor: string;
  mensaje: string;
  enviado: boolean; // Añadimos el campo 'enviado' para gestionar el estado del mensaje
}

@Component({
  selector: 'app-bandeja-salida',
  templateUrl: './bandeja-salida.component.html',
  styleUrls: ['./bandeja-salida.component.css']
})
export class BandejaSalidaComponent {
  // Lista de mensajes enviados
  mensajes: Mensaje[] = [
    { emisor: 'Ronaldo', receptor: 'Messi', mensaje: 'Hola Frionel Pessi...', enviado: true },
    { emisor: 'Prisci', receptor: 'Agus', mensaje: 'Hola Agusss', enviado: true },
    { emisor: 'Javier', receptor: 'Angie', mensaje: 'hoy no, mañana si', enviado: true }
  ];

  // Columnas que se mostrarán en la tabla
  displayedColumns: string[] = ['receptor', 'mensaje', 'acciones'];

  // Función para eliminar un mensaje de la lista
  deleteMensaje(mensaje: Mensaje): void {
    this.mensajes = this.mensajes.filter(m => m !== mensaje); // Elimina el mensaje de la lista
  }

  // Función para abrir un formulario modal para enviar un nuevo mensaje
  openFormDialog(): void {
    console.log('Abrir diálogo para enviar nuevo mensaje');
  }
}
