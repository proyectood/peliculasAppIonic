import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';
import { Pelicula } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  txtBuscar = "";
  ideas : string[] = ['Spiderman', 'Avengers', 'El señor de los anillos', 'La vida es bella'];
  peliculas: Pelicula[] = [];
  buscando = false;

  constructor(private servicioDb: MoviesService, private modalCtrl: ModalController) {}

  buscar( event ){
    const valor = event.detail.value;
    if(valor.trim() == ''){
      return;
    }
    this.buscando = true;
    this.servicioDb.buscarPeliculas(valor).subscribe(resp => {
      this.peliculas = resp['results'];
      this.buscando = false;
    });
  }

  async verDetalle(id: string){
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });
    modal.present();
  }

}
