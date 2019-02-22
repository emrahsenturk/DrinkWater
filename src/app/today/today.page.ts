import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

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
    public db: AngularFirestore) {
    this.todayDrinks = this.db.collection<any>('DrinkValues', ref =>
      ref.where('UserId', '==', 'B0FCB839-E5C9-4571-81F9-723B8FF4E1EF')).snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
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
