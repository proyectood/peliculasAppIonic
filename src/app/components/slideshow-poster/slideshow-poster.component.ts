import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pelicula } from '../../interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {

  @Input() peliculas: Pelicula[] = [];
  @Output() recargar = new EventEmitter();
  
  slidesOpts = {
    slidesPerView: 3.5,
    freeMode: true
  }

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  async verDetalle(id: string){
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });
    modal.present();
    const { data } = await modal.onDidDismiss();
    if(data.accion === 'recargar'){
      this.recargar.emit();
    }
  }



}
