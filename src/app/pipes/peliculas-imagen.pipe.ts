import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'peliculasImagen'
})
export class PeliculasImagenPipe implements PipeTransform {

  transform( pelicula:any, poster:boolean = false ): any {

    let url: 'http://image.tmdb.org/t/p/w500'

    if( poster ){
      return 'http://image.tmdb.org/t/p/w500' + pelicula.poster_path
    }
     
    if ( pelicula.backdrop_path ){
      
          return  'http://image.tmdb.org/t/p/w500' + pelicula.backdrop_path
      } 
      
    if ( pelicula.poster_path ){
      return 'http://image.tmdb.org/t/p/w500' + pelicula.poster_path
        } else {
              return 'assets/img/noimage.png';
          }
  }

}
