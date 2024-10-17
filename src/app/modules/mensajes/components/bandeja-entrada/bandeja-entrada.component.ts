import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-bandeja-entrada',
  templateUrl: './bandeja-entrada.component.html',
  styleUrls: ['./bandeja-entrada.component.css']
})
export class BandejaEntradaComponent implements OnInit {
  mensajesEntrada: any[] = [];

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.obtenerMensajesEntrada();
  }

  obtenerMensajesEntrada(): void {
    this.usuariosService.getMensajesEntrada().subscribe(
      (data: any[]) => {  // Define el tipo 'any[]' explícitamente
        this.mensajesEntrada = data;
      },
      (error: any) => {  // Define el tipo 'any' para el error
        console.error('Error al obtener mensajes de entrada:', error);
      }
    );
  }
}
