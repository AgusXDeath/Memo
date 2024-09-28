import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutentificacionRoutingModule } from './autentificacion-routing.module';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { RegistroComponent } from './components/registro/registro.component';

// COMPONENTES DE MATERIAL
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; 
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    InicioSesionComponent,
    RegistroComponent,
  ],
  imports: [
    CommonModule,
    AutentificacionRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  exports: [
    RegistroComponent
  ]
})
export class AutentificacionModule { }
