import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {
  form: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router) {
    // Inicializando el FormGroup con los controles necesarios
    this.form = this.fb.group({
      usuario: ['', [Validators.required]], // Control para el usuario
      password: ['', [Validators.required]] // Control para la contraseña
    });
  }

  ngOnInit(): void {

  }

  ingresar() {
    if (this.form.valid) {
      const usuario = this.form.value.usuario;
      const password = this.form.value.password;

      if (usuario === 'admin' && password === 'muni') {
        this.fakeloading();
      } else {
        // Si la validación falla, llamamos al método error
        this.error();
        this.form.reset();
      }
    }
  }

  // Método para mostrar un error
  error() {
    this._snackBar.open('Usuario o contraseña inválidos', '', {
      duration: 3000,
    });
  }

  fakeloading() {

    this.loading = true;
    setTimeout(() => {

      //redireccionamos al tashboard
      this.router.navigate(['dashboard']);
    }, 1500);
  }
}