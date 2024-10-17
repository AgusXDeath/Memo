import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensajesRoutingModule } from './mensajes-routing.module';
import { MensajesComponent } from './pages/mensajes/mensajes.component'; // Asegúrate de importar este componente
import { ModalMensajesComponent } from './pages/modal-mensajes/modal-mensajes.component';

// Módulos de Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms'; // Para usar ngModel

@NgModule({
  declarations: [
    MensajesComponent, // Asegúrate de que este componente esté aquí
    ModalMensajesComponent
  ],
  imports: [
    CommonModule,
    MensajesRoutingModule,
    MatToolbarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatIconModule,
    FormsModule
  ]
})
export class MensajesModule { }
