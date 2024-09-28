import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.css']
})


export class TablaUsuariosComponent implements OnInit {


  usuarios: any[] = []; 

  constructor(private apiService: UsuariosService) { }

  ngOnInit(): void {
    this.listarUsuarios()
  }

  listarUsuarios(){
    this.apiService.getAll().subscribe( data => {
      this.usuarios = data;
      console.log(this.usuarios);
    })
  }

}
