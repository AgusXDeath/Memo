import { Component, OnInit } from '@angular/core';
import { MensajesService } from 'src/app/services/mensajes.service';

// Definición de la interfaz para un mensaje
interface Mensaje {
  id: number;
  emisor: string;
  receptor: string;
  mensaje: string;
}

@Component({
  selector: 'app-papelera',
  templateUrl: './papelera.component.html',
  styleUrls: ['./papelera.component.css']
})
export class PapeleraComponent implements OnInit {
  mensajes: Mensaje[] = [];
  displayedColumns: string[] = ['emisor', 'receptor', 'mensaje', 'acciones'];

  constructor(private mensajesService: MensajesService) {}

  ngOnInit(): void {
    this.getMensajesPapelera();
  }

  // Método para obtener mensajes de la papelera desde el servicio
  getMensajesPapelera(): void {
    this.mensajesService.getPapelera().subscribe(
      (data: Mensaje[]) => {
        this.mensajes = data;
      },
      (error) => {
        console.error('Error al obtener los mensajes de la papelera:', error);
      }
    );
  }

  // Método para eliminar un mensaje de la papelera
  deleteMensaje(id: number): void {
    this.mensajesService.deleteMensaje(id).subscribe(
      () => {
        // Actualiza la lista de mensajes localmente tras la eliminación
        this.mensajes = this.mensajes.filter(mensaje => mensaje.id !== id);
      },
      (error) => {
        console.error('Error al eliminar el mensaje:', error);
      }
    );
  }
}
