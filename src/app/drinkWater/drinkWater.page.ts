import { Component, ViewChild } from '@angular/core';
import { IonSelect, ToastController  } from '@ionic/angular'
import { Chart } from 'chart.js';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-drinkWater',
  templateUrl: 'drinkWater.page.html',
  styleUrls: ['drinkWater.page.scss']
})
export class DrinkWaterPage {

  constructor(
    public toastController: ToastController,
    public db: AngularFireDatabase) {}

  customSelectDrinkHeaderOptions: any = {
    header: 'Ne kadar su içtiniz?',
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

  @ViewChild('doughnutCanvas') doughnutCanvas;

  doughnutChart: any;

  ngOnInit(){

    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
          labels: ["Kalan", "İçilen"],
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

  addDrinkValue(value:Number){
    let drinkValue = {
      UserId: 1,
      Value: value
    };
    this.db.list('DrinkValues').push(drinkValue);
    this.showSuccessToast('Kaydedildi...');
  }

  openSelectOtherDrink(){
    this.selectOtherDrinkValues.open();
  }

  changeSelectedDrinkValue(){
    if(this.selectedChoice == " "){
      return;
    }

    let drinkValue = {
      UserId: 1,
      Value: this.selectedChoice
    };
    this.db.list('DrinkValues').push(drinkValue);
    this.showSuccessToast('Kaydedildi...');
    this.selectedChoice = " ";
  }

  openTodayDrinkList(){
    this.showSuccessToast('Bugün girilen su listesi sayfası açılacak.');
  }

  async showSuccessToast(message:string){
    const toast = await this.toastController.create({
      message: message,
      showCloseButton: true,
      position: 'top',
      closeButtonText: 'Kapat',
      duration: 3000,
      animated: true,
      color: "primary"
    });
    toast.present();
  }

}
