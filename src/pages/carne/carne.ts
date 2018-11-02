import { CunapiProvider } from './../../providers/cunapi/cunapi';
import { NativeStorage } from '@ionic-native/native-storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import QRCode from 'qrcode';

@IonicPage()
@Component({
  selector: 'page-carne',
  templateUrl: 'carne.html',
})
export class CarnePage {
  
  imgUrl:string;
  generated = '';
  qrdata =[
    {
      primerNombre:'',
      segundoNombre:'',
      primerApellido:'',
      segundoApellido:'',
      cc:  "",
      carrera:"",
      sede: "",
      rh: ""
    }];
  
  displayQrCode() {
    return this.generated !== '';
  }

  constructor (  public navCtrl: NavController,
                public navParams: NavParams,
                private nativeStorage: NativeStorage,
                private cunMovilAPI : CunapiProvider,
                private toastCtrl : ToastController) {              
    
  }

  ionViewWillEnter() {
    this.nativeStorage.getItem('user').then(userRes=> this.imgUrl = userRes.picture )    
    this.nativeStorage.getItem('student').then(studentData => {
      this.nativeStorage.getItem('carne').then(carneSaved=> {          
        this.QRgenerator(carneSaved)      
      },err =>{
        this.cunMovilAPI.getUserlicence(studentData.ccid).subscribe(studenRes=> {
          if(studenRes[0].IDENTIFICACION) {
            var carneObj = {
              NOM_TERCERO:studenRes[0].NOM_TERCERO,
              SEG_NOMBRE:studenRes[0].SEG_NOMBRE,
              PRI_APELLIDO:studenRes[0].PRI_APELLIDO,
              SEG_APELLIDO: studenRes[0].SEG_APELLIDO,
              IDENTIFICACION:studenRes[0].IDENTIFICACION,
              NOM_UNIDAD:studenRes[0].NOM_UNIDAD,
              NOM_SEDE:studenRes[0].NOM_SEDE,
              FRH_SANGUINEO: studenRes[0].FRH_SANGUINEO
            }    
            this.nativeStorage.setItem('carne',carneObj)    
            this.QRgenerator(studenRes[0])             
          }else{
            let toast = this.toastCtrl.create({
              message: 'No Tienes acceso a carnet ',
              duration: 3000,
              position: 'middle'
            });
            toast.present();
            toast.onDidDismiss(()=>{
              this.navCtrl.setRoot('MenuCunPage');
            })      
          }
        },err => {
          let toast = this.toastCtrl.create({
            // message: 'No Tienes acceso a carnet ('+err+ ')',
            message: 'No Tienes acceso a carnet',
            duration: 3000,
            position: 'middle'
          });
          toast.present();
          toast.onDidDismiss(()=>{
            this.navCtrl.setRoot('MenuCunPage');
          })
        })
      })      
    })  
  }

  QRgenerator(studenRes) {
    this.qrdata[0].primerNombre = studenRes.NOM_TERCERO;
    this.qrdata[0].segundoNombre = studenRes.SEG_NOMBRE;
    this.qrdata[0].primerApellido = studenRes.PRI_APELLIDO;
    this.qrdata[0].segundoApellido = studenRes.SEG_APELLIDO;
    this.qrdata[0].cc = studenRes.IDENTIFICACION;
    this.qrdata[0].carrera = studenRes.NOM_UNIDAD;
    this.qrdata[0].sede = studenRes.NOM_SEDE;
    this.qrdata[0].rh = studenRes.FRH_SANGUINEO;
    this.process();
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
  goHome(){
    this.navCtrl.setRoot('MenuCunPage')
  }
}
