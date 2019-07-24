import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  noticias: Article[] = [];
  constructor(private storage: Storage,
              public toastController: ToastController
            ) {
      this.cargarFavoritos();
   }

   async presentToast( message: string ) {
    const toast = await this.toastController.create({
      message,
      duration: 1500
    });
    toast.present();
  }

   guardarNoticia(noticia: Article) {
        const existe = this.noticias.find(noti => noti.title === noticia.title);
        if (!existe) {

          this.noticias.unshift(noticia); // unshift lo pone al principio del arreglo
          this.storage.set('favoritos', this.noticias);
        }
        this.presentToast('Agregado a favorito');
   }

   borrarNoticia( noticia: Article ) {
      this.noticias =  this.noticias.filter(noti => noti.title !== noticia.title); // excluye y borra el elemento
      this.storage.set('favoritos', this.noticias);
      this.presentToast('Borrado de  favorito');
   }

   async cargarFavoritos() {
     /*
      this.storage.get('favoritos')
          .then( favoritos => { // si no existe manda undefined y si existe el objeto
            console.log('favoritos', favoritos);
          });
      */

      // return await this.storage.get('favoritos');

      const favoritos = await this.storage.get('favoritos');
      if ( favoritos  ) {
        console.log('async await', favoritos);
        this.noticias = favoritos;
      } else {
        this.noticias = [];
      }
   }
}
