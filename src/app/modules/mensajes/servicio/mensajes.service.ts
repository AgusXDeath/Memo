import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
    return this.http.post(this.apiUrlMensajes, mensaje);
  }

  updateMensaje(id: number, mensaje: any): Observable<any> {
    // Cambia la URL para que incluya el ID directamente en la ruta
    return this.http.put(`${this.apiUrlMensajes}&id=${id}`, mensaje);
  }

  deleteMensaje(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrlMensajes}&id=${id}`);
}
}
