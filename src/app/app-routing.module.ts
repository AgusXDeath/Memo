import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioSesionComponent } from './modules/autentificacion/components/inicio-sesion/inicio-sesion.component';

const routes: Routes = [
  {
    path: "", redirectTo: "inicio-sesion", pathMatch: 'full'
  },
  {
    path: "", component:InicioSesionComponent
  },
  {
    path: "dashboard",loadChildren:()=>import('./modules/autentificacion/components/dashboard/dashboard.module').then(m=>m.DashboardModule)
  },
  {
    path: "**", redirectTo: "inicio-sesion", pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
