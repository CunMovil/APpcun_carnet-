import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BibliotecaPage } from './biblioteca';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    BibliotecaPage,
  ],
  imports: [
    IonicPageModule.forChild(BibliotecaPage),
    TranslateModule.forChild()
  ],
})
export class BibliotecaPageModule {}
