import { Component, ViewChild } from '@angular/core';
import { IonSelect, ToastController, AlertController, NavController } from '@ionic/angular';
import { Chart } from 'chart.js';
import { AngularFirestore } from 'angularfire2/firestore';
import { Device } from '@ionic-native/device/ngx';
import { TranslateService } from '@ngx-translate/core';
import { DrinkValue } from '../objects/drinkValue';
import { Storage } from '@ionic/storage';
import { ToastService } from '../crossCutting/toast/toast';

@Component({
  selector: 'app-drinkWater',
  templateUrl: 'drinkWater.page.html',
  styleUrls: ['drinkWater.page.scss']
})
export class DrinkWaterPage {

  constructor(
    public navController: NavController,
    public toastController: ToastController,
    public db: AngularFirestore,
    public device: Device,
    public alertController: AlertController,
    public translate: TranslateService,
    private storage: Storage,
    private drinkValue : DrinkValue,
    private toast: ToastService
  ) {}

  dbList: any;
  allDrinkingToday: number = 0;
  allRemainigToday: number = 0; 

  customSelectDrinkHeaderOptions: any = {
    header: this.translate.instant('drinkWater.howMuchWater'),
    translucent: true
  };

  otherDrinkValues : any = [
    {value: 50,text: "50 ML"},
    {value: 100,text: "100 ML"},
    {value: 150,text: "150 ML"},
    {value: 200,text: "200 ML"},
    {value: 250,text: "250 ML"},
    {value: 300,text: "300 ML"},
    {value: 350,text: "350 ML"},
    {value: 400,text: "400 ML"},
    {value: 450,text: "450 ML"},
    {value: 500,text: "500 ML"},
  ]

  @ViewChild('selectOtherDrinkValues') selectOtherDrinkValues : IonSelect;
  selectedChoice : string = "";

  @ViewChild('doughnutCanvas') doughnutCanvas : any;
  doughnutChart: any;

  ngOnInit(){
    this.getChartsData();
  }

  getChartsData(){
    this.allDrinkingToday = 0;
    this.allRemainigToday = 0;

    let keysLength = 0;
    this.storage.length().then((data) => {
      keysLength = data;
    })

    this.storage.get('dailyAmount').then((val) => {

      this.storage.forEach( (value, key, index) => {
        let saveDate = new Date();
        let formattedDate = saveDate.getFullYear() + '-' + (saveDate.getMonth() + 1) + '-' + saveDate.getDate();
  
        if(key.startsWith('drinkValues_' + formattedDate)){
          this.allDrinkingToday += value.Value;
        }
        if(keysLength == index){
          this.allRemainigToday = val - this.allDrinkingToday;
          this.allRemainigToday = this.allRemainigToday >= 0 ? this.allRemainigToday : 0;
          this.setChart();
        }
      });
      
    });
  }

  setChart(){
    let lblRemaining = this.translate.instant('drinkWater.remaining');
    let lblDrinking = this.translate.instant('drinkWater.drinking');

    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
          labels: [lblRemaining, lblDrinking],
          datasets: [{
              label: '# of Votes',
              data: [this.allRemainigToday, this.allDrinkingToday],
              backgroundColor: [
                  '#FF6384',
                  '#36A2EB'
              ]
          }]
      }
    });
  }

  async addDrinkValue(value:Number){
    let alert = await this.confirm(value);
  }

  saveDrink(value : number){
    let saveDate = new Date();

    this.drinkValue = {
      UserId: this.device.uuid,
      Value: value,
      Date: saveDate
    };

    let formattedDate = saveDate.getFullYear() + '-' + (saveDate.getMonth() + 1) + '-' + saveDate.getDate() +
      '_' + saveDate.getHours() + ':' + saveDate.getMinutes() + ':' + saveDate.getMilliseconds();

    this.storage.set('drinkValues_' + formattedDate, this.drinkValue);
    this.dbList = this.db.collection<DrinkValue>('DrinkValues');
    this.dbList.add(this.drinkValue);
    this.toast.showSuccessToast(this.translate.instant('global.saveMessage'));
    this.getChartsData();
  }

  openSelectOtherDrink(){
    this.selectOtherDrinkValues.open();
  }

  async changeSelectedDrinkValue(){
    await this.confirm(this.selectedChoice);
  }

  openTodayDrinkList(){
    this.navController.navigateRoot('/today');
  }

  async confirm(value) {
    if(value == ""){
      return;
    }

    const alert = await this.alertController.create({
      header: this.translate.instant('global.confirm'),
      message: this.translate.instant('global.confirmMessage'),
      buttons: [
        {
          text: this.translate.instant('global.cancel'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            alert.dismiss(false);
            this.selectedChoice = "";
          }
        }, {
          text: this.translate.instant('global.confirm'),
          handler: () => {
            alert.dismiss(true);
            this.selectedChoice = "";
            this.saveDrink(value);
          }
        }
      ]
    });
    
    alert.present();
  }

  // async showSuccessToast(message:string){
  //   const toast = await this.toastController.create({
  //     message: message,
  //     showCloseButton: true,
  //     position: 'top',
  //     closeButtonText: this.translate.instant('global.close'),
  //     duration: 3000,
  //     animated: true,
  //     color: "primary"
  //   });
  //   toast.present();
  // }

}
