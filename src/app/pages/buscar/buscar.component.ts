import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../providers/movie.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  public buscar:string;

  constructor( public _movie: MovieService, private activateRouter: ActivatedRoute ) {
      this.activateRouter.params.subscribe( params => {
          if( params['texto'] ){
            this.buscar = params['texto'];
            this.buscarPelicula();
          }
      })
   }

  ngOnInit() {}

  buscarPelicula(){

    if( this.buscar.length === 0 ){
      return;
    }
    
    this._movie.buscarPelicula( this.buscar ).subscribe( resp => console.log(resp))

  }

}
