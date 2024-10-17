import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from 'src/app/modules/inicio/pages/inicio/inicio.component';
import { TablaUsuariosComponent } from 'src/app/modules/admin/tabla-usuarios/tabla-usuarios.component';
import { TablaGruposComponent } from 'src/app/modules/admin/tabla-grupos/tabla-grupos.component';
import { TablaGruposFuncionesComponent } from 'src/app/modules/admin/table-grupo-funciones/table-grupo-funciones.component';
import { TablaFuncionesComponent } from 'src/app/modules/admin/table-funciones/table-funciones.component';
import { BandejaEntradaComponent } from 'src/app/modules/mensajes/components/bandeja-entrada/bandeja-entrada.component';
import { BandejaSalidaComponent } from 'src/app/modules/mensajes/components/bandeja-salida/bandeja-salida.component';
import { BorradoresComponent } from 'src/app/modules/mensajes/components/borradores/borradores.component';
import { MensajesComponent } from 'src/app/modules/mensajes/pages/mensajes/mensajes.component';


const routes: Routes = [
  {
    path:"",component:DashboardComponent, children:[
    {path:"",component:InicioComponent },
    {path:"usuarios",component:TablaUsuariosComponent },
    {path:"grupos",component:TablaGruposComponent },
    {path:"grupofunciones",component:TablaGruposFuncionesComponent },
    {path:"funciones",component:TablaFuncionesComponent },
    { path: 'bandeja-entrada', component: BandejaEntradaComponent },
    { path: 'bandeja-salida', component: BandejaSalidaComponent },
    { path: 'borradores', component: BorradoresComponent },
    { path: 'mensajes', component: MensajesComponent},
    ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
