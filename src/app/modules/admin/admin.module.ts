import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { TablaUsuariosComponent } from './tabla-usuarios/tabla-usuarios.component';
import { TablaGruposComponent } from './tabla-grupos/tabla-grupos.component';
import { AdminComponent } from './admin/admin.component';

//componentes de Material
import {MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ModalAgregarUsuarioComponent } from './tabla-usuarios/modal-agregar-usuario/modal-agregar-usuario.component';
import { MatButtonModule } from '@angular/material/button'; // Si deseas botones para agregar/editar/eliminar
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '../shared/shared.module';
import { share } from 'rxjs';



@NgModule({
  declarations: [
    TablaUsuariosComponent,
    TablaGruposComponent,
    AdminComponent,
    ModalAgregarUsuarioComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    MatDialogModule,
    SharedModule
    
  ]
})
export class AdminModule { }
