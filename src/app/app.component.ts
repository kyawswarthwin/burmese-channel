import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
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
    private statusBar: StatusBar,
    private router: Router,
    private appUpdate: AppUpdate,
    private insomnia: Insomnia,
    private parse: ParseService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#d32f2f');
      this.insomnia.keepAwake();
      this.appUpdate.checkAppUpdate(environment.updateUrl);
      this.parse.initialize(environment.parseConfig);
      this.splashScreen.hide();
    });
    this.platform.backButton.subscribe(() => {
      if (this.router.isActive('/channels', true)) {
        navigator['app'].exitApp();
      }
    });
  }
}
