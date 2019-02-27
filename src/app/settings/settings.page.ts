import { Component } from '@angular/core';
import { IonSelect, ToastController, AlertController, NavController  } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Device } from '@ionic-native/device/ngx';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage {

  constructor(
    public navController: NavController,
    public toastController: ToastController,
    public db: AngularFirestore,
    public device: Device,
    public alertController: AlertController,
    public translate: TranslateService
  ) {}

  amountOfWaterDaily: number;

  dbList: any;

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
            this.saveDailyAmount(this.amountOfWaterDaily);
          }
        }
      ]
    });

    await alert.present();
  }

  saveDailyAmount(value: number){
    let daily = {
      UserId: this.device.uuid,
      Value: value
    };
    this.dbList = this.db.collection<any>('DailyAmounts');
    this.dbList.add(daily);
    this.showSuccessToast(this.translate.instant('global.saveMessage'));
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