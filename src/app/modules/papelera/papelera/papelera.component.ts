// Importar decoradores y módulos necesarios desde Angular core.
import { Component, OnInit } from '@angular/core';

// Importar el servicio de mensajes que se usará para interactuar con la API.
import { MensajesService } from 'src/app/services/mensajes.service';

// Definición de la interfaz para un mensaje.
interface Mensaje {
  id: number;
  emisor: string;
  receptor: string;
  mensaje: string;
}

// Definir el componente Papelera y sus metadatos.
@Component({
  selector: 'app-papelera',
  templateUrl: './papelera.component.html',
  styleUrls: ['./papelera.component.css']
})
export class PapeleraComponent implements OnInit {
  mensajes: Mensaje[] = []; // Array para almacenar los mensajes.
  displayedColumns: string[] = ['emisor', 'receptor', 'mensaje', 'acciones']; // Columnas que se mostrarán en la tabla.

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
  deleteMensaje(id: number): void {
    this.mensajesService.deleteMensaje(id).subscribe(
      () => {
        // Actualiza la lista de mensajes localmente tras la eliminación.
        this.mensajes = this.mensajes.filter(mensaje => mensaje.id !== id);
      },
      (error) => {
        console.error('Error al eliminar el mensaje:', error); // Manejar errores al eliminar el mensaje.
      }
    );
  }
}
