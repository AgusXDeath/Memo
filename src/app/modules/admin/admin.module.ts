import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';

// Componentes
import { TablaUsuariosComponent } from './tabla-usuarios/tabla-usuarios.component';
import { TablaGruposComponent } from './tabla-grupos/tabla-grupos.component';
import { AdminComponent } from './admin/admin.component';
import { ModalAgregarGrupoComponent } from './tabla-grupos/modal-agregar-grupo/modal-agregar-grupo.component';
import { ModalAgregarUsuarioComponent } from './tabla-usuarios/modal-agregar-usuario/modal-agregar-usuario.component';


// Angular Material Modules
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';


// Formularios
import { FormsModule } from '@angular/forms';  // Este es necesario para ngModel

@NgModule({
  declarations: [
    TablaUsuariosComponent,
    TablaGruposComponent,
    AdminComponent,
    ModalAgregarGrupoComponent,
    ModalAgregarUsuarioComponent
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    
    // Módulos de Angular Material
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,  // Este es necesario para mat-form-field
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    MatToolbarModule,
    

    // Formularios
    FormsModule  // Necesario para ngModel
  ]
})
export class AdminModule { }