import { Component } from '@angular/core';
import { AlertController, NavController  } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Device } from '@ionic-native/device/ngx';
import { TranslateService } from '@ngx-translate/core';
import { DailyAmount } from '../objects/dailyAmount';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';
import { ToastService } from '../crossCutting/toast/toast';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage {

  amountOfWaterDaily: number;
  dbList: any;
  languages = [
    { value: "tr", text: "Türkçe"},
    { value: "en", text: "English"}
  ];
  selectedLanguage: string;

  constructor(
    public navController: NavController,
    public db: AngularFirestore,
    public device: Device,
    public alertController: AlertController,
    public translate: TranslateService,
    public storage: Storage,
    private dailyAmount: DailyAmount,
    private toast: ToastService
  ) {
    this.initLanguage();
    this.initDailyAmount();
  }

  initLanguage(){
    this.storage.get('language').then((val) => {
      this.selectedLanguage = val;
    });
  }

  initDailyAmount(){
    this.storage.get('dailyAmount').then((val) => {
      this.amountOfWaterDaily = val;
    });
  }

  async openAmountPrompt() {
    const alert = await this.alertController.create({
      header: this.translate.instant('settings.amountOfWaterPromptHeader'),
      inputs: [
        {
          name: 'enteredAmount',
          type: 'tel',
          placeholder: this.translate.instant('settings.amountOfWater'),
          value: this.amountOfWaterDaily != null ? this.amountOfWaterDaily : ""
        }
      ],
      buttons: [
        {
          text: this.translate.instant('global.cancel'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            
          }
        }, {
          text: this.translate.instant('global.confirm'),
          handler: (data) => {
            if(data.enteredAmount == "" || this.amountOfWaterDaily == data.enteredAmount){
              alert.dismiss();
              return false;
            }
            this.saveDailyAmount(data.enteredAmount);
          }
        }
      ]
    });

    await alert.present();
  }

  saveDailyAmount(amount: number){
    this.dailyAmount = {
      Value: amount
    };

    this.storage.set('dailyAmount', amount);
    this.amountOfWaterDaily = amount;
    this.toast.showSuccessToast(this.translate.instant('global.saveMessage'));
  }

  changeLanguage(){
    this.translate.use(this.selectedLanguage);
    moment.locale(this.selectedLanguage);
    this.storage.set('language', this.selectedLanguage);
  }

}