// Importar decoradores y módulos necesarios desde Angular core.
import { Component, OnInit } from '@angular/core';
import { MensajesService } from 'src/app/services/mensajes.service';

// Definición de la interfaz para un mensaje.
interface Mensaje {
  idMensajes: number;
  emisorMail: string; // Actualizado para reflejar el correo del emisor
  receptorMail: string; // Actualizado para reflejar el correo del receptor
  mensaje: string;
  estadoFavorito: number; // Agregar esta línea
  estadoPapelera: number; // Asegúrate de que esta línea también esté presente
}

// Definir el componente Papelera y sus metadatos.
@Component({
  selector: 'app-papelera',
  templateUrl: './papelera.component.html',
  styleUrls: ['./papelera.component.css']
})
export class PapeleraComponent implements OnInit {
  mensajes: Mensaje[] = []; // Array para almacenar los mensajes.
  displayedColumns: string[] = ['emisorMail', 'receptorMail', 'mensaje', 'acciones']; // Columnas que se mostrarán en la tabla.

  // Constructor que inyecta el servicio de mensajes.
  constructor(private mensajesService: MensajesService) {}

  // Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
  ngOnInit(): void {
    this.getMensajesPapelera(); // Llamar al método para obtener mensajes al inicializar.
  }

  // Método para obtener mensajes de la papelera desde el servicio.
  getMensajesPapelera(): void {
    this.mensajesService.getPapelera().subscribe(
      (data: Mensaje[]) => {
        this.mensajes = data; // Asignar los datos recibidos al array de mensajes.
      },
      (error) => {
        console.error('Error al obtener los mensajes de la papelera:', error); // Manejar errores al obtener los mensajes.
      }
    );
  }
// Método para eliminar un mensaje de la papelera.
deleteMensaje(idMensajes: number): void {
  this.mensajesService.deleteMensaje(idMensajes).subscribe(
    (response) => {
      // Mensaje de confirmación
      console.log(response.message); 
      
      // Actualiza la lista de mensajes localmente tras la eliminación
      this.mensajes = this.mensajes.filter(mensaje => mensaje.idMensajes !== idMensajes);
    },
    (error) => {
      console.error('Error al eliminar el mensaje:', error); // Manejar errores al eliminar el mensaje
    }
  );
}

  // Método para alternar el estado de papelera de un mensaje.
  toggleEstadoPapelera(mensaje: Mensaje): void {
    if (mensaje.idMensajes) {
      console.log('Estado actual de papelera:', mensaje.estadoPapelera); // Log del estado actual
      const nuevoEstadoPapelera = 0; // Establecer siempre a 0
      console.log('Nuevo estado papelera:', nuevoEstadoPapelera); // Log del nuevo estado

      // Actualiza localmente el estado antes de la llamada a la API
      mensaje.estadoPapelera = nuevoEstadoPapelera;

      this.mensajesService.updateMensaje(mensaje.idMensajes, mensaje.mensaje, mensaje.estadoFavorito, nuevoEstadoPapelera).subscribe(
        (updatedMensaje: Mensaje) => {
          console.log('Respuesta de la API:', updatedMensaje); // Verifica la respuesta de la API
          const index = this.mensajes.findIndex(m => m.idMensajes === mensaje.idMensajes);
          if (index !== -1) {
            this.mensajes[index] = updatedMensaje; // Actualiza el mensaje en el array
          }
           // Actualiza la tabla de mensajes después de la actualización
        this.getMensajesPapelera(); // Llamar al método para recargar los mensajes de la papelera
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
