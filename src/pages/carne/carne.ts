import { CunapiProvider } from './../../providers/cunapi/cunapi';
import { NativeStorage } from '@ionic-native/native-storage';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, PopoverController, LoadingController } from 'ionic-angular';
import QRCode from 'qrcode';
import { Slides } from 'ionic-angular';
import { poliza } from '../index';
import { EmailComposer } from '@ionic-native/email-composer';
import { LottieAnimationViewModule } from 'lottie-angular2';   

@IonicPage()
@Component({
  selector: 'page-carne',
  templateUrl: 'carne.html',
})
export class CarnePage {
  
  alertCtrl: any;
  @ViewChild(Slides) slides: Slides;
  stateAnim:boolean = false;
  imgUrl:string;
  generated = ''; 

  qrdata =
    {
      nombres:'',
      apellidos:'',
      numeroDocumento:  "",
      programa:"",
      mensaje:"",
      estado:'',
      correo:''
    };

    public lottieConfig: Object;
    private anim: any;
    private animationSpeed: number = 0;
  
  displayQrCode() {
    return this.generated !== '';
  }

  constructor ( public navCtrl: NavController,
                public navParams: NavParams,
                private nativeStorage: NativeStorage,
                private cunMovilAPI : CunapiProvider,
                private toastCtrl : ToastController,
                public  alerC: AlertController,
                public loadingCtrl :LoadingController,
                public popoverCtrl: PopoverController
                
              ) {        
 
                this.lottieConfig = {
                  path: 'assets/img/swipe-left.json',
                  autoplay: true,
                  loop: true
              };
  }

  handleAnimation(anim: any) {
    this.anim = anim;
    console.log(anim);
    this.anim.stop();
  }

 

  stop() {
    this.anim.stop();
  }

  setSpeed(speed: number) {
    this.animationSpeed = speed;
    this.anim.setSpeed(speed);
}

  ionViewDidEnter(){

    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: ` <div class="loader">Espera...</div> `
    });
    loading.present();

    this.nativeStorage.getItem('user').then(userRes =>{
      this.imgUrl = userRes.picture;   

      this.cunMovilAPI.getUserlicence(userRes.email).subscribe(res=>{      
                   
        loading.dismiss();

        if(res['mensaje']){
          this.slides.lockSwipes(true);
          this.slides.freeMode = false;
          this.toastCtrl.create({
            message:res['mensaje'],
            position:'bottom',
            duration:3000
          }).present();
          
        }else{

          this.qrdata.nombres = res['nombres'];
          this.qrdata.apellidos = res['apellidos'];
          this.qrdata.numeroDocumento = res['numeroDocumento'];
          this.qrdata.programa = res['programa'];
          this.qrdata.estado = res['texto1'];
          this.qrdata.correo = res['texto2']

          this.QRgenerator(this.qrdata)
        }
      },err =>{
        loading.dismiss()
        this.slides.lockSwipes(true);
        this.slides.freeMode = false;
        this.toastCtrl.create({
          message:'Conéctate a una red para obtener tus datos.',
          position:'bottom',
          duration:3000
        }).present();
      })

    }, err =>{
      loading.dismiss();
      this.toastCtrl.create({
        message:'Intenta mas tarde',
        position:'bottom',
        duration:3000
      }).present()
    })
  
  }


  QRgenerator(studenRes) {
    const qrcode = QRCode;
    const self = this;
    let res ="Nombres: "+ studenRes.nombres + " Apellidos :"+ studenRes.apellidos + ", Identificacion: "+studenRes.numeroDocumento + " ,\n Programa: "+studenRes.programa + ",\n Estado: "+studenRes.estado  + ",\n Correo: "+studenRes.correo;
    qrcode.toDataURL(res.toString(), { errorCorrectionLevel: 'H' }, function (err, url) {
      self.generated = url;
    })
  }

  process() {
    const qrcode = QRCode;
    const self = this;
    let res ="Nombre: "+ this.qrdata[0].primerNombre + this.qrdata[0].segundoNombre +"\n Apellido:"+ + this.qrdata[0].primerApellido+this.qrdata[0].segundoApellido+
    ", Identificacion: "+this.qrdata[0].cc + " ,\n Programa: "+this.qrdata[0].carrera + ",\n Sede: "+this.qrdata[0].sede + ",\n RH: "+this.qrdata[0].rh
    qrcode.toDataURL(res.toString(), { errorCorrectionLevel: 'H' }, function (err, url) {
      self.generated = url;
    })
  }
  ///commit1
  

  goHome(){
    this.navCtrl.setRoot('MenuCunPage')
  };

  dataReturn(){
    let email = ""
    this.cunMovilAPI.getUserlicence(email).subscribe(res=>{
      console.log(res)

    })
  }


  fnTest(){
   if (this.stateAnim == false) {
     this.stateAnim = true
     this.stop();
   } else {
    this.stateAnim = false;
    this.anim();
   }
  }
}


