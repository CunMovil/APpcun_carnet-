import { CunapiProvider } from './../../providers/cunapi/cunapi';
import { NativeStorage } from '@ionic-native/native-storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { HorarioProvider } from '../../providers';
import { HorarioModel } from '../../models/horarioModel';
import {horarioModal} from '../';


@IonicPage()
@Component({
  selector: 'page-horario',
  templateUrl: 'horario.html',
  
})

export class HorarioPage {
  currentDay: HorarioModel[];
  virtual:boolean;
  ccid:string;
  constructor ( public navCtrl: NavController, 
                public navParams: NavParams,
                public horario:HorarioProvider,
                public modalCtrl: ModalController,
                private nativeStorage: NativeStorage,
                private cunMovilAPI : CunapiProvider
              ) {
    this.currentDay = this.horario.query();
    this.virtual=true;  
  }

  ionViewDidLoad() {       
    this.nativeStorage.getItem('student').then(studentRes=>{
      this.ccid = studentRes.ccid;
    })
  }

  showModal(day) {
    let materiasInfo;
    this.cunMovilAPI.getSchedule(this.ccid,day).subscribe(horarioRes=>{      
      materiasInfo = horarioRes
      const modal = this.modalCtrl.create(horarioModal,{materias:materiasInfo});
      modal.present();
    })   
  }

  showModalVirtual() {
    let materiasInfo;
     this.cunMovilAPI.getVirtualSchedule(this.ccid).subscribe(horarioRes=> {       
       materiasInfo = horarioRes
       const modal = this.modalCtrl.create(horarioModal,{materiasVirtuales:materiasInfo});
       modal.present();
     })     
  }

  goHome() {
    this.navCtrl.setRoot('MenuCunPage')
  }
}