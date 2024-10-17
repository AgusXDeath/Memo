// Importaciones necesarias de Angular y RxJS
import { HttpClient } from '@angular/common/http'; // Para realizar solicitudes HTTP
import { Injectable } from '@angular/core'; // Para poder usar la inyección de dependencias en Angular
import { Observable } from 'rxjs'; // Para trabajar con observables, que permiten manejar datos asíncronos

@Injectable({
  providedIn: 'root' // Indica que este servicio estará disponible a nivel de toda la aplicación
})
export class UsuariosService {

  private apiUrlUsuarios = 'http://localhost/Memo/api-php/public/index.php?resource=usuarios';
  private apiUrlGrupos = 'http://localhost/Memo/api-php/public/index.php?resource=grupos';
  private apiUrlFunciones = 'http://localhost/Memo/api-php/public/index.php?resource=funciones';
  private apiUrlGrupoFunciones = 'http://localhost/Memo/api-php/public/index.php?resource=gruposfunciones';
  private apiUrlMensajes = 'http://localhost/Memo/api-php/public/index.php?resource=mensajes';  // URL para mensaje

  
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

   // Métodos para Mensajes (NUEVO)
   getMensajes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlMensajes);
  }

  getMensajeById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrlMensajes}&id=${id}`);
  }

  createMensaje(mensaje: any): Observable<any> {
    return this.http.post(this.apiUrlMensajes, mensaje);
  }

  updateMensaje(id: number, mensaje: any): Observable<any> {
    return this.http.put(`${this.apiUrlMensajes}&id=${id}`, mensaje);
  }

  deleteMensaje(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrlMensajes}&id=${id}`);
  }
  getMensajesEntrada(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrlMensajes}&tipo=entrada`);  // Filtra los mensajes recibidos
  }
  
  getMensajesSalida(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrlMensajes}&tipo=salida`);  // Filtra los mensajes enviados
  }
  
  getMensajesBorrador(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrlMensajes}&tipo=borrador`);  // Filtra los mensajes guardados
  }
}
