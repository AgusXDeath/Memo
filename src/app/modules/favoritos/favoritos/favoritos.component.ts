import { Component, OnInit } from '@angular/core';
import { MensajesService } from 'src/app/services/mensajes.service';

// Definición de la interfaz para un mensaje.
interface Mensaje {
  emisorMail: string;
  receptorMail: string;
  mensaje: string;
  favoritoEmisor: number;
  favoritoReceptor: number;
  papeleraEmisor: number;
  papeleraReceptor: number;
  idMensajes: number; // Cambiado a idMensajes
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
    // Cambiar el estado de favoritoEmisor a 1 y favoritoReceptor a 0
    const nuevoFavoritoEmisor = mensaje.favoritoEmisor === 1 ? 0 : 1;
const nuevoFavoritoReceptor = mensaje.favoritoReceptor === 1 ? 0 : 1;


    // Actualiza los valores localmente antes de la llamada a la API
    mensaje.favoritoEmisor = nuevoFavoritoEmisor;
    mensaje.favoritoReceptor = nuevoFavoritoReceptor;

    // Llamada a la API para actualizar el mensaje con los nuevos valores
    this.mensajesService.updateMensaje(
      mensaje.idMensajes, 
      mensaje.mensaje, 
      nuevoFavoritoEmisor, 
      nuevoFavoritoReceptor, 
      mensaje.papeleraEmisor, 
      mensaje.papeleraReceptor
    ).subscribe(
      (updatedMensaje: any) => {
        console.log('Respuesta de la API:', updatedMensaje);
        const index = this.mensajes.findIndex(m => m.idMensajes === mensaje.idMensajes);
        if (index !== -1) {
          this.mensajes[index] = updatedMensaje; // Actualiza el mensaje en el array
        }
        
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
