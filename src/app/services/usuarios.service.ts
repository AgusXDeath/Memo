import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private urlApi = 'http://localhost/api/public/index.php';

  constructor(private http: HttpClient) { }

  public getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.urlApi);
  }
} 
