import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../providers/auth.service';



@Component({
  selector: 'app-nabvar',
  templateUrl: './nabvar.component.html',
  styleUrls: ['./nabvar.component.css']
})
export class NabvarComponent implements OnInit {

  constructor( private router: Router, private _auth: AuthService) { }

  ngOnInit() {
  }

  logaut(){
    this._auth.logaut();
    this.router.navigate([ 'login' ]);
  }

  buscarPelicula( pelicula:string ){

    if( pelicula.length === 0 ){
      return;
    }
    
    this.router.navigate([ 'buscar', pelicula ])
    
  }

}
