import { Component, OnInit } from '@angular/core';
import { Genre, PeliculaDetalle } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  peliculas: PeliculaDetalle[] = [];
  generos: Genre[] = [];
  favoritosGenero: any[] = [];

  constructor(private dataLocal: DataLocalService, private servicioDb: MoviesService) {}

  async ngOnInit() {
    
  }

  async ionViewWillEnter(){
    this.peliculas = await this.dataLocal.cargarFavoritos();
    this.generos = await this.servicioDb.cargarGeneros();
    this.peliculasPorGenero(this.generos, this.peliculas);
  }

  peliculasPorGenero(generos: Genre[], peliculas: PeliculaDetalle[]){
    this.favoritosGenero = [];
    generos.forEach(genero =>{
      this.favoritosGenero.push({
        genero: genero.name,
        peliculas: peliculas.filter( pelicula => {
          return pelicula.genres.find(genre => genre.id === genero.id );
        })
      });
    });
  }

}
