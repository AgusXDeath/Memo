import { Component, OnInit } from '@angular/core';
import { MensajesService } from 'src/app/services/mensajes.service';


interface Mensaje {
  emisor: string;
  receptor: string;
  mensaje: string;
  id: number; // Agregado campo id para identificar el mensaje específico
}

@Component({
  selector: 'app-bandeja-entrada',
  templateUrl: './bandeja-entrada.component.html',
  styleUrls: ['./bandeja-entrada.component.css']
})
export class BandejaEntradaComponent implements OnInit {
  mensajes: any[] = [];
  displayedColumns: string[] = ['emisor', 'receptor', 'mensaje', 'acciones'];

  constructor(private mensajesService: MensajesService) {}

  ngOnInit(): void {
    this.getMensajes();
  }

  private getMensajes(): void {
    this.mensajesService.getBandejaEntrada().subscribe(
      (data) => {
        this.mensajes = data;
      },
      (error) => {
        console.error('Error al obtener mensajes', error);
      }
    );
  }
  marcarComoFavorito(idMensaje: number) {
    this.mensajesService.agregarAFavorito(idMensaje).subscribe(
      response => {
        console.log('Mensaje marcado como favorito:', response);
        // Aquí puedes agregar lógica para actualizar la vista o mostrar un mensaje al usuario
      },
      error => {
        console.error('Error al agregar a favoritos:', error);
      }
    );
  }

  // Método para actualizar un mensaje específico
  updateMensaje(mensaje: Mensaje): void {
    this.mensajesService.updateMensaje(mensaje.id, mensaje.mensaje).subscribe(
      (updatedMensaje: Mensaje) => {
        const index = this.mensajes.findIndex(m => m.id === mensaje.id);
        if (index !== -1) {
          this.mensajes[index] = updatedMensaje;
        }
      },
      (error) => {
        console.error('Error al actualizar el mensaje:', error);
      }
    );
  }
}

