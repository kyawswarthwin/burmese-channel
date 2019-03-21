import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import * as Parse from 'parse';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryGuard implements CanActivate {
  constructor(private router: Router) {}

  async canActivate(): Promise<boolean> {
    if (environment.production) {
      try {
        const countrySupported = await Parse.Cloud.run('isCountrySupported');
        if (!countrySupported) {
          this.router.navigate(['/forbidden']);
        }
        return countrySupported;
      } catch (error) {
        navigator['app'].exitApp();
      }
    } else {
      return true;
    }
  }
}
