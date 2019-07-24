import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  noticias: Article[] = [];
  constructor(private storage: Storage) {
      this.cargarFavoritos();
   }

   guardarNoticia(noticia: Article) {
        const existe = this.noticias.find(noti => noti.title === noticia.title);
        if (!existe) {

          this.noticias.unshift(noticia); // unshift lo pone al principio del arreglo
          this.storage.set('favoritos', this.noticias);
        }
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
