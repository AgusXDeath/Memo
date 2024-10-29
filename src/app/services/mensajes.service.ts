import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {
  private apiUrl = 'http://localhost/api-actualizada/public/index.php';
  
  constructor(private http: HttpClient) {}

  // Headers con token JWT
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Obtener bandeja de entrada
  getBandejaEntrada(): Observable<any> {
    return this.http.get(`${this.apiUrl}?resource=bandejaEntrada`, { headers: this.getHeaders() });
  }

  // Obtener bandeja de salida
  getBandejaSalida(): Observable<any> {
    return this.http.get(`${this.apiUrl}?resource=bandejaSalida`, { headers: this.getHeaders() });
  }

  // Obtener mensajes favoritos
  getFavoritos(): Observable<any> {
    return this.http.get(`${this.apiUrl}?resource=favoritos`, { headers: this.getHeaders() });
  }

  // Obtener mensajes en la papelera
  getPapelera(): Observable<any> {
    return this.http.get(`${this.apiUrl}?resource=papelera`, { headers: this.getHeaders() });
  }

  // Enviar mensaje
  enviarMensaje(receptormail: string, mensaje: string): Observable<any> {
    const body = { receptormail, mensaje };
    return this.http.post(`${this.apiUrl}?resource=mensajes`, body, { headers: this.getHeaders() });
  }

  // Borrar mensaje
  deleteMensaje(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}?resource=mensajes&id=${id}`, { headers: this.getHeaders() });
  }

  // Actualizar mensaje
  updateMensaje(id: number, mensaje: string): Observable<any> {
    const body = { mensaje };
    return this.http.put(`${this.apiUrl}?resource=mensajes&id=${id}`, body, { headers: this.getHeaders() });
  }
   // Agregar a favoritos
   agregarAFavorito(id: number): Observable<any> {
    const body = { estadoFavorito: true }; // Datos a enviar para actualizar el estado
    return this.http.put(`${this.apiUrl}?resource=mensajes&id=${id}`, body, { headers: this.getHeaders() });
  }
}
