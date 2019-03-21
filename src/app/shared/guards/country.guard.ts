import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import * as Parse from 'parse';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryGuard implements CanActivate {
  constructor(private router: Router, private toastCtrl: ToastController) {}

  async canActivate(): Promise<boolean> {
    if (environment.production) {
      try {
        const countrySupported = await Parse.Cloud.run('isCountrySupported');
        if (!countrySupported) {
          this.router.navigate(['/forbidden']);
        }
        return countrySupported;
      } catch (error) {
        const toast = await this.toastCtrl.create({
          message: 'No Connection Available',
          duration: 2000
        });
        toast.onDidDismiss().then(() => {
          navigator['app'].exitApp();
        });
        toast.present();
      }
    } else {
      return true;
    }
  }
}
