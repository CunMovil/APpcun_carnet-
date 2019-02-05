import { AngularFireAuth } from 'angularfire2/auth';
import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform, MenuController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { FirstRunPage,MenuCun } from '../pages';
import { Settings } from '../providers';
import { NativeStorage } from '@ionic-native/native-storage';
import { timer } from 'rxjs/observable/timer';
import { PushnotificationProvider } from '../providers/pushnotification/pushnotification';


@Component({
  template:  
  `
  <div *ngIf="showSplash" class="splash">
      <div class="spinner">
        <div class="view">
          <div class="plane main">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
          </div>
        </div>   
      </div>
    </div> 

  <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage;  
  userData;
  imageUrl;
  givenName;
  email;
  @ViewChild(Nav) nav: Nav;
  
  pages: any[] = [
                    { title: 'Tutorial', component: 'TutorialPage' },
                    { title: 'Welcome', component: 'WelcomePage' },
                    { title: 'Content', component: 'ContentPage' },
                    { title: 'Login', component: 'LoginPage' },
                    { title: 'Signup', component: 'SignupPage' },
                    { title: 'Menu', component: 'MenuPage' },
                    { title: 'Settings', component: 'SettingsPage' },
                    { title: 'MenuCun', component: 'MenuCunPage' }
  ];
  showSplash = true;
  constructor (
                private translate: TranslateService,
                public  platform: Platform,
                        settings: Settings,
                private googlePlus: GooglePlus,
                private config: Config,
                private statusBar: StatusBar,
                public  menuCtrl:MenuController,
                private splashScreen: SplashScreen,
                private nativeStorage: NativeStorage,
                private afAuth: AngularFireAuth,
                public  PushNotification:PushnotificationProvider
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.backgroundColorByName("transaparent");    
    
      ///googlePlus check logged in.
      let env = this;
      this.nativeStorage.getItem('user')
      .then(function(data){ 
        env.userData = data;   
        env.imageUrl = data.picture; 
        env.email = data.email;
        env.givenName = data.givenName;   
        env.rootPage = MenuCun;
        env.splashScreen.hide();       
        env.openPage('MenuCunPage');
        //env.PushNotification.initNotification();
        env.PushNotification.getNotifications();
        env.showSplash = false;
        if(!data.email){
          timer(4000).subscribe(() => env.showSplash = false)
        }else{
          timer(3000).subscribe(()=>env.showSplash = false);
        }    

      },function(err){
        env.rootPage = FirstRunPage;
        env.splashScreen.hide();
        timer(4000).subscribe(()=>env.showSplash = false);    
      })
    });    
    this.initTranslate();
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('es');
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      if (browserLang === 'zh') {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use('zh-cmn-Hans');
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use('zh-cmn-Hant');
        }
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    } else {
      this.translate.use('es'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}


