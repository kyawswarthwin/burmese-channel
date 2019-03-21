import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { AppUpdate } from '@ionic-native/app-update/ngx';
import { Insomnia } from '@ionic-native/insomnia/ngx';

import { environment } from 'src/environments/environment';
import { ParseService } from './shared/services/parse.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private router: Router,
    private appUpdate: AppUpdate,
    private insomnia: Insomnia,
    private parse: ParseService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.insomnia.keepAwake();
      this.appUpdate.checkAppUpdate(environment.updateUrl);
      this.parse.initialize(environment.parseConfig);
    });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/channels' || event.url === '/forbidden') {
          this.splashScreen.hide();
        }
      }
    });
    this.platform.backButton.subscribe(() => {
      if (this.router.isActive('/channels', true) || this.router.isActive('/forbidden', true)) {
        navigator['app'].exitApp();
      }
    });
  }
}
