import { Component } from '@angular/core';

// Definición de la interfaz para un mensaje
interface Mensaje {
  emisor: string;
  receptor: string;
  mensaje: string;
  leido: boolean; // Añadimos el campo 'leído' para manejar el estado del mensaje
}

@Component({
  selector: 'app-bandeja-entrada',
  templateUrl: './bandeja-entrada.component.html',
  styleUrls: ['./bandeja-entrada.component.css']
})
export class BandejaEntradaComponent {
  // Lista de mensajes
  mensajes: Mensaje[] = [
    { emisor: 'Messi', receptor: 'Ronaldo', mensaje: 'Hola LLonaldo,todo piola?', leido: false },
    { emisor: 'Agus', receptor: 'Prisci', mensaje: 'Que onda.', leido: true },
    { emisor: 'Angie', receptor: 'Javier', mensaje: 'tenes que entregar los trabajos!!!!!.', leido: false }
  ];

  // Columnas que se mostrarán en la tabla
  displayedColumns: string[] = ['emisor', 'receptor', 'estado', 'mensaje', 'acciones'];

  // Función para alternar el estado de leído/no leído
  toggleLeido(mensaje: Mensaje): void {
    mensaje.leido = !mensaje.leido; // Cambia el estado del mensaje
  }

  // Función para eliminar un mensaje de la lista
  deleteMensaje(mensaje: Mensaje): void {
    this.mensajes = this.mensajes.filter(m => m !== mensaje); // Elimina el mensaje de la lista
  }

  // Función para abrir un formulario modal para enviar un nuevo mensaje
  openFormDialog(): void {
    // Aquí puedes implementar la lógica para abrir un diálogo de envío de mensajes
    console.log('Abrir diálogo de nuevo mensaje');
  }
}
