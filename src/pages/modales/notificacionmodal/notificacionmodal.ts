import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PushnotificationProvider} from '../../../providers/pushnotification/pushnotification';
import { OneSignal } from '@ionic-native/onesignal';

/**
 * Generated class for the NotificacionmodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notificacionmodal',
  templateUrl: 'notificacionmodal.html',
})
export class NotificacionmodalPage {

  Notificaciones = [];
  
  constructor ( 
                public navCtrl: NavController,
                public navParams: NavParams,
                public notificationProvider:PushnotificationProvider,
                private oneSignal:OneSignal
              ) {
    this.getNotifications();
    this.Notificaciones.slice(0);
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad NotificacionmodalPage');
    this.getNotifications();
  }

 getNotifications() {
    let notData = this.notificationProvider.getNotifications().subscribe((datano)=> {     
      this.Notificaciones = datano['notifications']; 
      return this.Notificaciones;
    })
  }

  doRefresh(refresher) {
    this.notificationProvider.getNotifications().subscribe(dataRefresh =>{
      this.Notificaciones = dataRefresh['notifications'];
    })
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 1000);
  }
}