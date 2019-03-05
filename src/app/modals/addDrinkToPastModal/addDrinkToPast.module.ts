import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddDrinkToPastModal } from './addDrinkToPast.modal';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
     declarations: [
        AddDrinkToPastModal
     ],
     imports: [
       IonicModule,
       CommonModule,
       FormsModule,
       TranslateModule
     ],
     entryComponents: [
        AddDrinkToPastModal
     ]
})
export class AddDrinkToPastModalModule {}