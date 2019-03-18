import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { NativeStorage } from '@ionic-native/native-storage';

/**
 * Generated class for the MispagosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mispagos',
  templateUrl: 'mispagos.html',
})
export class MispagosPage {

  
  public pagosBot: boolean = false;
  public pagosTitulo:string = 'Mis Pagos';
  
  constructor (
                public  navCtrl: NavController,
                public  navParams: NavParams,
                public InAppBrowser: InAppBrowser,
                private nativeStorage:NativeStorage,
                private toastCtrl:ToastController
              ) {

                this.nativeStorage.getItem('network').then(network =>{
     
                  if(!network){
                    this.toastCtrl.create({
                      message:'Conéctate a una red para obtener tus datos.',
                      position:'bottom',
                      duration:3000
                    }).present();
                    this.navCtrl.setRoot('MenuslidesPage');
                  }
                })
  }

  goHome(){
    this.navCtrl.setRoot('MenuslidesPage')
  }

  pagosPecLink() {
    this.InAppBrowser.create("https://botondepago.cun.edu.co:8443/BotonPago","_blank", 'location=no');
  }

  estadoCuenta() {
    this.InAppBrowser.create("https://plataformas.cun.edu.co/estadocuenta/","_blank", 'location=no'); 
  }
}
