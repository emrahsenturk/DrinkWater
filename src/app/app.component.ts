import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateService,
    private storage: Storage
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.initTranslate();
    });
  }

  private initTranslate() {
    this.storage.get('language').then((val) => {
      if(val == null){
        this.setTranslate('en');
        if (this.translate.getBrowserLang() !== undefined) {
          this.setTranslate(this.translate.getBrowserLang());
        }
      }else{
        this.setTranslate(val);
      }
    });
    
  }

  private setTranslate(language){
    this.translate.setDefaultLang(language);
    moment.locale(language);
    this.storage.set('language', language);
  }
}
