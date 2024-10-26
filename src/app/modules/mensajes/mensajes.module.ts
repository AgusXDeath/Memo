import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table'; // Para las tablas
import { MatButtonModule } from '@angular/material/button'; // Para los botones
import { MatDialogModule } from '@angular/material/dialog'; // Para los diálogos (modales)
import { MatFormFieldModule } from '@angular/material/form-field'; // Para los campos de formulario
import { MatInputModule } from '@angular/material/input'; // Para los inputs

import { FormsModule } from '@angular/forms'; // Para manejar formularios


import { MensajesRoutingModule } from './mensajes-routing.module';
import { MensajesComponent } from './mensajes.component';
import { MensajeFormComponent } from './mensaje-form/mensaje-form.component';



@NgModule({
  declarations: [
    MensajesComponent,
    MensajeFormComponent,
    
  ],
  imports: [
    CommonModule,
    MensajesRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    
  ]
})
export class MensajesModule { }
