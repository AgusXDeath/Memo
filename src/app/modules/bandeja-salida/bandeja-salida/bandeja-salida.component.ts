// Importar decoradores y módulos necesarios desde Angular core.
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

// Importar el servicio de mensajes que se usará para interactuar con la API.
import { MensajesService } from 'src/app/services/mensajes.service';



// Definir una interfaz para representar la estructura de un mensaje.
interface Mensaje {
  emisor: string;
  receptor: string;
  mensaje: string;
  id: number; // Agregado campo id para identificar el mensaje específico.
}

// Definir el componente BandejaSalida y sus metadatos.
@Component({
  selector: 'app-bandeja-salida',
  templateUrl: './bandeja-salida.component.html',
  styleUrls: ['./bandeja-salida.component.css']
})
export class BandejaSalidaComponent implements OnInit {
  mensajes = new MatTableDataSource<Mensaje>; // Array para almacenar los mensajes.
  displayedColumns: string[] = ['emisor', 'receptor', 'mensaje', 'acciones']; // Columnas que se mostrarán en la tabla.

  // Constructor que inyecta el servicio de mensajes.
  constructor(private mensajesService: MensajesService) { }

  // Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
  ngOnInit(): void {
    this.getMensajesBandejaSalida(); // Llamar al método para obtener mensajes al inicializar.
  }

  // Método para obtener mensajes de la bandeja de salida desde el servicio.
  getMensajesBandejaSalida(): void {
    this.mensajesService.getBandejaSalida().subscribe(
      (data: Mensaje[]) => {
        this.mensajes.data = data; // Asignar los datos recibidos al array de mensajes.
      },
      (error) => {
        console.error('Error al obtener los mensajes de la bandeja de salida:', error); // Manejar errores al obtener los mensajes.
      }
    );
  }

  // Método para marcar un mensaje como favorito.
  marcarComoFavorito(idMensaje: number) {
    this.mensajesService.agregarAFavorito(idMensaje).subscribe(
      response => {
        console.log('Mensaje marcado como favorito:', response); // Registrar la respuesta.
        // Aquí puedes agregar lógica para actualizar la vista o mostrar un mensaje al usuario.
      },
      error => {
        console.error('Error al agregar a favoritos:', error); // Manejar errores al marcar como favorito.
      }
    );
  }

  // Método para actualizar un mensaje específico.
  updateMensaje(mensaje: Mensaje): void {
    this.mensajesService.updateMensaje(mensaje.id, mensaje.mensaje).subscribe(
      (updatedMensaje: Mensaje) => {
        const index = this.mensajes.data.findIndex(m => m.id === mensaje.id); // Encontrar el índice del mensaje actualizado.
        if (index !== -1) {
          this.mensajes.data[index] = updatedMensaje; // Actualizar el mensaje en el array.
        }
      },
      (error) => {
        console.error('Error al actualizar el mensaje:', error); // Manejar errores al actualizar el mensaje.
      }
    );
  }
}
