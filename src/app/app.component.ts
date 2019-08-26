import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { SideMenuOptions } from 'ionic-side-menu';
import { Insomnia } from '@ionic-native/insomnia/ngx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  options: SideMenuOptions = {
    header: {
      background: 'assets/img/side-menu-bg.jpg'
    },
    menus: [
      {
        items: [
          {
            label: 'Movies',
            url: '/movies'
          },
          {
            label: 'Live',
            url: '/channels'
          }
        ]
      }
    ]
  };

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private router: Router,
    private insomnia: Insomnia
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.insomnia.keepAwake();
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          if (
            event.urlAfterRedirects === '/movies/movies' ||
            event.urlAfterRedirects === '/forbidden'
          ) {
            this.splashScreen.hide();
          }
        }
      });
    });

    this.platform.backButton.subscribe(() => {
      if (this.router.isActive('/channels', true) || this.router.isActive('/forbidden', true)) {
        navigator['app'].exitApp();
      }
    });
  }
}
