import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AdminModule } from './modules/admin/admin.module';  // AdminModule ya contiene lo que necesitas
import { AutentificacionModule } from './modules/autentificacion/autentificacion.module';
import { MensajesModule } from './modules/mensajes/mensajes.module';

// Módulos propios
import { AppComponent } from './app.component';
import { BandejaEntradaComponent } from './modules/bandeja-entrada/bandeja-entrada/bandeja-entrada.component';
import { BandejaSalidaComponent } from './modules/bandeja-salida/bandeja-salida/bandeja-salida.component';
import { EnviarMensajeComponent } from './modules/enviar-mensaje/enviar-mensaje/enviar-mensaje.component';


//angular material

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BorradoresModule } from './modules/borradores/borradores.module';
import { FavoritosModule } from './modules/favoritos/favoritos.module';

@NgModule({
  declarations: [
    AppComponent,
    BandejaEntradaComponent,
    BandejaSalidaComponent,
    EnviarMensajeComponent,
    
    // Otros componentes globales
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AdminModule,  // Importando el módulo de administración
    AutentificacionModule,  // Asegúrate de importar el módulo de autenticación
    MensajesModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    BorradoresModule,
    FavoritosModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
