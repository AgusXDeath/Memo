import { Component, OnInit } from '@angular/core';
import { MensajesService } from 'src/app/services/mensajes.service';

// Definición de la interfaz para un mensaje.
interface Mensaje {
  emisorMail: string;
  receptorMail: string;
  mensaje: string;
  idMensajes: number; // Asegúrate de que el ID sea coherente
  estadoFavorito: number; // Agregar estadoFavorito
  estadoPapelera: number; 
}

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {
  mensajes: Mensaje[] = []; // Array para almacenar los mensajes.
  displayedColumns: string[] = ['emisorMail', 'receptorMail', 'mensaje', 'acciones']; // Añadir 'acciones'.

  // Constructor que inyecta el servicio de mensajes.
  constructor(private mensajesService: MensajesService) {}

  // Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
  ngOnInit(): void {
    this.getMensajesFavoritos(); // Llamar al método para obtener mensajes al inicializar.
  }

  // Método para obtener mensajes de favoritos desde el servicio.
  getMensajesFavoritos(): void {
    this.mensajesService.getFavoritos().subscribe(
      (data: Mensaje[]) => {
        this.mensajes = data; // Asignar los datos recibidos al array de mensajes.
      },
      (error) => {
        console.error('Error al obtener los mensajes de favoritos:', error); // Manejar errores al obtener los mensajes.
      }
    );
  }

  // Método para alternar el estado de favorito de un mensaje.
  toggleEstadoFavorito(mensaje: Mensaje): void {
    console.log('Toggle estado favorito para mensaje ID:', mensaje.idMensajes);
    if (mensaje.idMensajes) {
      const nuevoEstadoFavorito = mensaje.estadoFavorito = 0; // Alternar entre 1 y 0
      mensaje.estadoFavorito = nuevoEstadoFavorito;

      this.mensajesService.updateMensaje(mensaje.idMensajes, mensaje.mensaje, nuevoEstadoFavorito, mensaje.estadoPapelera).subscribe(
        (updatedMensaje: any) => {
          console.log('Respuesta de la API:', updatedMensaje);
          const index = this.mensajes.findIndex(m => m.idMensajes === mensaje.idMensajes);
          if (index !== -1) {
            this.mensajes[index] = updatedMensaje; // Actualiza el mensaje en el array
          }
         this.getMensajesFavoritos()
        },
        (error) => {
          console.error('Error al actualizar el estadoFavorito del mensaje:', error);
        }
      );
    } else {
      console.error('ID del mensaje es undefined');
    }
  }
}
