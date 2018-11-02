import { NativeStorage } from '@ionic-native/native-storage';
import { Component } from '@angular/core';
import {  IonicPage, NavParams, ViewController, LoadingController, ToastController  } from 'ionic-angular';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import {ApiVimeoProvider} from '../../../providers'


@IonicPage()
@Component({
  selector: 'page-modal-comments',
  templateUrl: 'modal-comments.html',
})
export class ModalCommentsPage {   
  comments:any;
  commentsArr:object[];
  names:string[]=[];
  userComment:string[] = [];
  fatherPage:any;
  public formulario : FormGroup;
  private videoId;
  

  constructor ( private params: NavParams,
                private view :ViewController,
                private formBuilder: FormBuilder,
                private apiVimeo: ApiVimeoProvider,
                private loading:LoadingController,
                private toastCtrl:ToastController,
                private nativeStorage: NativeStorage) {
    do {
      this.getVideos(); 
    } while (this.comments.data);               
  }

  getVideos() {
    this.names = [];
    this.userComment = [];
    this.commentsArr = [];
    var loader = this.loading.create({
      spinner: 'hide',
      content: ` <div class="loader">Cargando Comentarios...</div> `
    });
    loader.present();    
    this.fatherPage = this.params.get('videoInfo');    
    this.videoId = this.fatherPage.uri.split('/')[2];    
    this.comments = this.apiVimeo.getComments(this.fatherPage.uri)
    .subscribe(comments => {
      this.comments =  comments;
      this.comments.data.forEach(element => {
        this.names.push(element.text.split(':')[1])
        this.userComment.push(element.text.split(':')[3])
      });
      for (let index = 0; index < this.names.length; index++) {
        let obj = {nombre:this.names[index],comentario:this.userComment[index]}
        this.commentsArr.push(obj);
      }       
      loader.dismiss();     
    },error => {
      alert(<any>error.message);
      console.log("GetCommentsError: " + error.message);
    })   
    this.formulario = this.formBuilder
    .group({
      text: ['', Validators.required]
    });     
  }

  closeModal() {   
    this.view.dismiss();
  }

  addComment() {    
    var loaderCommentAdd = this.loading.create({
      spinner: 'hide',
      content: ` <div class="loader">Posteando...</div> `
    });      
    loaderCommentAdd.present().then(()=> {
      var userName;
      this.nativeStorage.getItem('user').then((userInfo)=> {
        userName = userInfo.givenName;      
        this.apiVimeo.postComment(this.videoId,this.formulario.value.text,userName).subscribe(response => {
          if(response) {
            this.presentToast();
            this.getVideos();     
          }
        },
        error => {
            alert(<any>error.message);
            console.log("addCommentPOSTError: " + error.message);
        })
        loaderCommentAdd.dismiss();
      });
    });
  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.getVideos()
      refresher.complete();
    }, 2000);
  }

   presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Tu comentario ha sido posteado exitosamente, Gracias.',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}
