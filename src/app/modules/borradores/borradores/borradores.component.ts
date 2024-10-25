import { Component } from '@angular/core';

// Definición de la interfaz para un mensaje
interface Mensaje {
  emisor: string;
  receptor: string;
  mensaje: string;
  borrador: boolean; // Campo para indicar que es un borrador
}

@Component({
  selector: 'app-borradores',
  templateUrl: './borradores.component.html',
  styleUrls: ['./borradores.component.css']
})
export class BorradoresComponent {
  // Lista de mensajes guardados como borradores
  mensajes: Mensaje[] = [
    { emisor: 'Pedro', receptor: 'Cet30', mensaje: 'Mensaje que aún no he enviado.', borrador: true },
    { emisor: 'Ana', receptor: 'Boca', mensaje: 'Este es un mensaje de prueba.', borrador: true },
    { emisor: 'Luis', receptor: 'Angie', mensaje: 'Recordatorio para enviar el informe.', borrador: true }
  ];

  // Columnas que se mostrarán en la tabla
  displayedColumns: string[] = ['receptor', 'mensaje', 'acciones'];

  // Función para eliminar un borrador de la lista
  deleteBorrador(mensaje: Mensaje): void {
    this.mensajes = this.mensajes.filter(m => m !== mensaje); // Elimina el borrador de la lista
  }

  // Función para abrir un formulario modal para editar un borrador
  editBorrador(mensaje: Mensaje): void {
    console.log('Abrir diálogo para editar el borrador:', mensaje);
  }

  // Función para enviar un borrador
  sendBorrador(mensaje: Mensaje): void {
    console.log('Enviar mensaje:', mensaje);
    // Aquí puedes implementar la lógica para enviar el mensaje
  }
}
