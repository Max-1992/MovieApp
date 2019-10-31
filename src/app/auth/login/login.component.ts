import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Modelos
import { UserModel } from '../../models/users';

// Servicios
import { AuthService } from '../../providers/auth.service';

// Librerias
import Swal from 'sweetalert2';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user:UserModel;
  public form:FormGroup;

  constructor( private _auth:AuthService, private _route:Router ) { 
    this.user = new UserModel;
  }

  ngOnInit() {
    this.form = this.FormStructure();
    this.leerUsuario();
    this.form.valueChanges.subscribe( (data:UserModel) => this.user = data );
  }

 // Estructura del Formulario
 private FormStructure(){
   return new FormGroup({
     'email': new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
     'password': new FormControl('',Validators.required),
     'remember': new FormControl(true)
   })
 };

 //Evento Submint
 public login(){

  if ( this.form.invalid ){
    Swal.fire({
      type: 'error',
      title: 'Formulario Invalido',
      text: 'Por favor verifique que todos los campos del formulario hayan sido completados correctamente',
    })
    
    return; 
    }

    this.ingreser();

}

// Métodos

private ingreser(){
  Swal.fire({
    allowOutsideClick: false,
    type: 'success',
    title: 'Ingresando',
    text: '¡Estamos validando sus credenciales, por favor aguarde un momento!'
  })
  Swal.showLoading();

  this._auth.login( this.user )
            .subscribe( res => {
              Swal.close()
              this.rememberUser()
              this._route.navigate(['/home']);

              console.log(res)

              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
              })
              
              Toast.fire({
                type: 'success',
                title: 'Incio sesión correctamente'
              })

            }, (err) => {
              console.log(err)

              Swal.fire({
                type: 'error',
                title: `${err.error.error.message}`
              })
            })
}

private rememberUser(){
  if( !this.user.rememeber ){
    localStorage.setItem('email', this.user.email)
  }
}

private leerUsuario(){
  if( localStorage.getItem('email') ) {
    this.form.setValue({
      'email': localStorage.getItem('email'),
      'password': '',
      'remember': true
    })

  }
}

// Apuntadores
get email(){
  return this.form.get('email');
}

get password(){
  return this.form.get('password');
}

}
