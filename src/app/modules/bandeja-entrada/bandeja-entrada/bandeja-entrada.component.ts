import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MensajesService } from 'src/app/services/mensajes.service';

interface Mensaje {
  emisorMail: string; // Cambiado de `emisor` a `emisorMail`
  receptorMail: string; // Cambiado de `receptor` a `receptorMail`
  mensaje: string;
  idMensajes: number; 
  estadoFavorito: number; 
  estadoPapelera: number; 
}

@Component({
  selector: 'app-bandeja-entrada',
  templateUrl: './bandeja-entrada.component.html',
  styleUrls: ['./bandeja-entrada.component.css']
})
export class BandejaEntradaComponent implements OnInit {
  mensajes = new MatTableDataSource<Mensaje>();
  displayedColumns: string[] = ['emisorMail', 'receptorMail', 'mensaje', 'acciones'];

  constructor(private mensajesService: MensajesService) {}

  ngOnInit(): void {
    this.getMensajes();
  }

  private getMensajes(): void {
    this.mensajesService.getBandejaEntrada().subscribe(
      (data: Mensaje[]) => {
        console.log('Mensajes recibidos:', data);
        this.mensajes.data = data;
      },
      (error) => {
        console.error('Error al obtener mensajes', error);
      }
    );
  }

  toggleEstadoFavorito(mensaje: Mensaje): void {
    console.log('Toggle estado favorito para mensaje ID:', mensaje.idMensajes);
    if (mensaje.idMensajes) {
      const nuevoEstadoFavorito = mensaje.estadoFavorito === 1 ? 0 : 1;
      mensaje.estadoFavorito = nuevoEstadoFavorito;
  
      this.mensajesService.updateMensaje(mensaje.idMensajes, mensaje.mensaje, nuevoEstadoFavorito, mensaje.estadoPapelera).subscribe(
        (updatedMensaje: any) => {
          console.log('Respuesta de la API:', updatedMensaje);
          const index = this.mensajes.data.findIndex(m => m.idMensajes === mensaje.idMensajes);
          if (index !== -1) {
            this.mensajes.data[index] = updatedMensaje;
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

  toggleEstadoPapelera(mensaje: Mensaje): void {
    if (mensaje.idMensajes) {
      const nuevoEstadoPapelera = 1; // Establecer siempre a 1
      mensaje.estadoPapelera = nuevoEstadoPapelera;
  
      this.mensajesService.updateMensaje(mensaje.idMensajes, mensaje.mensaje, mensaje.estadoFavorito, nuevoEstadoPapelera).subscribe(
        (updatedMensaje: any) => {
          console.log('Respuesta de la API:', updatedMensaje);
          const index = this.mensajes.data.findIndex(m => m.idMensajes === mensaje.idMensajes);
          if (index !== -1) {
            this.mensajes.data[index] = updatedMensaje;
          }
          this.getMensajes();
        },
         
        (error) => {
          console.error('Error al actualizar el estadoPapelera del mensaje:', error);
        }
      );
    } else {
      console.error('ID del mensaje es undefined');
    }
  }
}
