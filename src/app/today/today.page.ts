import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { Device } from '@ionic-native/device/ngx';
import * as moment from 'moment';
import { DrinkValue } from '../objects/drinkValue';

@Component({
  selector: 'app-today',
  templateUrl: 'today.page.html',
  styleUrls: ['today.page.scss']
})
export class TodayPage {

  todayDrinks : any;

  constructor(
    public navController : NavController,
    public alertController : AlertController,
    public db: AngularFirestore,
    public device : Device
  ) {
    this.todayDrinks = this.getTodayList();
  }

  getTodayList() {
    let startDate = new Date(moment.now());
    startDate.setHours(0, 0, 0, 0);

    let endDate = new Date(moment.now());
    endDate.setHours(23, 59, 59, 0);

    return this.db.collection<any>('DrinkValues', ref => ref
      .where('UserId', '==', this.device.uuid)
      .where('Date', '>=', startDate)
      .where('Date', '<=', endDate)
      .orderBy('Date', 'desc'))
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          data.Date = moment(data.Date.seconds * 1000).format('LLL');
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }

  async deleteDrink(slidingItem, id){
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
            this.db.doc<any>('DrinkValues/' + id).delete();
            slidingItem.close();
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
