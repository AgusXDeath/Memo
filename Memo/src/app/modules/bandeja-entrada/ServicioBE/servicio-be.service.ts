import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioBeService {

  private apiUrlBE = 'http://localhost/api-actualizada/public/index.php?resource=bandejaEntrada';

  constructor(private http: HttpClient) { }

  getMensajes(): Observable<any[]> {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.parseJwt(token);
      const idUsuario = decodedToken.sub; //extraer el idUsuario del token
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get<any[]>(`${this.apiUrlBE}&idUsuarios=${idUsuario}`, { headers });
    }
    return throwError('Token no encontrado');
  }

  private parseJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  } 
}