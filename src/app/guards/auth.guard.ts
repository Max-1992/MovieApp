import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

// Service
import { AuthService } from '../providers/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private _auth:AuthService, private router:Router ){}

  canActivate(){

    if( this._auth.statusAutentication() ){
        return true;
    } else {
        this.router.navigateByUrl('/login');
        return false;
    }

  }

}
