import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';
import {CamiExp} from '../';

/**
 * Generated class for the CamiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cami',
  templateUrl: 'cami.html',
})
export class CamiPage {


  public bibliotecaBotones: boolean = false;
  public bibliotecaVirtual: boolean = false;
  public bibliotecaCatalogo: boolean = false;
  public BibliotecaTitulo:string = 'cami';
  
  constructor (
                public navCtrl: NavController,
                public navParams: NavParams,
                private inAppBrowser:InAppBrowser,
                private alertCtrl : AlertController,
                public document: DocumentViewer,
                public modalCtrl: ModalController
              ) {
  }

  escribe() {
    let doc = document.getElementById('frame');
    doc.innerHTML = "<iframe class='iframeBiblioteca' src='https://console.dialogflow.com/api-client/demo/embedded/3d57dea3-a597-4399-8391-3b8a62bee354' frameBorder='0'></iframe>"
    this.bibliotecaBotones= true;    
  
  }

  ticket() {
    // let doc = document.getElementById('frame');
    // doc.innerHTML = "<iframe class='iframeBiblioteca' src='https://desk.zoho.com/portal/cunportal/home' frameBorder='0'></iframe>"
    // this.bibliotecaBotones= true;  

    this.inAppBrowser.create(" https://desk.zoho.com/portal/cunportal/home","_blank",)
  }
  
  experiencia() {
    const camimodal = this.modalCtrl.create(CamiExp);
    camimodal.present();
  }

  closeIframe() {    
    this.bibliotecaBotones= false;
    this.BibliotecaTitulo = "cami";
  }

  goHome() {
    this.navCtrl.setRoot('MenuCunPage')
  }

}
