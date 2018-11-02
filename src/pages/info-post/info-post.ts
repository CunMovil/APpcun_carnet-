import { WordpressProvider } from './../../providers/wordpress/wordpress';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-info-post',
  templateUrl: 'info-post.html',
})
export class InfoPostPage {

  private mediaId;
  public imgPost;
  public comments;
  public imgLink
  public post;

  constructor (
                public navCtrl: NavController,
                public navParams: NavParams,
                private loadingCtrl:LoadingController,
                private wpProvider:WordpressProvider) {
    this.post = this.navParams.get("item");
  }

  ionViewWillEnter() { 
    let loading = this.loadingCtrl.create();  
    loading.present();   
    this.mediaId = this.post.featured_media;
    Observable.forkJoin(
      this.getImage(this.mediaId),
      this.getComments(this.post.id)
    )
    .subscribe(data => {
      this.imgPost = data[0];
      this.imgLink =this.imgPost.media_details.sizes.medium.source_url;        
      this.comments = data[1];
      loading.dismiss();
    });
  }

  getImage(mediaId){
      return this.wpProvider.getImage(mediaId)
  }
  
  getComments(idPost){
    return this.wpProvider.getComments(idPost)
  }
}