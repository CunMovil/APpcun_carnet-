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
import { Settings, User, Api, BotonesMenu, HorarioProvider,ApiVimeoProvider,DirectorioProvider } from '../providers';
import { MyApp } from './app.component';
import { StreamingMedia } from '@ionic-native/streaming-media';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { Device } from '@ionic-native/device';
import { AppAvailability } from '@ionic-native/app-availability';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { MediaCapture } from '@ionic-native/media-capture';
import { EmailComposer } from '@ionic-native/email-composer';
import { CallNumber } from '@ionic-native/call-number';
import {AgmCoreModule} from '@agm/core';
import { GoogleMaps } from '@ionic-native/google-maps';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {GooglePlus} from '@ionic-native/google-plus';
import { WordpressProvider } from '../providers/wordpress/wordpress';
import { SedesProvider } from '../providers/sedes/sedes';
import { NativeStorage } from '@ionic-native/native-storage';
import { CalendarioProvider } from '../providers/calendario/calendario';
import { CalendarModule } from "ion2-calendar";
import { CunapiProvider } from '../providers/cunapi/cunapi';
import { HTTP } from '@ionic-native/http';
import { OneSignal } from '@ionic-native/onesignal';
import { PushnotificationProvider } from '../providers/pushnotification/pushnotification';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FileOpener } from '@ionic-native/file-opener';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
export const firebaseConfig = {
  apiKey: "AIzaSyCOO7fC785WA_Z6lRzDynjrsSVHhF7AhyY",
  authDomain: "appcunhome.firebaseapp.com",
  databaseURL: "https://appcunhome.firebaseio.com",
  projectId: "appcunhome",
  storageBucket: "appcunhome.appspot.com",
  messagingSenderId: "537588800472"
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
    CalendarModule,
    HttpClientModule,
    
    AgmCoreModule.forRoot({apiKey:'AIzaSyA2Mr5jjkk_bsSNaL15TD4qurs7gwoaOHw'}),
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
    HorarioProvider,
    User,
    Camera,
    SplashScreen,
    StatusBar,
    StreamingMedia,
    ScreenOrientation,NativeStorage,
    Device,AppAvailability,InAppBrowser,
    MediaCapture,
    DocumentViewer,
    FileTransfer,
    FileOpener,
    File,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ApiVimeoProvider,
    EmailComposer,
    CallNumber,
    GoogleMaps,GooglePlus,
    DirectorioProvider,
    WordpressProvider,    
    SedesProvider,
    CalendarioProvider,
    CunapiProvider,
    OneSignal,
    PushnotificationProvider,
    LaunchNavigator
  ]
})
export class AppModule { }
