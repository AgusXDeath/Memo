import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from 'src/app/modules/inicio/pages/inicio/inicio.component';
import { TablaUsuariosComponent } from 'src/app/modules/admin/tabla-usuarios/tabla-usuarios.component';
import { TablaGruposComponent } from 'src/app/modules/admin/tabla-grupos/tabla-grupos.component';

const routes: Routes = [
  {
    path:"",component:DashboardComponent, children:[
    {path:"",component:InicioComponent },
    {path:"usuarios",component:TablaUsuariosComponent },
    {path:"grupos",component:TablaGruposComponent }
    ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }