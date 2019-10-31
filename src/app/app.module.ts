import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


//Components
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { PeliculaComponent } from './pages/pelicula/pelicula.component';
import { LoginComponent } from './auth/login/login.component'
import { RegistroComponent } from './auth/registro/registro.component';
import { NabvarComponent } from './shared/nabvar/nabvar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MovieCardsComponent } from './components/movie-cards/movie-cards.component';
import { GaleriaComponent } from './components/galeria/galeria.component';

//Ruotes
import { AppRoutingModule } from './app-routing.module';

//Pipes
import { PeliculasImagenPipe } from './pipes/peliculas-imagen.pipe';







@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BuscarComponent,
    PeliculaComponent,
    LoginComponent,
    RegistroComponent,
    NabvarComponent,
    FooterComponent,
    MovieCardsComponent,
    PeliculasImagenPipe,
    GaleriaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
