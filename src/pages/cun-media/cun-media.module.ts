import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CunMediaPage } from './cun-media';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CunMediaPage,
  ],
  imports: [
    IonicPageModule.forChild(CunMediaPage),
    TranslateModule.forChild()
  ],
})
export class CunMediaPageModule {}
