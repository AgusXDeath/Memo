import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AutentificacionModule } from './modules/autentificacion/autentificacion.module';
import { SharedModule } from './modules/shared/shared.module';
import { AdminModule } from './modules/admin/admin.module';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button'; // Si deseas botones para agregar/editar/eliminar
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // Importa FormsModule
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AutentificacionModule,
    SharedModule,
    HttpClientModule,
    AdminModule,
    MatTableModule,
    MatButtonModule,
    FormsModule,  // Agrega FormsModule
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
