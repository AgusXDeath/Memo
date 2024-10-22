import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from 'src/app/modules/inicio/pages/inicio/inicio.component';
import { TablaUsuariosComponent } from 'src/app/modules/admin/tabla-usuarios/tabla-usuarios.component';
import { TablaGruposComponent } from 'src/app/modules/admin/tabla-grupos/tabla-grupos.component';
import { TablaGruposFuncionesComponent } from 'src/app/modules/admin/table-grupo-funciones/table-grupo-funciones.component';
import { TablaFuncionesComponent } from 'src/app/modules/admin/table-funciones/table-funciones.component';
import { MensajesComponent } from 'src/app/modules/mensajes/mensajes.component';
import { FavoritosComponent } from 'src/app/modules/favoritos/favoritos/favoritos.component';
import { BorradoresComponent } from 'src/app/modules/borradores/borradores/borradores.component';
import { BandejaSalidaComponent } from 'src/app/modules/bandeja-salida/bandeja-salida/bandeja-salida.component';
import { BandejaEntradaComponent } from 'src/app/modules/bandeja-entrada/bandeja-entrada/bandeja-entrada.component';
import { EnviarMensajeComponent } from 'src/app/modules/enviar-mensaje/enviar-mensaje/enviar-mensaje.component';



const routes: Routes = [
  {
    path:"",component:DashboardComponent, children:[
    {path:"",component:InicioComponent },
    {path:"usuarios",component:TablaUsuariosComponent },
    {path:"grupos",component:TablaGruposComponent },
    {path:"grupofunciones",component:TablaGruposFuncionesComponent },
    {path:"funciones",component:TablaFuncionesComponent },
    {path:"mensajes", component: MensajesComponent},
    {path:"bandejaDeEntrada",component:BandejaEntradaComponent },
    {path:"bandejaDeSalida",component:BandejaSalidaComponent },
    {path:"borradores",component:BorradoresComponent },
    {path:"favoritos",component:FavoritosComponent },
    {path:"enviarMensaje",component:EnviarMensajeComponent },
 
    ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
