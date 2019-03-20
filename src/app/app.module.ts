import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppUpdate } from '@ionic-native/app-update/ngx';
import { AdMobFree } from '@ionic-native/admob-free/ngx';
import { Insomnia } from '@ionic-native/insomnia/ngx';
import { AndroidFullScreen } from '@ionic-native/android-full-screen/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  declarations: [AppComponent],
  providers: [
    SplashScreen,
    StatusBar,
    AppUpdate,
    AdMobFree,
    Insomnia,
    AndroidFullScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
