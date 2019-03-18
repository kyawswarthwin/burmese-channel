import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import {
  AdMobFree,
  AdMobFreeBannerConfig,
  AdMobFreeInterstitialConfig
} from '@ionic-native/admob-free/ngx';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdService {
  constructor(private platform: Platform, private adMobFree: AdMobFree) {}

  showBanner(): Promise<any> {
    if (this.platform.is('cordova')) {
      const bannerConfig: AdMobFreeBannerConfig = {
        id: this.getAdId('banner'),
        autoShow: true
      };
      this.adMobFree.banner.config(bannerConfig);
      return this.adMobFree.banner.prepare();
    }
  }

  showInterstitial(): Promise<any> {
    if (this.platform.is('cordova')) {
      const interstitialConfig: AdMobFreeInterstitialConfig = {
        id: this.getAdId('interstitial'),
        autoShow: true
      };
      this.adMobFree.interstitial.config(interstitialConfig);
      return this.adMobFree.interstitial.prepare();
    }
  }

  private getAdId(format: string): string {
    if (this.platform.is('ios')) {
      return environment.adUnits.ios[format];
    } else if (this.platform.is('android')) {
      return environment.adUnits.android[format];
    } else {
      return '';
    }
  }
}
