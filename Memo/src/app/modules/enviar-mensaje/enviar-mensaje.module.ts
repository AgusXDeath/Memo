import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnviarMensajeRoutingModule } from './enviar-mensaje-routing.module';
import { EnviarMensajeComponent } from './enviar-mensaje/enviar-mensaje.component';


@NgModule({
  declarations: [
    EnviarMensajeComponent
  ],
  imports: [
    CommonModule,
    EnviarMensajeRoutingModule
  ]
})
export class EnviarMensajeModule { }
