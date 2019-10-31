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
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public user:UserModel;
  public form:FormGroup;

  constructor( private _auth:AuthService, private _route:Router ) { 
    this.user = new UserModel;
    
  }

  ngOnInit() {
    this.form = this.FormStructure();
    this.form.valueChanges.subscribe( ( data:UserModel ) => this.user = data );
  }

  // Estructura del Formulario
  private FormStructure(){
    return new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
      'password': new FormControl('', [ Validators.required, this.passwordValid ]),
      'remember': new FormControl('')
    })
  };

  //Evento Submint
  public signUp(){

    if ( this.form.invalid ){
      Swal.fire({
        type: 'error',
        title: 'Formulario Invalido',
        text: 'Por favor verifique que todos los campos del formulario hayan sido completados correctamente',
      })
      
      return;

      }
      
      console.log(this.user)
      this.userRegister();
     

  }

  // Métodos

   userRegister(){
    Swal.fire({
      allowOutsideClick: false,
      type: 'success',
      title: 'Creando Usuario',
      text: '¡Estamos creando su cuenta, por favor aguarde un momento!'
    })
    Swal.showLoading();
    this._auth.registrar( this.user )
                .subscribe( res => {
                  Swal.close()
                  console.log(res);
                  
                  this.rememberUser();

                  this._route.navigate(['/home'])

                  const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                  })
                  
                  Toast.fire({
                    type: 'success',
                    title: 'Su usuario se a creado correctamente'
                  })
      }, (err) => {
        
        console.log(err)
        Swal.fire({
          type: 'error',
          title: `${err.error.error.message}`
        })
       });
  }

  private rememberUser(){
    if( !this.user.rememeber ){
      localStorage.setItem('email', this.user.email)
    }
  }



  // Apuntadores
  get email(){
    return this.form.get('email');
  }

  get password(){
    return this.form.get('password');
  }

  // Validaciones Personalizadas

  passwordValid( password:FormControl ):any{
    
    if( password.value.length < 6 ){
      return {
        'passwordValidation': { message: 'La contraseña debe contener al menos 6 caracteres' }
      }
    }

    if ( password.value === password.value.toLowerCase() ){
      return {
        'passwordValidation': { message: 'La contraseña debe contener al menos un caracter en mayúscula' }
      }
    }

    if ( password.value === password.value.toUpperCase() ){
      return {
        'passwordValidation': { message: 'La contraseña debe contener al menos un caracter en minúscula' }
      }
    }

    if ( !/\d/.test(password.value)  ){
      return {
        'passwordValidation': { message: 'La contraseña debe contener al menos un caracter en numérico' }
      }
    }

  }

}
