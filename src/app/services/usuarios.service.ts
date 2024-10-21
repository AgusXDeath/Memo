// Importaciones necesarias de Angular y RxJS
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiUrlUsuarios = 'http://localhost/Memo/api-php/public/index.php?resource=usuarios';
  private apiUrlGrupos = 'http://localhost/Memo/api-php/public/index.php?resource=grupos';
  private apiUrlFunciones = 'http://localhost/Memo/api-php/public/index.php?resource=funciones';
  private apiUrlGrupoFunciones = 'http://localhost/Memo/api-php/public/index.php?resource=gruposfunciones';
  private apiUrlLogin = 'http://localhost/Memo/api-php/public/index.php?resource=login';
  
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
  
  // Métodos para Usuarios
  getUsuarios(): Observable<any[]> {
    const headers = this.createHeaders();
    return this.http.get<any[]>(this.apiUrlUsuarios, { headers });
  }
  
  createUsuario(usuario: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(this.apiUrlUsuarios, usuario, { headers });
  }
  
  updateUsuario(id: number, usuario: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.put(`${this.apiUrlUsuarios}&id=${id}`, usuario, { headers });
  }
  
  deleteUsuario(id: number): Observable<any> {
    const headers = this.createHeaders();
    return this.http.delete(`${this.apiUrlUsuarios}&id=${id}`, { headers });
  }
  
  // Métodos para Grupos
  getGrupos(): Observable<any[]> {
    const headers = this.createHeaders();
    return this.http.get<any[]>(this.apiUrlGrupos, { headers });
  }
  createGrupo(grupo: any): Observable<any> {
    const headers = this.createHeaders();
    console.log('Datos que se envían para crear grupo:', grupo);
    return this.http.post(this.apiUrlGrupos, grupo, { headers });
  }
  
  updateGrupo(id: number, grupo: any): Observable<any> {
    const headers = this.createHeaders();
    console.log('Datos que se envían para actualizar grupo:', grupo);
    return this.http.put(`${this.apiUrlGrupos}&id=${id}`, grupo, { headers });
  }
  
  deleteGrupo(id: number): Observable<any> {
    const headers = this.createHeaders();
    return this.http.delete(`${this.apiUrlGrupos}&id=${id}`, { headers });
  }
  
  // Métodos para Funciones
  getFunciones(): Observable<any[]> {
    const headers = this.createHeaders();
    return this.http.get<any[]>(this.apiUrlFunciones, { headers });
  }
  
  createFuncion(funcion: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(this.apiUrlFunciones, funcion, { headers });
  }
  
  updateFuncion(id: number, funcion: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.put(`${this.apiUrlFunciones}&id=${id}`, funcion, { headers });
  }
  
  deleteFuncion(id: number): Observable<any> {
    const headers = this.createHeaders();
    return this.http.delete(`${this.apiUrlFunciones}&id=${id}`, { headers });
  }
  
  // Métodos para Grupo Funciones
  getGrupoFunciones(): Observable<any[]> {
    const headers = this.createHeaders();
    return this.http.get<any[]>(this.apiUrlGrupoFunciones, { headers });
  }
  
  createGrupoFuncion(grupoFuncion: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(this.apiUrlGrupoFunciones, grupoFuncion, { headers });
  }
  
  updateGrupoFuncion(id: number, grupoFuncion: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.put(`${this.apiUrlGrupoFunciones}&id=${id}`, grupoFuncion, { headers });
  }
  
  deleteGrupoFuncion(id: number): Observable<any> {
    const headers = this.createHeaders();
    return this.http.delete(`${this.apiUrlGrupoFunciones}&id=${id}`, { headers });
  }

  // Método para Login
  login(mail: string, clave: string): Observable<any> {
    const headers = this.createHeaders();
    const loginData = { mail, clave };
    return this.http.post(this.apiUrlLogin, loginData, { headers });
  } 

  
 
}
