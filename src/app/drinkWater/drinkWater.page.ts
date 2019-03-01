import { Component, ViewChild } from '@angular/core';
import { IonSelect, ToastController, AlertController, NavController  } from '@ionic/angular';
import { Chart } from 'chart.js';
import { AngularFirestore } from 'angularfire2/firestore';
import { Device } from '@ionic-native/device/ngx';
import { TranslateService } from '@ngx-translate/core';
import { DrinkValue } from '../objects/drinkValue';

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
    private drinkValue : DrinkValue
  ) {}

  dbList: any;

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
    this.setChart();
  }

  setChart(){
    let remaining = this.translate.instant('drinkWater.remaining');
    let drinking = this.translate.instant('drinkWater.drinking');

    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
          labels: [remaining, drinking],
          datasets: [{
              label: '# of Votes',
              data: [850, 1750],
              backgroundColor: [
                  '#FF6384',
                  '#36A2EB'
              ],
              hoverBackgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)"
              ]
          }]
      }
    });
  }

  async addDrinkValue(value:Number){
    let alert = await this.confirm(value);
  }

  saveDrink(value : number){
    this.drinkValue = {
      UserId: this.device.uuid,
      Value: value,
      Date: new Date()
    };
    this.dbList = this.db.collection<DrinkValue>('DrinkValues');
    this.dbList.add(this.drinkValue);
    this.showSuccessToast(this.translate.instant('global.saveMessage'));
  }

  openSelectOtherDrink(){
    this.selectOtherDrinkValues.open();
  }

  async changeSelectedDrinkValue(){
    if(this.selectedChoice == " "){
      return;
    }
    await this.confirm(this.selectedChoice);
  }

  openTodayDrinkList(){
    this.navController.navigateForward('/today');
  }

  async confirm(value) {
    const alert = await this.alertController.create({
      header: this.translate.instant('global.confirm'),
      message: this.translate.instant('global.confrmMessage'),
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
            this.saveDrink(value);
          }
        }
      ]
    });
    
    alert.present();
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
