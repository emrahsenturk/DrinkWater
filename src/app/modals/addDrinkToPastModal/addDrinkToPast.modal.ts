import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from '../../crossCutting/toast/toast';

@Component({
    selector: 'app-addDrinkToPast',
    templateUrl: 'addDrinkToPast.modal.html',
    styleUrls: ['./addDrinkToPast.modal.scss'],
})

export class AddDrinkToPastModal {

    selectedDate: string = "";
    enteredAmount: string = "";
    maxDate: string = "";
    minDate: string = "";

    constructor(
        private modalController: ModalController,
        private alertController: AlertController,
        private translate: TranslateService,
        private toast: ToastService
    ){
        var today = new Date();
        this.minDate = today.getFullYear().toString();
        this.maxDate = today.getFullYear().toString();
    }

    async myDismiss() {
        const result = {
            success: false,
            date: this.selectedDate,
            amount: this.enteredAmount
        }
        await this.modalController.dismiss(result);
    }

    async saveDrinkToPast(){
        if(this.selectedDate == "" || this.enteredAmount == ""){
            this.toast.showWarningToast(this.translate.instant('global.missingData'));
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
                }
                }, {
                text: this.translate.instant('global.confirm'),
                handler: () => {
                    alert.dismiss(true);
                    const result = {
                        success: true,
                        date: this.selectedDate,
                        amount: this.enteredAmount
                    }
                    this.modalController.dismiss(result);
                }
                }
            ]
        });
        
        alert.present();
    }
}