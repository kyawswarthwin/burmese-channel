import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Toast } from '@ionic-native/toast/ngx';

import { environment } from 'src/environments/environment';
import { CountryService } from '../services/country.service';

@Injectable({
  providedIn: 'root'
})
export class CountryGuard implements CanActivate {
  constructor(private country: CountryService, private router: Router, private toast: Toast) {}

  async canActivate(): Promise<boolean> {
    if (environment.production) {
      try {
        const countrySupported = await this.country.isCountrySupported();
        if (!countrySupported) {
          this.router.navigate(['/forbidden']);
        }
        return countrySupported;
      } catch (error) {
        this.toast.showShortBottom('No Connection Available').subscribe(toast => {
          if (toast.event === 'hide') {
            navigator['app'].exitApp();
          }
        });
      }
    } else {
      return true;
    }
  }
}
