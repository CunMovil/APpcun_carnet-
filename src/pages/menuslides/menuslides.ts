import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, MenuController, ToastController, ViewController, LoadingController} from 'ionic-angular';
import { BotonesMenu } from '../../providers';
import { Item } from '../../models/item';
import { AppAvailability } from '@ionic-native/app-availability';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Device } from '@ionic-native/device';

import { CunapiProvider } from './../../providers';
import { NativeStorage } from '@ionic-native/native-storage';
//login
import { GooglePlus } from '@ionic-native/google-plus';
import {Platform} from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
//notificaciones
import {PushnotificationProvider} from '../../providers/pushnotification/pushnotification';
import { OneSignal } from '@ionic-native/onesignal';

import { Network } from '@ionic-native/network';
import { Subscription } from 'rxjs';
import { StreamingMedia, StreamingAudioOptions } from '@ionic-native/streaming-media';
import { WordpressProvider } from '../../providers/wordpress/wordpress';

/**
 * Generated class for the MenuslidesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menuslides',
  templateUrl: 'menuslides.html',
})
export class MenuslidesPage {

  itemsButtons: Item[];
  serviceButtons: Item[];
  infoButtons: Item[];

  givenName: string ;
  email: string;
  imageUrl:string; 
  Notificaciones;
 network:boolean;
  public contador:boolean = true;

  typeNet:any;
  disconected:Subscription;
  conected:Subscription;

  constructor ( public navCtrl: NavController,
                public navParams: NavParams,
                public buttons:BotonesMenu,
                public AppAvailability:AppAvailability,
                public InAppBrowser: InAppBrowser,
                private device: Device,
                private googlePlus: GooglePlus,
                private afAuth: AngularFireAuth,
                private platform : Platform,                     
                private nativeStorage: NativeStorage,
                private cunMovilAPI : CunapiProvider,
                public  modalCtrl: ModalController,
                private toastCtrl: ToastController,
                public oneSignal :OneSignal,
                public notificationProvider:PushnotificationProvider,
                public viewCtrl: ViewController,
                public loadingCtrl :LoadingController,
                private Network: Network,
                private streaming:StreamingMedia,
                private ws: WordpressProvider
  ){

    this.ws.getRecentPosts(1).subscribe(()=>{
      this.network = true;
      this.nativeStorage.setItem('network',true);

    },err => {
      this.network = false;
      this.nativeStorage.setItem('network',false)
    })
    
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
        duration: 2000,
        position: 'bottom'
      });
      toast.present();     
    });       
  }

  ionViewDidEnter(){        
    this.conected = this.Network.onConnect().subscribe(data =>{
      this.displayNetworUpdate(data.type);
    },error => console.error(error));
    
    this.disconected = this.Network.onDisconnect().subscribe((data) => {  
      this.displayNetwor(data.type)
    },error => console.error(error));
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
            env.navCtrl.setRoot('MenuslidesPage');
          }                   
        })
      },()=> {
        env.nativeStorage.setItem('badge',1).then(() => {
          let activePage = env.navCtrl.isActive(env.viewCtrl);  
          if(activePage) {
            env.navCtrl.setRoot('MenuslidesPage');
          }                                                                       
        }) 
      })     
    })
    this.oneSignal.endInit();
  }

  displayNetworUpdate(connectionState:string){
   
   this.network = true;
     this.nativeStorage.setItem('network',true);
    let netwok = this.Network.type;
    this.toastCtrl.create({
      message:'Estas conectado',
      duration:3000 
    }).present();
  }

  displayNetwor(connectionState:string){
   
     this.network = false
     this.nativeStorage.setItem('network',false)
    let netwok = this.Network.type;
    this.toastCtrl.create({
      message:'No tienes acceso a una red',
      duration:3000 
    }).present();
    this.navCtrl.push(MenuslidesPage); 
  }

  ionViewWillLeave(){
   this.disconected.unsubscribe();
   this.conected.unsubscribe();
  }
  setStudentData(email) {
    let env = this;
    env.nativeStorage.getItem('student').then(res=> {
      console.log('student already exists');
    }).catch(err => {
      env.cunMovilAPI.getUserByEmail(email).subscribe(userRes => {
        env.nativeStorage.setItem('student',{ccid:userRes[0].NUM_IDENTIFICACION})
      },err => {
        
      })
    })    
  };

  logOut(){
    this.afAuth.auth.signOut();
    this.navCtrl.setRoot("LoginPage");
    if (this.platform.is('cordova')) {
      this.googlePlus.logout()
      this.nativeStorage.remove('user');
      this.nativeStorage.clear();
    } else {}
  }

  signOut() { 
    
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: ` <div class="loader">Espera Cerrando Sesión</div> `,
      duration: 4000
    });
    loading.present();

    this.nativeStorage.clear().then(()=>{
      this.afAuth.auth.signOut();     
      this.googlePlus.logout() 
      this.nativeStorage.remove('user');
      this.nativeStorage.clear()
      this.navCtrl.popToRoot();  
      this.navCtrl.setRoot('WelcomePage');
      loading.dismiss();
    })      
  }


  openPage(page) {  
    this.navCtrl.push(page);   
  }

  openCunVirtual() {
    let iosSchemaName ='moodle://';
    let androidPackageName =  'com.moodle.moodlemobile.cun';
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
  
  empleo() {
    this.InAppBrowser.create("http://www.elempleo.com/sitios-empresariales/Colombia/cun/","_blank", 'location=no');   
  }
  
  tuCuentas() {   
    this.InAppBrowser.create("https://goo.gl/forms/L6ANNaG4I9e5PrL52","_blank", 'location=no');
  }

  opennotas() {
    this.disconected = this.Network.onDisconnect().subscribe(() => {  
      this.typeNet = this.Network.type;
      if(this.typeNet === 'none' || this.typeNet === 'unknown'){
        this.navCtrl.push(MenuslidesPage);   
      }else{
        this.InAppBrowser.create("http://sigwt.cun.edu.co:8080/sinugwt/","_blank",'location=no')
      }
    })
  }
  
  notificaciones() {
    this.nativeStorage.remove('badge').then(() => {
      console.log('Elemento eliminado');
      let NotificacionPush = this.modalCtrl.create('NotificacionmodalPage', {  });
      NotificacionPush.onDidDismiss(data => {
        this.navCtrl.setRoot('MenuslidesPage');
      });
      NotificacionPush.present();      
    })
  };

  openMedia(){
    let options: StreamingAudioOptions = {
      successCallback: () => { console.log('Video played') },
      errorCallback: () => { alert('Error streaming') },
      initFullscreen: false,
      bgColor:'#003138',
      bgImage:"https://firebasestorage.googleapis.com/v0/b/prueba-login-859eb.appspot.com/o/cunmedia.png?alt=media&token=7a643624-9ba9-46a7-a86b-c49deba80d3a"
      
    }
      this.streaming.playAudio('http://stream.miradio.in:8553/stream?type=.mp3',options);
  }
}
