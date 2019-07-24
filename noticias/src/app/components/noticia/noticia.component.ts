import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
  @Input() noticia: Article;
  @Input() indice: number;
  constructor(private iab: InAppBrowser,
              private actionSheetCtrl: ActionSheetController,
              private socialSharing: SocialSharing,
              private datalocalService: DataLocalService) { }

  ngOnInit() {}

  abrirNoticia() {
    console.log('Noticia', this.noticia.url);
    // plugin para abrir la noticia en el navegador: ionic cordova plugin add cordova-plugin-inappbrowser
    // npm install @ionic-native/in-app-browser

    const browser = this.iab.create(this.noticia.url, '_system');
  }

 async lanzarMenu() {
      const actionSheet = await this.actionSheetCtrl.create({
       // header: 'Albums',
        buttons: [
        {
          text: 'compartir',
          icon: 'share',
          cssClass: 'action-dark',
          handler: () => {
            console.log('Share clicked');
            // sharing se instala pluggins
            // ionic cordova plugin add cordova-plugin-x-socialsharing
            // npm install @ionic-native/social-sharing
            this.socialSharing.share(
              this.noticia.title,
              this.noticia.source.name,
              '',
              this.noticia.url
            );
          }
        }, {
          text: 'Favorito',
          icon: 'star',
          cssClass: 'action-dark',
          handler: () => {
            console.log('Favorito');
            // guardar en el storage cree una base de datos local
            // ionic cordova plugin add cordova-sqlite-storage
            // npm install --save @ionic/storage
            this.datalocalService.guardarNoticia(this.noticia);
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          cssClass: 'action-dark',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
      });
      await actionSheet.present();
  }

}
