// Importaciones necesarias de Angular y RxJS
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Mensaje {
  id?: number; // ID opcional para los nuevos mensajes
  emisor: string;
  receptor: string;
  contenido: string;
  estadoLeido: boolean;
  estadoRecibido: boolean;
  estadoFavorito: boolean;
  estadoPapelera: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiUrlUsuarios = 'http://localhost/Memo/api-php/public/index.php?resource=usuarios';
  private apiUrlGrupos = 'http://localhost/Memo/api-php/public/index.php?resource=grupos';
  private apiUrlFunciones = 'http://localhost/Memo/api-php/public/index.php?resource=funciones';
  private apiUrlGrupoFunciones = 'http://localhost/Memo/api-php/public/index.php?resource=gruposfunciones';
  private apiUrlMensajes = 'http://localhost/Memo/api-php/public/index.php?resource=mensajes';
  
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
  
  createGrupoFuncion(grupoFunciones: any): Observable<any> {
    return this.http.post(this.apiUrlGrupoFunciones, grupoFunciones);
  }
  
  updateGrupoFuncion(id: number, grupoFunciones: any): Observable<any> {
    return this.http.put(`${this.apiUrlGrupoFunciones}&id=${id}`, grupoFunciones);
  }
  
  deleteGrupoFuncion(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrlGrupoFunciones}&id=${id}`);
  }
  // Métodos para Mensajes
  getMensajes(): Observable<Mensaje[]> {
    return this.http.get<Mensaje[]>(this.apiUrlMensajes).pipe(
      catchError(this.handleError)
    );
  }

  getMensajeById(id: number): Observable<Mensaje> {
    return this.http.get<Mensaje>(`${this.apiUrlMensajes}&id=${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createMensaje(mensaje: Mensaje): Observable<Mensaje> {
    return this.http.post<Mensaje>(this.apiUrlMensajes, mensaje).pipe(
      catchError(this.handleError)
    );
  }

  updateMensaje(id: number, mensaje: Mensaje): Observable<Mensaje> {
    return this.http.put<Mensaje>(`${this.apiUrlMensajes}&id=${id}`, mensaje).pipe(
      catchError(this.handleError)
    );
  }

  deleteMensaje(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrlMensajes}&id=${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('Ocurrió un error:', error);
    return throwError(() => new Error('Error en la solicitud, intenta de nuevo más tarde.'));
  }

}
