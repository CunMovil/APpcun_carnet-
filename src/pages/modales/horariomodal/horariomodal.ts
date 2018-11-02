import { Materia } from './../../notas/notas';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-horariomodal',
  templateUrl: 'horariomodal.html',
})
export class HorariomodalPage {
  
  public materias = [];
  public materiasVirtuales = [];
  constructor ( public navCtrl: NavController,
                public navParams: NavParams,
                public ViewCtrl:ViewController,
                public alertCtrl: AlertController,
                public inAppBrowser:InAppBrowser) {
    this.materias =  navParams.get('materias')
    this.materiasVirtuales = navParams.get('materiasVirtuales')
    console.log(this.materiasVirtuales)
  }

  ionViewDidLoad() {    
    if(this.materias) {
      let materias = this.materias;      
      if(materias.length == 0  ) {
        let alert = this.alertCtrl.create({
          title:"Estas Libre Hoy..",
          message:'parece que no tienes clases el dia de hoy.',
          buttons:[{
            text:'Ok',handler: () => {
              this.closemodal();
            }
          }]
        })
        alert.present();
      }
    }
    if(this.materiasVirtuales) {
      let materiasVirtuales = this.materiasVirtuales
      if(materiasVirtuales.length == 0  ) {
        let alert = this.alertCtrl.create({
          title:"Estas Libre Hoy..",
          message:'parece que no tienes clases el dia de hoy.',
          buttons:[{
            text:'Ok'
          }]
        })
        alert.present();
      }
    }  
  }

  closemodal() {
    this.ViewCtrl.dismiss();
  }

  showAlert(materia) {
    const alert = this.alertCtrl.create({      
      title: 'Calculo Multivariado',
      subTitle: '<b>Fecha inicio:</b> '+materia.FEC_INICIO+' <br> \n  <b>Fecha final:</b> '+materia.FEC_FIN+'<br> \n <b>Nivel:</b> '+materia.NUM_NIVEL+'<br> \n <b>Créditos:</b> '+materia.CREDITOS+' <br>\n <b>Nom Unidad:</b> '+materia.NOM_UNIDAD+'<br> \n <b>Cod pensum:</b> '+materia.COD_PENSUM+'',
      cssClass: 'alertDetallesA',
      buttons: [
        {
          text: 'OK',
          cssClass: "bOk"
        },
      ],  
    });
    alert.present();
  }

  abrirMediacionVirtual() {
    this.inAppBrowser.create("http://virtual.cun.edu.co/virtual/","_blank",)
  }

  openUbicacion() {
    this.navCtrl.push('UbicacionPage');
  }  
}