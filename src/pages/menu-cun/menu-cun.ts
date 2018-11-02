import { CunapiProvider } from './../../providers';
import { NativeStorage } from '@ionic-native/native-storage';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, MenuController, ToastController, ViewController, Alert } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { Item } from '../../models/item';
import { BotonesMenu } from '../../providers';
import { AppAvailability } from '@ionic-native/app-availability';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { GooglePlus } from '@ionic-native/google-plus';
import {Platform} from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
import {PushnotificationProvider} from '../../providers/pushnotification/pushnotification';
import { OneSignal } from '@ionic-native/onesignal';


@IonicPage()
@Component({
  selector: 'page-menu-cun',
  templateUrl: 'menu-cun.html',
 
})
export class MenuCunPage {
  currentButtons: Item[];
  givenName: string ;
  email: string;
  imageUrl:string; 
  Notificaciones;
  public contador:boolean = true;
  

  constructor (
                public  navCtrl: NavController,
                public  navParams: NavParams,
                public  buttons:BotonesMenu,
                private device: Device,
                public  AppAvailability:AppAvailability,
                private inAppBrowser: InAppBrowser,
                private toggle : MenuController,
                private googlePlus: GooglePlus,
                private afAuth: AngularFireAuth,
                private platform : Platform,                     
                private nativeStorage: NativeStorage,
                private cunMovilAPI : CunapiProvider,
                public  modalCtrl: ModalController,
                private toastCtrl: ToastController,
                public oneSignal :OneSignal,
                public notificationProvider:PushnotificationProvider,
                public viewCtrl: ViewController           
            ) {         
  }

  ionViewWillEnter() {   
    let env = this;    
    env.nativeStorage.getItem('badge').then((res)=> {      
      env.contador = false; 
      env.Notificaciones= res;       
    });
    env.nativeStorage.getItem('user')
    .then(function(data) {   
      env.imageUrl = data.picture; 
      env.email = data.email;
      env.givenName = data.givenName;  
    },function(err) {  
      let toast = env.toastCtrl.create({
        message: 'Error al cargar Informacion de usuario',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();     
    });
    this.loadButtons()  
  }
  
  ionViewDidLoad() {
    let env = this;  
    this.oneSignal.startInit('23154f20-404c-4127-ad54-7622ef56481f', '528719470511');
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification); 
    this.oneSignal.handleNotificationReceived().subscribe((data) => {
      env.nativeStorage.getItem('badge').then((data)=>{
        env.nativeStorage.setItem('badge',(data)+1 ).then((datares)=>{
          //alert(datares);
          let activePage = env.navCtrl.isActive(env.viewCtrl);  
          if(activePage) {
            env.navCtrl.setRoot('MenuCunPage');
          }                   
        })
      },()=> {
        env.nativeStorage.setItem('badge',1).then(() => {
          let activePage = env.navCtrl.isActive(env.viewCtrl);  
          if(activePage) {
            env.navCtrl.setRoot('MenuCunPage');
          }                                                                       
        }) 
      })     
    })
    this.oneSignal.endInit();
  }
 
  ionViewDidLeave() {
    this.currentButtons = [];
  }

  setStudentData(email) {
    let env = this;
    env.nativeStorage.getItem('student').then(res=> {
      console.log('student already exists');
    }).catch(err => {
      env.cunMovilAPI.getUserByEmail(email).subscribe(userRes => {
        env.nativeStorage.setItem('student',{ccid:userRes[0].NUM_IDENTIFICACION})
      },err => {
        let toast = env.toastCtrl.create({
          message: 'No hay conexión al Servidor, intenta mas tarde ',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      })
    })    
  };     

  loadButtons() {
    let env = this;
    env.currentButtons = [];
    this.nativeStorage.getItem('user')
    .then(function(data) { 
      let email = data.email.split('@')[1];
      let emailAdmin = data.email.includes('_');
      if (email !== 'cun.edu.co' || emailAdmin == true) {
        env.currentButtons = env.buttons.query('nocun');
      } else {
        env.setStudentData(data.email)
        env.currentButtons = env.buttons.query();
      }
      
    },function(err) {                
      env.currentButtons = env.buttons.query('nocun');
      console.log(env.currentButtons)
    }) 
  }  

  openPage(page) {
    if (page == 'CunVirtualPage') {
      this.openCunVirtual();
    } else if (page == 'ZohoPage') {
      this.openZohoEs();
    } else if (page =='EmpleoPage') {
      this.openEmpleo();
    } else {
      this.navCtrl.push(page);
    }   
  }

  openEmpleo() {
    this.inAppBrowser.create("http://www.elempleo.com/sitios-empresariales/Colombia/cun/","_blank",)
  }

  openZohoEs() {
    this.inAppBrowser.create("https://desk.zoho.com/portal/cunportal","_blank",)
  }

  openCunVirtual() {
    let iosSchemaName ='instagram://';
    let androidPackageName =  'com.moodle.moodlemobile.cun';
    let appUrl = 'moodle://profile/';
    let httpUrl = 'https://play.google.com/store/apps/details?id=com.moodle.moodlemobile.cun';     
    let app:string;  
    if (this.device.platform === 'iOS') {
      app = iosSchemaName;
    } else if (this.device.platform === 'Android') {
      app = androidPackageName;
    } else {
      let browser = new InAppBrowser();
      browser.create(httpUrl , '_system');
      return;
    }         
    this.AppAvailability.check(app).then(
      () => { // success callback
        console.log("yes")
        let browser = new InAppBrowser();
        browser.create(httpUrl , '_system')
      },
      () => { // error callback
        console.log("no")
        let browser = new InAppBrowser();
        browser.create(httpUrl, '_system')
      }
    );    
  }

  directorioPush() {
    this.navCtrl.push('AgendaPage');
  }

  sedesPush() {
    this.navCtrl.push('UbicacionPage');
  }

  noticiasPush() {
    this.navCtrl.push('NoticiasPage');
  }

  notificaciones() {
    this.nativeStorage.remove('badge').then(() => {
      console.log('Elemento eliminado');
      let NotificacionPush = this.modalCtrl.create('NotificacionmodalPage', {  });
      NotificacionPush.onDidDismiss(data => {
        this.navCtrl.setRoot('MenuCunPage');
      });
      NotificacionPush.present();      
    })
  };

  logOut(){
    this.afAuth.auth.signOut();
    this.navCtrl.setRoot("LoginPage");
    if (this.platform.is('cordova')) {
      this.googlePlus.logout()
    } else {}
  }

  signOut() {      
    this.nativeStorage.clear().then(()=>{
      this.afAuth.auth.signOut();     
      this.googlePlus.logout()  
      this.navCtrl.popToRoot();
      this.navCtrl.setRoot('WelcomePage');
    }) 
  }
}