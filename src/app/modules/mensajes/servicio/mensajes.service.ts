import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {
  private apiUrlMensajes = 'http://localhost/Memo/api-php/public/index.php?resource=mensajes';

  constructor(private http: HttpClient) { }

  getMensajes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlMensajes);
  }

  createMensaje(mensaje: any): Observable<any> {
    // Asegúrate de que todos los campos están presentes
    const data = {
      ...mensaje,
      estadoLeido: mensaje.estadoLeido || 0,   // Fija el valor predeterminado en 0
      estadoRecibido: mensaje.estadoRecibido || 0,
      estadoFavorito: mensaje.estadoFavorito || 0,
      estadoPapelera: mensaje.estadoPapelera || 0
    };
    return this.http.post(this.apiUrlMensajes, data);
  }
  
  updateMensaje(id: number, mensaje: any): Observable<any> {
    return this.http.put(`${this.apiUrlMensajes}&id=${id}`, mensaje)
      .pipe(
        catchError(err => {
          console.error('Error en updateMensaje:', err);
          return throwError(err);
        })
      );
  }
  

  deleteMensaje(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrlMensajes}&id=${id}`);
}
}
