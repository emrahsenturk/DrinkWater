import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DrinkWaterPage } from './drinkWater.page';
import { ChartsModule } from 'ng2-charts';
import { TranslateModule } from '@ngx-translate/core';
import { DrinkValue } from '../objects/drinkValue';
import { ToastService } from '../crossCutting/toast/toast';
import { AddDrinkToPastModalModule } from '../modals/addDrinkToPastModal/addDrinkToPast.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ChartsModule,
    RouterModule.forChild([{ path: '', component: DrinkWaterPage }]),
    TranslateModule,
    AddDrinkToPastModalModule
  ],
  declarations: [DrinkWaterPage],
  providers: [
    DrinkValue,
    ToastService
  ]
})
export class DrinkWaterPageModule {}
