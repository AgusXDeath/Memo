// Importar decoradores y módulos necesarios desde Angular core.
import { Component, OnInit } from '@angular/core';

// Importar el servicio de mensajes que se usará para interactuar con la API.
import { MensajesService } from 'src/app/services/mensajes.service';

// Definición de la interfaz para un mensaje.
interface Mensaje {
  emisor: string;
  receptor: string;
  mensaje: string;
}

// Definir el componente Favoritos y sus metadatos.
@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {
  mensajes: Mensaje[] = []; // Array para almacenar los mensajes.
  displayedColumns: string[] = ['emisor', 'receptor', 'mensaje']; // Columnas que se mostrarán en la tabla.

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
}
