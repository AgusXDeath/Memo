import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.css']
})



export class TablaUsuariosComponent implements OnInit {
  usuarios = new MatTableDataSource<any>([]); // Utiliza MatTableDataSource

  constructor(private apiService: UsuariosService) {}

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios() {
    this.apiService.getUsuarios().subscribe(data => {
      console.log('Datos de la API:', data);  // Muestra lo que devuelve la API
      this.usuarios.data = data;  // Asigna los datos a la tabla
    });
  }
}  
