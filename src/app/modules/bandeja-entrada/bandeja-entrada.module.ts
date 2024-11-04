import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button'; // Para los botones
import { MatDialogModule } from '@angular/material/dialog'; // Para los diálogos (modales)
import { MatFormFieldModule } from '@angular/material/form-field'; // Para los campos de formulario
import { MatInputModule } from '@angular/material/input'; // Para los inputs
import { BandejaEntradaRoutingModule } from './bandeja-entrada-routing.module';
import { BandejaEntradaComponent } from './bandeja-entrada/bandeja-entrada.component';


@NgModule({
  declarations: [
    BandejaEntradaComponent
  ],
  imports: [
    CommonModule,
    BandejaEntradaRoutingModule,


  ]
})
export class BandejaEntradaModule { }