import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PolizaPage } from './poliza';

@NgModule({
  declarations: [
    PolizaPage,
  ],
  imports: [
    IonicPageModule.forChild(PolizaPage),
  ],
})
export class PolizaPageModule {}
