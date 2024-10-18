import { Component, OnInit } from '@angular/core';
import { MensajesService } from '../servicio/mensajes.service';


@Component({
  selector: 'app-papelera',
  templateUrl: './papelera.component.html',
  styleUrls: ['./papelera.component.css']
})
export class PapeleraComponent implements OnInit {
  mensajesPapelera: any[] = [];

  constructor(private mensajesService: MensajesService) { }

  ngOnInit(): void {
    this.loadMensajesPapelera();
  }

  loadMensajesPapelera(): void {
    this.mensajesService.getMensajes().subscribe(data => {
      this.mensajesPapelera = data.filter(mensaje => mensaje.estadoPapelera); // Filtra los mensajes en papelera
    });
  }

  restoreMensaje(id: number): void {
    const mensaje = this.mensajesPapelera.find(m => m.id === id);
    if (mensaje) {
      mensaje.estadoPapelera = false; // Cambia el estado a no papelera
      this.mensajesService.updateMensaje(id, mensaje).subscribe(() => {
        this.loadMensajesPapelera(); // Recarga la lista
      });
    }
  }

  deleteMensaje(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este mensaje permanentemente?')) {
      this.mensajesService.deleteMensaje(id).subscribe(() => {
        this.loadMensajesPapelera(); // Recarga la lista después de eliminar
      });
    }
  }
}