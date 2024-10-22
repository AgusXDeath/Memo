import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutentificacionRoutingModule } from './autentificacion-routing.module';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';


// COMPONENTES DE MATERIAL
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; 
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar'; // Importar MatSnackBarModule
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    InicioSesionComponent,

  ],
  imports: [
    CommonModule,
    AutentificacionRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule, // Agregar aquí
    ReactiveFormsModule,
    MatProgressSpinnerModule,   
  ],
  exports: [
    
    InicioSesionComponent // Exportar también el componente de inicio de sesión si es necesario
  ]
})
export class AutentificacionModule { }