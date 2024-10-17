import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiUrlUsuarios = 'http://localhost/api-php2/public/index.php?resource=usuarios';
  private apiUrlGrupos = 'http://localhost/api-php2/public/index.php?resource=grupos';
  private apiUrlFunciones = 'http://localhost/api-php2/public/index.php?resource=funciones';
  private apiUrlGrupoFunciones = 'http://localhost/api-php2/public/index.php?resource=grupofunciones';
  private apiUrlLogin = 'http://localhost/api-php2/public/index.php?resource=login';
  
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
  
  // Métodos para Grupos
  getGrupos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlGrupos);
  }
  createGrupo(grupo: any): Observable<any> {
    console.log('Datos que se envían para crear grupo:', grupo);
    return this.http.post(this.apiUrlGrupos, grupo);
  }
  
  updateGrupo(id: number, grupo: any): Observable<any> {
    console.log('Datos que se envían para actualizar grupo:', grupo);
    return this.http.put(`${this.apiUrlGrupos}&id=${id}`, grupo);
  }
  
  deleteGrupo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrlGrupos}&id=${id}`);
  }
  
  // Métodos para Funciones
  getFunciones(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlFunciones);
  }
  
  createFuncion(funcion: any): Observable<any> {
    return this.http.post(this.apiUrlFunciones, funcion);
  }
  
  updateFuncion(id: number, funcion: any): Observable<any> {
    return this.http.put(`${this.apiUrlFunciones}&id=${id}`, funcion);
  }
  
  deleteFuncion(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrlFunciones}&id=${id}`);
  }
  
  // Métodos para Grupo Funciones
  getGrupoFunciones(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlGrupoFunciones);
  }
  
  createGrupoFuncion(grupoFuncion: any): Observable<any> {
    return this.http.post(this.apiUrlGrupoFunciones, grupoFuncion);
  }
  
  updateGrupoFuncion(id: number, grupoFuncion: any): Observable<any> {
    return this.http.put(`${this.apiUrlGrupoFunciones}&id=${id}`, grupoFuncion);
  }
  
  deleteGrupoFuncion(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrlGrupoFunciones}&id=${id}`);
  }

  // Método para Login
  login(mail: string, clave: string): Observable<any> {
    const loginData = { mail, clave };
    return this.http.post(this.apiUrlLogin, loginData);
  } 
}