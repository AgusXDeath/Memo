import { Component, OnInit } from '@angular/core';
import { ServicioBeService } from '../ServicioBE/servicio-be.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-bandeja-entrada',
  templateUrl: './bandeja-entrada.component.html',
  styleUrls: ['./bandeja-entrada.component.css']
})
export class BandejaEntradaComponent implements OnInit {
  mensajes = new MatTableDataSource<any>();
  displayedColumns: string[] = ['emisorMail', 'receptorMail', 'mensaje'];

  constructor(private servicioBeService: ServicioBeService) {}

  ngOnInit(): void {
    this.servicioBeService.getMensajes().subscribe(
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
