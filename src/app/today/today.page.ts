import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { Device } from '@ionic-native/device/ngx';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';
import { DrinkValue } from '../objects/drinkValue';

@Component({
  selector: 'app-today',
  templateUrl: 'today.page.html',
  styleUrls: ['today.page.scss']
})
export class TodayPage {

  todayDrinks : any[];

  constructor(
    public navController : NavController,
    public alertController : AlertController,
    public device : Device,
    private storage: Storage
  ) {
    this.todayDrinks = this.getTodayList();
  }

  getTodayList(): Array<DrinkValue> {
    let keysLength = 0;
    this.storage.length().then((data) => {
      keysLength = data;
    })

    let drinks = [];
    this.storage.forEach( (value, key, index) => {
      let saveDate = new Date();
      let formattedDate = saveDate.getFullYear() + '-' + (saveDate.getMonth() + 1) + '-' + saveDate.getDate();

      if(key.startsWith('drinkValues_' + formattedDate)){
        value.Date = moment(value.Date).format('LLL');
        value.Key = key;
        drinks.push(value);
      }

      if(keysLength == index){
        drinks.sort((n1, n2) => {
          if (n1.Date > n2.Date) {
              return -1;
          }
          if (n1.Date < n2.Date) {
              return 1;
          }
          return 0;
        });
      }
    });

    return drinks;
  }

  async deleteDrink(slidingItem, key: string){
    const alert = await this.alertController.create({
      header: 'Onayla',
      message: 'Silme işlemini onaylıyor musunuz?',
      buttons: [
        {
          text: 'Vazgeç',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            alert.dismiss(false);
          }
        }, {
          text: 'Onayla',
          handler: () => {
            alert.dismiss(true);
            this.storage.remove(key);
            slidingItem.close();
            this.todayDrinks = this.getTodayList();
          }
        }
      ]
    });
    
    alert.present();
  }

  goBack(){
    this.navController.pop();
  }

}
