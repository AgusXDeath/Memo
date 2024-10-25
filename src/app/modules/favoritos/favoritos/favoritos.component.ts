import { Component } from '@angular/core';

// Definición de la interfaz para un mensaje
interface Mensaje {
  emisor: string;
  receptor: string;
  mensaje: string;
  favorito: boolean; // Campo para indicar que es un favorito
}

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent {
  // Lista de mensajes guardados como favoritos
  mensajes: Mensaje[] = [
    { emisor: 'Carlos', receptor: 'Ana', mensaje: 'Este es un mensaje favorito.', favorito: true },
    { emisor: 'Pedro', receptor: 'Juan', mensaje: 'Recordatorio de reunión.', favorito: true },
    { emisor: 'Luis', receptor: 'María', mensaje: 'Este es un mensaje importante.', favorito: true }
  ];

  // Columnas que se mostrarán en la tabla
  displayedColumns: string[] = ['receptor', 'mensaje', 'acciones'];

  // Función para eliminar un favorito de la lista
  deleteFavorito(mensaje: Mensaje): void {
    this.mensajes = this.mensajes.filter(m => m !== mensaje); // Elimina el favorito de la lista
  }

  // Función para abrir un formulario modal para editar un favorito
  editFavorito(mensaje: Mensaje): void {
    console.log('Abrir diálogo para editar el favorito:', mensaje);
  }

  // Función para enviar un favorito (si aplica)
  sendFavorito(mensaje: Mensaje): void {
    console.log('Enviar mensaje:', mensaje);
    // Aquí puedes implementar la lógica para enviar el mensaje
  }
}
