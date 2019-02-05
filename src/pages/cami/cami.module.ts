import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CamiPage } from './cami';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CamiPage,
  ],
  imports: [
    IonicPageModule.forChild(CamiPage),
    TranslateModule.forChild()
  ],
})
export class CamiPageModule {}
