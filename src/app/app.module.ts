import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule, NavController } from 'ionic-angular';
import { Settings, User, Api, BotonesMenu, ApiVimeoProvider,DirectorioProvider } from '../providers';
import { MyApp } from './app.component';
import { StreamingMedia } from '@ionic-native/streaming-media';
import { ScreenOrientation} from '@ionic-native/screen-orientation';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { Device } from '@ionic-native/device';
import { AppAvailability } from '@ionic-native/app-availability';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { MediaCapture } from '@ionic-native/media-capture';
import { EmailComposer } from '@ionic-native/email-composer';
import { CallNumber } from '@ionic-native/call-number';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {GooglePlus} from '@ionic-native/google-plus';
import { WordpressProvider } from '../providers/wordpress/wordpress';
import { NativeStorage } from '@ionic-native/native-storage';
import { CunapiProvider } from '../providers/cunapi/cunapi';
import { HTTP } from '@ionic-native/http';
import { OneSignal } from '@ionic-native/onesignal';
import { PushnotificationProvider } from '../providers/pushnotification/pushnotification';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { LottieAnimationViewModule } from 'lottie-angular2'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Network } from '@ionic-native/network';


export const firebaseConfig = {
  apiKey: "AIzaSyDD2hUmbvTPsxTiliHaewh2ZQPI_dC9uUY",
  authDomain: "corporacionunificadan-1af16.firebaseapp.com",
  databaseURL: "https://corporacionunificadan-1af16.firebaseio.com",
  projectId: "corporacionunificadan-1af16",
  storageBucket: "corporacionunificadan-1af16.appspot.com",
  messagingSenderId: "846916511719"
}

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    option1: true,
    option2: 'Ionitron J. Framework',
    option3: '3',
    option4: 'Hello'
  });
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LottieAnimationViewModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig), 
    AngularFireAuthModule,
    NgxQRCodeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp,{
      menuType:'push',
      activator:'ripple',
      pageTransition:'wp-transition',
      platforms:{
        ios:{
          menuType:'push'
        }
        
      }
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    Api,
    HTTP,
    BotonesMenu,
    ApiVimeoProvider,
    User,
    Camera,
    SplashScreen,
    StatusBar,
    StreamingMedia,
    ScreenOrientation,NativeStorage,
    Device,AppAvailability,InAppBrowser,
    MediaCapture,
    Network,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ApiVimeoProvider,
    EmailComposer,
    CallNumber,
    GooglePlus,
    DirectorioProvider,
    WordpressProvider,    
    CunapiProvider,
    OneSignal,
    PushnotificationProvider,
    LaunchNavigator
  ]
})
export class AppModule { }
