import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuCunPage } from './menu-cun';

@NgModule({
  declarations: [
    MenuCunPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuCunPage),
  ],
  exports:[
    MenuCunPage
  ]
})
export class MenuCunPageModule {}