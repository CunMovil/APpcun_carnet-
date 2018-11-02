import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarnePage } from './carne';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CarnePage,
  ],
  imports: [
    IonicPageModule.forChild(CarnePage),
    TranslateModule.forChild()
  ],
})
export class CarnePageModule {}
