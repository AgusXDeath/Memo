import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BorradoresRoutingModule } from './borradores-routing.module';
import { BorradoresComponent } from './borradores/borradores.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    BorradoresComponent
  ],
  imports: [
    CommonModule,
    BorradoresRoutingModule,
    MatButtonModule,
    MatTableModule
  ]
})
export class BorradoresModule { }
