import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { NativeStorage } from '@ionic-native/native-storage';



@IonicPage()
@Component({
  selector: 'page-notas',
  templateUrl: 'notas.html',
})
export class NotasPage {

  constructor (
                public InAppBrowser:InAppBrowser,
                public navCtrl: NavController,
                private nativeStorage:NativeStorage,
                private toastCtrl:ToastController
              )
  {
    this.nativeStorage.getItem('network').then(network =>{
     
      if(network){
        this.InAppBrowser.create("http://sigwt.cun.edu.co:8080/sinugwt/","_blank",'location=no');
        this.navCtrl.setRoot('MenuslidesPage');
      }else{
        this.toastCtrl.create({
          message:'Conéctate a una red para obtener tus datos.',
          position:'bottom',
          duration:3000
        }).present();
        this.navCtrl.setRoot('MenuslidesPage');
      }
    })
   
  }
}

