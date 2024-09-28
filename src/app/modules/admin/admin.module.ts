import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { TablaUsuariosComponent } from './tabla-usuarios/tabla-usuarios.component';
import { TablaGruposComponent } from './tabla-grupos/tabla-grupos.component';
import { AdminComponent } from './admin/admin.component';

//componentes de Material
import {MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    TablaUsuariosComponent,
    TablaGruposComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTableModule,
    MatIconModule
  
    
  ]
})
export class AdminModule { }
