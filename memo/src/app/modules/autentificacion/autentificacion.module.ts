import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutentificacionRoutingModule } from './autentificacion-routing.module';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { RegistroComponent } from './registro/registro.component';
import { RegistrComponent } from './components/registr/registr.component';


@NgModule({
  declarations: [
    InicioSesionComponent,
    RegistroComponent,
    RegistrComponent
  ],
  imports: [
    CommonModule,
    AutentificacionRoutingModule
  ]
})
export class AutentificacionModule { }
