import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../service/menu.service';
import { Menu } from '../../interfaces/menu';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  menu: Menu[] = [];

  mostrarSoloItemIndex: number = 0; // Índice del elemento que quieres mostrar en el navbar
  showFiller = false; // Controla si se muestra el texto adicional en el sidenav 

  constructor(private _menuService: MenuService) {  }

  ngOnInit(): void {
    this.cargarMenu();
  }
  
  cargarMenu()  {
    this._menuService.getMenu().subscribe(data => {
      this.menu = data;
    })
  }


}
