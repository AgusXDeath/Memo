import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-borradores',
  templateUrl: './borradores.component.html',
  styleUrls: ['./borradores.component.css']
})
export class BorradoresComponent implements OnInit {
  borradores: any[] = [];

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.obtenerBorradores();
  }

  obtenerBorradores(): void {
    this.usuariosService.getMensajesBorrador().subscribe(
      (data: any[]) => {
        this.borradores = data;
      },
      (error: any) => {
        console.error('Error al obtener borradores:', error);
      }
    );
  }
}