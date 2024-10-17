import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-bandeja-salida',
  templateUrl: './bandeja-salida.component.html',
  styleUrls: ['./bandeja-salida.component.css']
})
export class BandejaSalidaComponent implements OnInit {
  mensajesSalida: any[] = [];

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.obtenerMensajesSalida();
  }

  obtenerMensajesSalida(): void {
    this.usuariosService.getMensajesSalida().subscribe(
      (data: any[]) => {
        this.mensajesSalida = data;
      },
      (error: any) => {
        console.error('Error al obtener mensajes de salida:', error);
      }
    );
  }
}