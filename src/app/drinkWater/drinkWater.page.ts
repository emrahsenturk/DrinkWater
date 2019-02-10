import { Component, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-drinkWater',
  templateUrl: 'drinkWater.page.html',
  styleUrls: ['drinkWater.page.scss']
})
export class DrinkWaterPage {

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

}
