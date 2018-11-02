import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MispagosPage } from './mispagos';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    MispagosPage,
  ],
  imports: [
    IonicPageModule.forChild(MispagosPage),
    TranslateModule.forChild()
  ],
})
export class MispagosPageModule {}