import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './modules/autentificacion/components/registro/registro.component';


const routes: Routes = [
  {
    path: "", component:RegistroComponent
  },
  {
    path: "",loadChildren:()=>import('./modules/admin/admin.module').then(m=>m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
