import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apikey:string = "17916cf9e24f1c0d77adb0cff7f90ccc";
  private urlMoviedb:string = "https://api.themoviedb.org/3";
  public peliculas:any[] = [];

  constructor( private http: HttpClient ) { }

  getPopulares(){
   return this.http.get(`${this.urlMoviedb}/discover/movie?sort_by=popularity.desc&api_key=${this.apikey}&language=es`)               .pipe(
                        map( (resp:any) => { 
                          return  resp.results
                        })
                      ) 
    
  }

  getNiños(){
    return this.http.get(`${this.urlMoviedb}/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=${this.apikey}&language=es`)
                    .pipe(
                      map( (resp:any) => {
                        return resp.results
                      })
                    )
  }

  buscarPelicula( texto:string ){
      return this.http.get(`${this.urlMoviedb}/search/movie?query=${ texto }&sort_by=popularity.desc&api_key=${ this.apikey }&language=es`)
                      .pipe(
                        map( (resp:any) => {
                          this.peliculas = resp.results
                          return resp.results;
                        })
                      )
  }

getPelicula( id:string ){
 return this.http.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${this.apikey}&language=es`)
}

}
