import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DrinkWaterPage } from './drinkWater.page';
import { ChartsModule } from 'ng2-charts';
import { TranslateModule } from '@ngx-translate/core';
import { DrinkValue } from '../objects/drinkValue';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ChartsModule,
    RouterModule.forChild([{ path: '', component: DrinkWaterPage }]),
    TranslateModule,
  ],
  declarations: [DrinkWaterPage],
  providers: [
    DrinkValue
  ]
})
export class DrinkWaterPageModule {}
