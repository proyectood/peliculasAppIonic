import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Actores, PeliculaDetalle } from 'src/app/interfaces/interfaces';
import { DataLocalService } from 'src/app/services/data-local.service';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id;
  pelicula: PeliculaDetalle = {};
  actores: Actores[] = [{}];
  textoVisible = 150;
  slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5
  };
  estrella = 'star-outline';

  constructor(private servicioDb: MoviesService, private modalCtrl: ModalController, private dataLocal: DataLocalService) { }

  ngOnInit() {
    this.dataLocal.existePelicula( this.id ).then(existe => this.estrella = (existe) ? 'star' : 'star-outline');

    this.servicioDb.getPeliculaDetalle( this.id ).subscribe(
      resp => {
        console.log("Detalle de la pelicula: ",resp);
        this.pelicula = resp;
      }
    );
    this.servicioDb.getPeliculaActores( this.id ).subscribe(
      resp => {
        console.log("Actores de la pelicula: ",resp);
        this.actores = resp.cast;
      }
    );
  }

  regresar(){
    this.modalCtrl.dismiss();
  }

  async favorito(){
    const existe = this.dataLocal.guardarPelicula( this.pelicula );
    this.estrella = (existe) ? 'star' : 'star-outline';
  }

}
