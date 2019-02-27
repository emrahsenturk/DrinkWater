import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateService
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
     this.translate.setDefaultLang('en');
     moment.locale('en');

     if (this.translate.getBrowserLang() !== undefined) {
         this.translate.use(this.translate.getBrowserLang());
         moment.locale(this.translate.getBrowserLang());
     } else {
         this.translate.use('en');
         moment.locale('en');
     }
  }
}
