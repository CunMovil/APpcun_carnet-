import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StreamingMedia, StreamingAudioOptions } from '@ionic-native/streaming-media';



@IonicPage()
@Component({
  selector: 'page-cun-media',
  templateUrl: 'cun-media.html',
})
export class CunMediaPage {

  // url:string;
  // volume:any;
  // promise:any;
  prueba:any;
  // audio:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public streaming:StreamingMedia) {
    let options: StreamingAudioOptions = {
      successCallback: () => { console.log('Video played') },
      errorCallback: () => { console.log('Error streaming') },
      initFullscreen: false,
      bgColor:'#003138',
      bgImage:"https://firebasestorage.googleapis.com/v0/b/prueba-login-859eb.appspot.com/o/cunmedia.png?alt=media&token=7a643624-9ba9-46a7-a86b-c49deba80d3a"
      
    }
      this.streaming.playAudio('http://stream.miradio.in:8553/stream?type=.mp3',options);
   }

startAudio(){
  
}

stopAudio() {
  this.streaming.stopAudio();
}

  
ionViewWillLeave(){
 this.streaming.stopAudio();
}
  goHome() {
    this.navCtrl.setRoot('MenuslidesPage')
  }
}