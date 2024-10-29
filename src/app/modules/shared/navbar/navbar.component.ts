// Importar decoradores y módulos necesarios desde Angular core.
import { Component, OnInit } from '@angular/core';

// Importar el servicio de menú que se usará para obtener los elementos del menú.
import { MenuService } from '../../service/menu.service';
// Importar la interfaz Menu (definida en otro archivo).
import { Menu } from '../../interfaces/menu';
// Importar el servicio de autenticación.
import { AuthService } from 'src/app/services/auth.service';
// Importar el enrutador para la navegación.
import { Router } from '@angular/router';

// Decorador Component que define el componente Navbar y sus metadatos.
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  menu: Menu[] = []; // Array para almacenar los elementos del menú.
  mostrarSoloItemIndex: number = 0; // Índice del elemento que quieres mostrar en el navbar.
  showFiller = false; // Controla si se muestra el texto adicional en el sidenav.

  // Constructor que inyecta los servicios necesarios.
  constructor(private _menuService: MenuService, private authService: AuthService, private router: Router) { }

  // Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
  ngOnInit(): void {
    this.cargarMenu(); // Llamar al método para cargar el menú al inicializar.
  }

  // Método para cargar el menú desde el servicio.
  cargarMenu() {
    this._menuService.getMenu().subscribe(data => {
      this.menu = data; // Asignar los datos recibidos al array de menú.
    });
  }

  // Método para filtrar los elementos del menú.
  get filteredMessagesMenu() {
    return this.menu.filter(item =>
      item.nombre === 'Bandeja de entrada' ||
      item.nombre === 'Bandeja de salida' ||
      item.nombre === 'Borradores'
    ).map(item => {
      return {
        ...item,
        redirect:
          item.nombre === 'Bandeja de entrada' ? '/dashboard/bandeja-entrada' :
          item.nombre === 'Bandeja de salida' ? '/dashboard/bandeja-salida' :
          '/dashboard/borradores'
      };
    });
  }

  // Método para cerrar sesión.
  logout() {
    this.authService.logout(); // Llamar al método de logout del servicio de autenticación.
    this.router.navigate(['/inicio-sesion']); // Navegar a la página de inicio de sesión.
  }
}
