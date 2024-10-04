import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-agregar-usuario',
  templateUrl: './modal-agregar-usuario.component.html',
  styleUrls: ['./modal-agregar-usuario.component.css']
})
export class ModalAgregarUsuarioComponent {
  nombreUsuario: string;
  mail: string;
  clave: string;
  idgrupo: number;

  constructor(
    public dialogRef: MatDialogRef<ModalAgregarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.nombreUsuario = data.nombreUsuario || ''; // Inicializa las variables con los datos recibidos
    this.mail = data.mail || '';
    this.clave = data.clave || '';
    this.idgrupo = data.idgrupo || '';
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.nombreUsuario.trim() && this.mail.trim() && this.clave.trim() && this.idgrupo) {
/*       this.dialogRef.close(this.nombreUsuario);
      this.dialogRef.close(this.mail);
      this.dialogRef.close(this.clave);
      this.dialogRef.close(this.idgrupo);  */
      
      const usuario = {
        nombreUsuario: this.nombreUsuario,
        mail: this.mail,
        clave: this.clave,
        idgrupo: this.idgrupo
      };
      this.dialogRef.close(usuario);
      
    }
    }
  }