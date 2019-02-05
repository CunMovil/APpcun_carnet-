import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarnePage } from './carne';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LottieAnimationViewModule } from 'lottie-angular2'; 

@NgModule({
  declarations: [
    CarnePage,
  ],
  imports: [
    IonicPageModule.forChild(CarnePage),
    TranslateModule.forChild(),
    LottieAnimationViewModule.forRoot( )
  ],
})
export class CarnePageModule {}
