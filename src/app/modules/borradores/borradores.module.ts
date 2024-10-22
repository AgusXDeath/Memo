import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BorradoresRoutingModule } from './borradores-routing.module';
import { BorradoresComponent } from './borradores/borradores.component';


@NgModule({
  declarations: [
    BorradoresComponent
  ],
  imports: [
    CommonModule,
    BorradoresRoutingModule
  ]
})
export class BorradoresModule { }
