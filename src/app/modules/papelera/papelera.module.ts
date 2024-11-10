import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { PapeleraRoutingModule } from './papelera-routing.module';
import { PapeleraComponent } from './papelera/papelera.component';


@NgModule({
  declarations: [
    PapeleraComponent
  ],
  imports: [
    CommonModule,
    PapeleraRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatToolbarModule
    
  ]
})
export class PapeleraModule { }
