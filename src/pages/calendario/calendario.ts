import { CalendarioProvider } from './../../providers';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import {  DayConfig,CalendarComponentOptions } from "ion2-calendar";

/**
 * Generated class for the CalendarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calendario',
  templateUrl: 'calendario.html',
})
export class CalendarioPage {

  dateMulti: string[];
  type: 'string'; 
   _daysConfig: DayConfig[] = [];   
  optionsMulti: CalendarComponentOptions;   
  datearr =[];
  color:any; 
  configDays:any;
  eventos =[];
  dataMes=[];
 
  currentDate:Date = new Date();
  areas=[];
  public calendarData:object[]=[];  

  constructor (
                public navCtrl: NavController,
                private calendarioProvider:CalendarioProvider ,
                private loadingCtrl: LoadingController,
                private toastCtrl:ToastController,
              ) {  
    let loading = this.loadingCtrl.create ({
      spinner: 'hide',
      content: ''
    });
    loading.present();
    var env = this; 
    var getData = this.calendarioProvider.getcalendar().subscribe((res)=> {
      var resultArray = Object.keys(res).map(function(calendarEvents) {
        env.calendarData.push(res[calendarEvents])
        // env.createMarker(res[calendarEvents])       
      });      
      console.log("prueba")

      this.optionsMulti = {
                            pickMode: 'single',
                            color: 'secondary',
                            monthPickerFormat:	['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'],
                            weekdays:['D', 'L', 'M', 'MI', 'J', 'V', 'S'],
                            weekStart:1,
                            daysConfig:this._daysConfig,
                          };
      this.dataMesFn(null,this.currentDate);
      this.calendarData.forEach(element => {
        this.createMarker(element) 
      })
      loading.dismiss();  
    }, err => {
      loading.dismiss(); 
      let toast = this.toastCtrl.create({
        message: 'Revisa tu conexión',
        duration: 3000,
      })
      toast.present();
    });
  }

  /**
    * Se realiza comparacion de fecha mes y año para ser mapeadas en el calendario, y se declaran las clases css que va tener cada area estipulada en el calendario
    * @method createMarker
    * @param data // trae el json de firebase 
    * @param setClass 
  */

  createMarker(data,setClass?) {
    let arrayMarker= {cssClass:'',date:new Date(),subTitle:''}

    switch (data.area) {
      case 'Brigadas':
        arrayMarker.cssClass = 'oa'
        arrayMarker.subTitle = 'BR'
        break;
     case 'capital Social':
        arrayMarker.cssClass = 'op'
        arrayMarker.subTitle  = 'CS'
        break;
      case 'Bienestar':
        arrayMarker.cssClass = 'cc'
        arrayMarker.subTitle  = 'BI'
        break;
      case 'Orientación académica':
        arrayMarker.cssClass = 'aa'
        arrayMarker.subTitle  = 'OA'
        break;
      default:
        break;
    }
    if(setClass !== undefined){
      this.dataMes[setClass].cssClass = arrayMarker.cssClass
    }
    let fecha = data.fecha.split('-')[0]+","+data.fecha.split('-')[1]+','+data.fecha.split('-')[2]
    arrayMarker.date  =new Date(fecha); 
   
    this._daysConfig.push(arrayMarker)    
  } 

  dataMesFn(target?,fecha?) {    
    console.log(this.calendarData)
    this.dataMes = [];
    this.areas = [];
    this._daysConfig;
    console.log(target);  
    
    if (target) {     
      this.calendarData.forEach(element => {
        let  split = element['fecha'].split('-')[0]+","+(element['fecha'].split('-')[1])+','+element['fecha'].split('-')[2]     
        let fecha  = new Date(split); 
        if (target.newMonth.months == fecha.toISOString().split('-')[1] && target.newMonth.years == fecha.toISOString().split('-')[0]) {
          this.dataMes.push(element);          
        }
      });
      this.dataMes.forEach((element,index)=>{
        this.createMarker(element,index)       
      })
    } else {
      this.calendarData.forEach(element => {
        let  split1 = element['fecha'].split('-')[0]+","+element['fecha'].split('-')[1]+','+element['fecha'].split('-')[2];
        let fecha1 = new Date(split1);   
        
        if (fecha.toISOString().split('-')[1] == fecha1.toISOString().split('-')[1]) {         
          this.dataMes.push(element);         
        }
        this.dataMes.forEach((element,index)=> {
          this.createMarker(element,index)              
        })        
      });     
    }
  }
}