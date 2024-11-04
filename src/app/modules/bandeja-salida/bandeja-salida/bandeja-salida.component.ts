// Importar decoradores y módulos necesarios desde Angular core.
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MensajesService } from 'src/app/services/mensajes.service';

// Definir una interfaz para representar la estructura de un mensaje.
interface Mensaje {
  emisorMail: string;
  receptorMail: string;
  mensaje: string;
  estadoFavorito: number; // Si no se recibe, asegúrate de que se maneje
  estadoPapelera: number; // Si no se recibe, asegúrate de que se maneje
  idMensajes: number; // Cambiado a idMensajes
}

// Definir el componente BandejaSalida y sus metadatos.
@Component({
  selector: 'app-bandeja-salida',
  templateUrl: './bandeja-salida.component.html',
  styleUrls: ['./bandeja-salida.component.css']
})
export class BandejaSalidaComponent implements OnInit {
  mensajes = new MatTableDataSource<Mensaje>(); // Array para almacenar los mensajes.
  displayedColumns: string[] = ['emisor', 'receptor', 'mensaje', 'acciones']; // Columnas que se mostrarán en la tabla.

  // Constructor que inyecta el servicio de mensajes.
  constructor(private mensajesService: MensajesService) { }

  // Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
  ngOnInit(): void {
    this.getMensajesBandejaSalida(); // Llamar al método para obtener mensajes al inicializar.
  }

  getMensajesBandejaSalida(): void {
    this.mensajesService.getBandejaSalida().subscribe(
      (data: Mensaje[]) => {
        console.log('Mensajes recibidos:', data); // Verifica la respuesta
        this.mensajes.data = data; // Asignar los datos recibidos al array de mensajes.
      },
      (error) => {
        console.error('Error al obtener los mensajes de la bandeja de salida:', error); // Manejar errores al obtener los mensajes.
      }
    );
  }

  // Método para actualizar solo el contenido del mensaje.
  updateMensajeContenido(mensaje: Mensaje, nuevoContenido: string): void {
    if (mensaje.idMensajes) { // Asegurarse de que el id no sea undefined
      this.mensajesService.updateMensaje(mensaje.idMensajes, nuevoContenido, mensaje.estadoFavorito, mensaje.estadoPapelera).subscribe(
        (updatedMensaje: Mensaje) => {
          const index = this.mensajes.data.findIndex(m => m.idMensajes === mensaje.idMensajes); // Encontrar el índice del mensaje actualizado.
          if (index !== -1) {
            this.mensajes.data[index] = updatedMensaje; // Actualizar el mensaje en el array.
          }
        },
        (error) => {
          console.error('Error al actualizar el contenido del mensaje:', error); // Manejar errores al actualizar el mensaje.
        }
      );
    }
  }

  toggleEstadoFavorito(mensaje: Mensaje): void {
    console.log('Toggle estado favorito para mensaje ID:', mensaje.idMensajes); // Log del ID
    if (mensaje.idMensajes) {
      console.log('Estado actual de favorito:', mensaje.estadoFavorito); // Log del estado actual
      const nuevoEstadoFavorito = mensaje.estadoFavorito === 1 ? 0 : 1; // Alternar entre 0 y 1
      console.log('Nuevo estado favorito:', nuevoEstadoFavorito); // Log del nuevo estado
  
      // Actualiza localmente el estado antes de la llamada a la API
      mensaje.estadoFavorito = nuevoEstadoFavorito; 
  
      this.mensajesService.updateMensaje(mensaje.idMensajes, mensaje.mensaje, nuevoEstadoFavorito, mensaje.estadoPapelera).subscribe(
        (updatedMensaje: any) => {
          console.log('Respuesta de la API:', updatedMensaje); // Verifica la respuesta de la API
          const index = this.mensajes.data.findIndex(m => m.idMensajes === mensaje.idMensajes);
          if (index !== -1) {
            this.mensajes.data[index] = updatedMensaje; // Actualiza el mensaje en el array
          }
        },
        (error) => {
          console.error('Error al actualizar el estadoFavorito del mensaje:', error);
        }
      );
    } else {
      console.error('ID del mensaje es undefined'); // Manejar el caso donde el ID es undefined
    }
  }
  
  toggleEstadoPapelera(mensaje: Mensaje): void {
    if (mensaje.idMensajes) {
      console.log('Estado actual de papelera:', mensaje.estadoPapelera); // Log del estado actual
      const nuevoEstadoPapelera = mensaje.estadoPapelera === 1 ? 0 : 1; // Alternar entre 0 y 1
      console.log('Nuevo estado papelera:', nuevoEstadoPapelera); // Log del nuevo estado
      console.log('Tipo de nuevo estado papelera:', typeof nuevoEstadoPapelera); // Log del tipo del nuevo estado
  
      // Actualiza localmente el estado antes de la llamada a la API
      mensaje.estadoPapelera = nuevoEstadoPapelera; 
  
      this.mensajesService.updateMensaje(mensaje.idMensajes, mensaje.mensaje, mensaje.estadoFavorito, nuevoEstadoPapelera).subscribe(
        (updatedMensaje: any) => {
          console.log('Respuesta de la API:', updatedMensaje); // Muestra lo que devuelve el servidor
          const index = this.mensajes.data.findIndex(m => m.idMensajes === mensaje.idMensajes);
          if (index !== -1) {
            this.mensajes.data[index] = updatedMensaje; // Actualiza el mensaje en el array
          }
        },
        (error) => {
          console.error('Error al actualizar el estadoPapelera del mensaje:', error);
        }
      );
    } else {
      console.error('ID del mensaje es undefined'); // Manejar el caso donde el ID es undefined
    }
  }
  
  
}
