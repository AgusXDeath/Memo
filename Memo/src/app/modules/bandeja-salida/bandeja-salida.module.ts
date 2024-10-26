import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BandejaSalidaRoutingModule } from './bandeja-salida-routing.module';
import { BandejaSalidaComponent } from './bandeja-salida/bandeja-salida.component';


@NgModule({
  declarations: [
    BandejaSalidaComponent
  ],
  imports: [
    CommonModule,
    BandejaSalidaRoutingModule
  ]
})
export class BandejaSalidaModule { }
