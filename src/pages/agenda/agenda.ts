import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { DirectorioProvider } from '../../providers';
import { CallNumber } from '@ionic-native/call-number';
import { EmailComposer } from '@ionic-native/email-composer';


@IonicPage()
@Component({
  selector: 'page-agenda',
  templateUrl: 'agenda.html',
})
export class AgendaPage {

  directorio =[];

  constructor ( public navCtrl: NavController,
                public navParams: NavParams,
                public callNumber: CallNumber, 
                public emailComposer: EmailComposer,
                public directorioProvider:DirectorioProvider,
                private toastCtrl :ToastController) {
  this.directorio = directorioProvider.query()
  }

 callPhone(numero) {  
    this.callNumber.callNumber(numero, true)
    .then(() =>{
      let toast = this.toastCtrl.create({
        message: 'Abriendo telefono',
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
    })
    .catch(() => {
      let toast = this.toastCtrl.create({
        message: 'Error al abrir telefono',
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
    });
  }
  
  sendEmail(emailData) {
    console.log(emailData);
      let email = {
        to: emailData,
        cc: '',
        subject: 'Informacion al estudiante',
        body: 'Aqui puedes escribir tu inquietud...',
        isHtml: true        
      };   
      this.emailComposer.open(email);
    }
   
  goHome() {
    this.navCtrl.setRoot('MenuCunPage')
  }
}
