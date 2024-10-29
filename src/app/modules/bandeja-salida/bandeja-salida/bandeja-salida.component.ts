import { Component, OnInit } from '@angular/core';
import { ServicioBSService } from '../ServicioBS/servicio-bs.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-bandeja-salida',
  templateUrl: './bandeja-salida.component.html',
  styleUrls: ['./bandeja-salida.component.css']
})
export class BandejaSalidaComponent implements OnInit {
  mensajes = new MatTableDataSource<any>();
  displayedColumns: string[] = ['emisorMail', 'receptorMail', 'mensaje'];

  constructor(private servicioBSService: ServicioBSService) { }

  ngOnInit(): void {
    this.servicioBSService.getMensajes().subscribe(
      (data: any[]) => {
        console.log("Datos recibidos:", data);
        this.mensajes.data = data;
      },
      error => {
        console.error('Error al obtener los mensajes', error);
      }
    );
  }

}
