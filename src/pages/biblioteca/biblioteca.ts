import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'page-biblioteca',
  templateUrl: 'biblioteca.html',
})
export class BibliotecaPage {

  public bibliotecaBotones: boolean = false;
  public bibliotecaVirtual: boolean = false;
  public bibliotecaCatalogo: boolean = false;
  public BibliotecaTitulo:string = 'Biblioteca';
  
  constructor (
                public navCtrl: NavController,
                public navParams: NavParams,
                private inAppBrowser:InAppBrowser,
                private alertCtrl : AlertController) {
  }

  bibvirtual() {
    this.inAppBrowser.create("https://zproxy.cun.edu.co:2443/login","_blank",)  
  }

  bibcat() {
    let doc = document.getElementById('frame');
    doc.innerHTML = "<iframe class='iframeBiblioteca' src='http://biblioteca.cun.edu.co:81/uhtbin/cgisirsi/EOvL2oiJkh/CENTRAL/0/49' frameBorder='0'></iframe>"
    this.bibliotecaBotones= true;
    
    this.BibliotecaTitulo = "Catalogo";
  }

  closeIframe() {    
    this.bibliotecaBotones= false;
    this.BibliotecaTitulo = "Biblioteca";
  }

  goHome() {
    this.navCtrl.setRoot('MenuCunPage')
  }

  showInfo() {
    let alert = this.alertCtrl.create({
      title:'Crédenciales',
      message:'Usuario : Correo institucional \n Contraseña : # de documento',
      cssClass:'alertClass',
      buttons:[{
        text:'Ok',
        role: 'cancel',
        cssClass:'alertClass'
      }]      
    })
    alert.present();
  }
}
