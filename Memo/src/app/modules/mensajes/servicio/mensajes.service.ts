import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {
  private apiUrlMensajes = 'http://localhost/api-actualizada/public/index.php?resource=mensajes';

  constructor(private http: HttpClient) { }

  // Obtener el token del localStorage
  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Metodo para enviar el token en los headers
  private createHeaders() {
    const token = this.getToken();
    if (token) {
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });
    } else {
      return new HttpHeaders({
        'Content-Type': 'application/json'
      });
    }
  }

  getMensajes(): Observable<any[]> {
    const headers = this.createHeaders();
    return this.http.get<any[]>(this.apiUrlMensajes, { headers });
  }

  createMensaje(mensaje: any): Observable<any> {
    const headers = this.createHeaders();
    // Asegúrate de que todos los campos están presentes
    const data = {
      ...mensaje,
      estadoLeido: mensaje.estadoLeido || 0,   // Fija el valor predeterminado en 0
      estadoRecibido: mensaje.estadoRecibido || 0,
      estadoFavorito: mensaje.estadoFavorito || 0,
      estadoPapelera: mensaje.estadoPapelera || 0
    };
    return this.http.post(this.apiUrlMensajes, data, { headers });
  }

  updateMensaje(id: number, mensaje: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.put(`${this.apiUrlMensajes}&id=${id}`, mensaje, { headers })
      .pipe(
        catchError(err => {
          console.error('Error en updateMensaje:', err);
          return throwError(err);
        })
      );
  }


  deleteMensaje(id: number): Observable<any> {
    const headers = this.createHeaders();
    return this.http.delete(`${this.apiUrlMensajes}&id=${id}`, { headers });
  }
}
