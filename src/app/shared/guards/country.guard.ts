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
      const countrySupported = await Parse.Cloud.run('isCountrySupported');
      if (!countrySupported) {
        this.router.navigate(['/forbidden']);
      }
      return countrySupported;
    } else {
      return true;
    }
  }
}
