import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SettingsPage } from './settings.page';
import { TranslateModule } from '@ngx-translate/core';
import { DailyAmount } from '../objects/dailyAmount';
import { ToastService } from '../crossCutting/toast/toast';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: SettingsPage }]),
    TranslateModule
  ],
  declarations: [SettingsPage],
  providers: [
    DailyAmount,
    ToastService
  ]
})
export class SettingsPageModule {}
