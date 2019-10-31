import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/users';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url:string = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apikey:string = 'AIzaSyDGFmUP7ZkFjDQ9O3xj850LbCq0sNysCVE';
  private userToken:string;

  constructor( private http:HttpClient ) {
      this.leerToken();
   }

public registrar( user:UserModel ){

    let userData = {
      ...user,
        returnSecureToken:true
    }

   return this.http.post(`${this.url}signUp?key=${this.apikey}`, userData)
                   .pipe(
                     map( res => {
                       
                       this.guardarToken( res['idToken'], res['expiresIn'])
                       return res;

                     })
                   )
}

public login( user:UserModel ){
  let userData = {
    ...user,
      returnSecureToken:true
  }

  return this.http.post(`${this.url}signInWithPassword?key=${this.apikey}`, userData)
                  .pipe(
                    map( res => {
                      this.guardarToken( res['idToken'], res['expiresIn'] )
                      return res;
                    })
                  )

}

logaut(){
  localStorage.removeItem('token');
}

private guardarToken( idToken:string, expirtion:number ){
  this.userToken = idToken;

  localStorage.setItem('token', idToken);

  let hoy = new Date;

  hoy.setSeconds( expirtion );

  localStorage.setItem('expiration', hoy.getTime().toString())

}

public leerToken(){
  if( localStorage.getItem( 'Token' ) ){
    this.userToken = localStorage.getItem( 'Token' );
  } else {
    this.userToken = '';
  }

  return this.userToken;
}

public statusAutentication(){

  if( this.userToken.length < 2 ){
      return false;
  }

  const expiration = Number(localStorage.getItem('expiration'));

  const expirationToken = new Date();
        expirationToken.setTime(expiration);

  if( expirationToken > new Date() ){
        return true;
  } else {
        return false;
  }

}

}
