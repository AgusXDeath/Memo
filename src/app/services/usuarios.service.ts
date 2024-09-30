import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiUrlUsuarios = 'http://localhost/api-php/public/index.php?resource=usuarios';
  private apiUrlGrupos = 'http://localhost/api-php/public/index.php?resource=grupos';
  private apiUrlFunciones = 'http://localhost/api-php/public/index.php?resource=funciones';
  private apiUrlGrupoFunciones = 'http://localhost/api-php/public/index.php?resource=grupofunciones';
  
  constructor(private http: HttpClient) { }
  
  // Métodos para Usuarios
  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlUsuarios);
  }
  
  createUsuario(usuario: any): Observable<any> {
    return this.http.post(this.apiUrlUsuarios, usuario);
  }
  
  updateUsuario(id: number, usuario: any): Observable<any> {
    return this.http.put(`${this.apiUrlUsuarios}&id=${id}`, usuario);
  }
  
  deleteUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrlUsuarios}&id=${id}`);
  }
}