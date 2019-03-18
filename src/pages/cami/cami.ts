import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Network } from '@ionic-native/network';



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


  conection:any;
  
  constructor (
                public navCtrl: NavController,
                public navParams: NavParams,
                public InAppBrowser:InAppBrowser,
                public toastCtrl: ToastController,
                public Network: Network,
  ){
   this.accesoInternet();
  }

  accesoInternet() {
    this.Network.onDisconnect().subscribe(() => {   
      if (this.Network.type === 'none' || this.Network.type === 'unknown' ) {
        alert('Conectate a una red wi-fi');  
        this.conection = this.Network.type;
      }
      alert('network was disconnected :-(');   
    }).unsubscribe();    
  }

  escribe() {
    if (this.conection === 'none' || this.conection === 'unknown') {
      this.goHome();
    }else{
      this.InAppBrowser.create("https://console.dialogflow.com/api-client/demo/embedded/3d57dea3-a597-4399-8391-3b8a62bee354","_blank", 'location=no');
    }
    
  }

  ticket() {
    this.InAppBrowser.create("https://desk.zoho.com/portal/cunportal/home","_blank",'location=no')
  }

  goHome() {
    this.navCtrl.setRoot('MenuslidesPage')
  }
}