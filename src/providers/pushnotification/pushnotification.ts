import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal';
import { Platform, NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { NativeStorage } from '@ionic-native/native-storage';


/*
  Generated class for the PushnotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class PushnotificationProvider {
  
  constructor ( private oneSignal: OneSignal,
                public  Platform:Platform,
                public  modalCtrl: ModalController,
                private http: HttpClient ,
                private nativeStorage: NativeStorage
  ) {
    console.log('Hello PushnotificationProvider Provider');
  }

  initNotification() {
    if (this.Platform.is('cordova')) {
      this.oneSignal.startInit('23154f20-404c-4127-ad54-7622ef56481f', '846916511719');
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
      this.oneSignal.handleNotificationOpened().subscribe((res) => {
        this.nativeStorage.remove('badge')
        let NotificacionPush = this.modalCtrl.create('NotificacionmodalPage',{
            title: res.notification.payload.title,
            subTitle: res.notification.payload.body,         
        });
        NotificacionPush.present();
      });    
      this.oneSignal.endInit();
    } else {
      console.log('Onesignal no disponible en chrome');      
    }
  }
  
  getNotifications() {  
    var oneSignalURl = "https://onesignal.com/api/v1/notifications?";
    const appId = "23154f20-404c-4127-ad54-7622ef56481f";
    var headersParams = 
    {
         "Content-Type": "application/json",
         "Authorization": "Basic ZWYxZmE1NzUtMWI5Yi00NGQxLTkwOGYtZTcyZDYwNDNkNzEz",
         "Cache-Control": "no-cache"
    };
    var options = {
      headers: headersParams,
      cache: false
    }
    let  consulta = this.http.get(oneSignalURl+ "app_id="+appId+"&limit=10",options)
    if (consulta) {
      console.log('se consulto');
      return consulta 
    } 
  }
}