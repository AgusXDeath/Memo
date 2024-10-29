import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';

import { BandejaSalidaRoutingModule } from './bandeja-salida-routing.module';
import { BandejaSalidaComponent } from './bandeja-salida/bandeja-salida.component';


@NgModule({
  declarations: [
    BandejaSalidaComponent
  ],
  imports: [
    CommonModule,
    BandejaSalidaRoutingModule,
    MatTableModule
  ]
})
export class BandejaSalidaModule { }
