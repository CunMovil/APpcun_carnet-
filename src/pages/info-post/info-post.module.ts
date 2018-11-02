import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfoPostPage } from './info-post';

@NgModule({
  declarations: [
    InfoPostPage,
  ],
  imports: [
    IonicPageModule.forChild(InfoPostPage),
  ],
})
export class InfoPostPageModule {}