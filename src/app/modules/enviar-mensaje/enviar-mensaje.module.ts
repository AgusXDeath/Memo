import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnviarMensajeRoutingModule } from './enviar-mensaje-routing.module';
import { EnviarMensajeComponent } from './enviar-mensaje/enviar-mensaje.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    EnviarMensajeComponent // Declarar el componente aquí
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    FormsModule,// Asegúrate de incluir los módulos necesarios
    EnviarMensajeRoutingModule,
    MatButtonModule
  ],
  exports: [
    EnviarMensajeComponent // Exporta el componente si lo necesitas en otros módulos
  ]
})
export class EnviarMensajeModule { }
