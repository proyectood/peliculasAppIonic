import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  peliculasRecientes: Pelicula[] = [];

  peliculasPopulares: Pelicula[] = [];

  slidesOpts = {
    slidesPerView: 1.3,
    freeMode: true
  }

  constructor(private servicioDb: MoviesService) {}

  ngOnInit(){
    this.servicioDb.getFeature().subscribe( resp => {
      console.log('Respuesta: ', resp)
      this.peliculasRecientes = resp.results;
    } );

    this.servicioDb.getPopulares().subscribe( resp => {
      console.log('Populares: ', resp)
      this.peliculasPopulares = resp.results;
    } );
  }

}
