import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { EnviarMensajeRoutingModule } from './enviar-mensaje-routing.module';
import { EnviarMensajeComponent } from './enviar-mensaje/enviar-mensaje.component';


@NgModule({
  declarations: [
    EnviarMensajeComponent
  ],
  imports: [
    CommonModule,
    EnviarMensajeRoutingModule,
    FormsModule
  ]
})
export class EnviarMensajeModule { }
