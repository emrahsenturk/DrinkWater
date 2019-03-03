import { Component } from '@angular/core';
import { ToastController  } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-toast',
    template: ''
  })

export class ToastService{

    constructor(
        public toast: ToastController,
        private translate: TranslateService
    ){}

    async showSuccessToast(message:string){
        const toast = await this.toast.create({
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

    async showWarningToast(message:string){
        const toast = await this.toast.create({
          message: message,
          showCloseButton: true,
          position: 'top',
          closeButtonText: this.translate.instant('global.close'),
          duration: 3000,
          animated: true,
          color: "warning"
        });
        toast.present();
    }

    async showDangerToast(message:string){
        const toast = await this.toast.create({
          message: message,
          showCloseButton: true,
          position: 'top',
          closeButtonText: this.translate.instant('global.close'),
          duration: 3000,
          animated: true,
          color: "danger"
        });
        toast.present();
    }
}