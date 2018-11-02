import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-cun-media',
  templateUrl: 'cun-media.html',
})
export class CunMediaPage {

  url:string;
  volume:any;
  promise:any;
  prueba:any;
  audio:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {
    this.audio = new Audio();
    this.audio.src = 'http://stream.miradio.in:8553/stream?type=.mp3';
    this.audio.crossOrigin='anonymous';
    this.canvasRadio(this.audio);
  }

  play() {  
    this.audio.play();    
    this.prueba = true; 
    this.volume = true;
  };
  
  pause() {
    this.audio.pause();
    this.volume = false;
    this.prueba = false; 
  };

  mute() {
    this.audio.muted = true ;
    this.volume = false;
  }

  Unmute() {
    this.audio.muted = false ;
    this.volume = true;
  }

  canvasRadio(audio) { 
    var canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height,grd;
    initMp3Player();

    function initMp3Player() {        
      context = new AudioContext();
      analyser = context.createAnalyser();
      canvas = document.getElementById('analyzer');
      ctx = canvas.getContext('2d');        
      source = context.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(context.destination);
      frameLooper();

      function frameLooper() {
        window.requestAnimationFrame(frameLooper);
        fbc_array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(fbc_array);
        ctx.clearRect(0,0,canvas.width,canvas.height);
        grd = ctx.createLinearGradient(10, 20, 10, 100);
        grd.addColorStop(0, "LawnGreen ");
        grd.addColorStop(1, "#003138");
        ctx.fillStyle = grd;
        bars = 200;
        for (var i = 0; i < bars; i++) {
            bar_x = i*5;
            bar_width = 2;
            bar_height = -(fbc_array[i] / 2);
            ctx.fillRect(bar_x,canvas.height, bar_width, bar_height)               
        }
      }
    }
  }

  goHome() {
    this.navCtrl.setRoot('MenuCunPage')
  }
}