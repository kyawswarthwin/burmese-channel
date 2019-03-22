import { Injectable } from '@angular/core';
import * as Parse from 'parse';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private countrySupported: boolean;

  constructor() {}

  isCountrySupported(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (this.countrySupported === undefined) {
          this.countrySupported = await Parse.Cloud.run('isCountrySupported');
        }
        resolve(this.countrySupported);
      } catch (error) {
        reject(error);
      }
    });
  }
}
