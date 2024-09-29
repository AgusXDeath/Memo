import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { TablaUsuariosComponent } from './tabla-usuarios/tabla-usuarios.component';
import { TablaGruposComponent } from './tabla-grupos/tabla-grupos.component';
import { AdminComponent } from './admin/admin.component';
import { SharedModule } from '../shared/shared.module';

//componentes de Material

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button'; // Si deseas botones para agregar/editar/eliminar
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalAgregarGrupoComponent } from './tabla-grupos/modal-agregar-grupo/modal-agregar-grupo.component';



@NgModule({
  declarations: [
    TablaUsuariosComponent,
    TablaGruposComponent,
    AdminComponent,
    ModalAgregarGrupoComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTableModule,
    MatButtonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,  // Si deseas usar ReactiveFormsModule para validaciones
    MatInputModule,
    MatDialogModule
    
  
    
  ]
})
export class AdminModule { }
