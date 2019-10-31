import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../providers/movie.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public peliculasPopulares: any[];
  public peliculasChicos: any[];

  constructor( private _movies: MovieService ) {}

  ngOnInit() {

    this._movies.getPopulares().subscribe( resp => {
        this.peliculasPopulares = resp;
    })


    this._movies.getNiños().subscribe( resp => {
      this.peliculasChicos = resp;
    })
  }

}
