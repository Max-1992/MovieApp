import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../providers/movie.service';



@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  pelicula:any;
  generos:any[]
  id:string;
  page:string;
  busqueda:string;

  constructor( private _movie: MovieService, private activateRouter: ActivatedRoute ) { 

    this.activateRouter.params.subscribe( params => {
        this.id = params['id'];
        this.page = params['pag'];

        if( params['busqueda'] ){
            this.busqueda = params['busqueda'];
        }
    });

  }

  ngOnInit() {
    this._movie.getPelicula( this.id )
               .subscribe( (resp:any) => {
                    console.log(resp);
                    this.pelicula = resp;
                    this.generos = resp.genres;
                });
  }

}
