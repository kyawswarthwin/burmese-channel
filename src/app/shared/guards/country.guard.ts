import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import * as Parse from 'parse';

@Injectable({
  providedIn: 'root'
})
export class CountryGuard implements CanActivate {
  constructor(private router: Router) {}

  async canActivate(): Promise<boolean> {
    const countrySupported = await Parse.Cloud.run('isCountrySupported');
    if (!countrySupported) {
      this.router.navigate(['/forbidden']);
    }
    return countrySupported;
  }
}
