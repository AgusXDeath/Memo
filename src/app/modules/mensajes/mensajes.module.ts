import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MensajesRoutingModule } from './mensajes-routing.module';
import { BandejaEntradaComponent } from './bandeja-entrada/bandeja-entrada.component';
import { BandejaSalidaComponent } from './bandeja-salida/bandeja-salida.component';
import { BorradorComponent } from './borrador/borrador.component';


@NgModule({
  declarations: [
    BandejaEntradaComponent,
    BandejaSalidaComponent,
    BorradorComponent
  ],
  imports: [
    CommonModule,
    MensajesRoutingModule
  ]
})
export class MensajesModule { }
