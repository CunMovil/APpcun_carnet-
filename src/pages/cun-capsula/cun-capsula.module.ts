import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CunCapsulaPage } from './cun-capsula';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CunCapsulaPage,
  ],
  imports: [
    IonicPageModule.forChild(CunCapsulaPage),
    TranslateModule.forChild()
  ],
})
export class CunCapsulaPageModule {}
