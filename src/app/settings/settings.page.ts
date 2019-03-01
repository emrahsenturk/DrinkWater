import { Component } from '@angular/core';
import { IonSelect, ToastController, AlertController, NavController  } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Device } from '@ionic-native/device/ngx';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';
import { DailyAmount } from '../objects/dailyAmount';
import * as moment from 'moment';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage {

  amountOfWaterDaily: number;
  dbList: any;
  languages = [
    {Value: "tr", Text: "Türkçe"},
    {Value: "en", Text: "English"}
  ];
  selectedLanguage: string;

  constructor(
    public navController: NavController,
    public toastController: ToastController,
    public db: AngularFirestore,
    public device: Device,
    public alertController: AlertController,
    public translate: TranslateService,
    private dailyAmount: DailyAmount
  ) {
    this.selectedLanguage = translate.getDefaultLang();
    this.getDailyAmount();
  }

  getDailyAmount(){
    this.dbList = this.db.doc<DailyAmount>('DailyAmounts/' + this.device.uuid).valueChanges();
  }

  async openAmountPrompt() {
    const alert = await this.alertController.create({
      header: this.translate.instant('settings.amountOfWaterPromptHeader'),
      inputs: [
        {
          name: 'amountOfWaterDaily',
          type: 'number',
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
            this.amountOfWaterDaily = data.amountOfWaterDaily;
            this.saveDailyAmount(data.amountOfWaterDaily);
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

    this.dbList = this.db.doc<DailyAmount>('DailyAmounts/' + this.device.uuid);
    this.dbList.set(this.dailyAmount);
    this.showSuccessToast(this.translate.instant('global.saveMessage'));
    this.getDailyAmount();
  }

  changeLanguage(){
    this.translate.use(this.selectedLanguage);
    moment.locale(this.selectedLanguage);
  }

  async showSuccessToast(message:string){
    const toast = await this.toastController.create({
      message: message,
      showCloseButton: true,
      position: 'top',
      closeButtonText: this.translate.instant('global.close'),
      duration: 3000,
      animated: true,
      color: "primary"
    });
    toast.present();
  }

}