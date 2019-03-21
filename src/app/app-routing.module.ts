import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CountryGuard } from './shared/guards/country.guard';

const routes: Routes = [
  {
    path: 'channels',
    loadChildren: './pages/channels/channels.module#ChannelsPageModule',
    canActivate: [CountryGuard]
  },
  {
    path: '',
    redirectTo: '/channels',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
