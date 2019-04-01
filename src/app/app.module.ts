import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicSideMenuModule } from 'ionic-side-menu';
import { ImgFallbackModule } from 'ngx-img-fallback';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppUpdate } from '@ionic-native/app-update/ngx';
import { AndroidFullScreen } from '@ionic-native/android-full-screen/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Insomnia } from '@ionic-native/insomnia/ngx';
import { Toast } from '@ionic-native/toast/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';
import { ParseService } from './shared/services/parse.service';

@NgModule({
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicSideMenuModule,
    ImgFallbackModule,
    AppRoutingModule
  ],
  declarations: [AppComponent],
  providers: [
    SplashScreen,
    StatusBar,
    AppUpdate,
    AndroidFullScreen,
    ScreenOrientation,
    Insomnia,
    Toast,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: APP_INITIALIZER,
      useFactory: (parse: ParseService) => {
        return () => {
          return new Promise((resolve, reject) => {
            parse.initialize(environment.parseConfig);
            resolve();
          });
        };
      },
      deps: [ParseService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
