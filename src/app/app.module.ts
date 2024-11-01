import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

// Módulos propios
import { AppComponent } from './app.component';
import { AdminModule } from './modules/admin/admin.module';
import { AutentificacionModule } from './modules/autentificacion/autentificacion.module';
import { MensajesModule } from './modules/mensajes/mensajes.module';
import { BandejaEntradaModule } from './modules/bandeja-entrada/bandeja-entrada.module';
import { BandejaSalidaModule } from './modules/bandeja-salida/bandeja-salida.module';
import { SharedModule } from './modules/shared/shared.module';
import { EnviarMensajeModule } from './modules/enviar-mensaje/enviar-mensaje.module';

@NgModule({
  declarations: [
    AppComponent,
    // Otros componentes globales
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule, // Importar SharedModule
    EnviarMensajeModule, // Importar EnviarMensajeModule
    AdminModule,
    AutentificacionModule,
    MensajesModule,
    BandejaEntradaModule,
    BandejaSalidaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
