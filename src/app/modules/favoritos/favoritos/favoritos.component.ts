import { Component, OnInit } from '@angular/core';
import { MensajesService } from 'src/app/services/mensajes.service';

// Definición de la interfaz para un mensaje
interface Mensaje {
  emisor: string;
  receptor: string;
  mensaje: string;
}

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {
  mensajes: Mensaje[] = [];
  displayedColumns: string[] = ['emisor', 'receptor', 'mensaje'];

  constructor(private mensajesService: MensajesService) {}

  ngOnInit(): void {
    this.getMensajesFavoritos();
  }

  // Método para obtener mensajes de favoritos desde el servicio
  getMensajesFavoritos(): void {
    this.mensajesService.getFavoritos().subscribe(
      (data: Mensaje[]) => {
        this.mensajes = data;
      },
      (error) => {
        console.error('Error al obtener los mensajes de favoritos:', error);
      }
    );
  }
}
