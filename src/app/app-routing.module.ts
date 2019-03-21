import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CountryGuard } from './shared/guards/country.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/channels',
    pathMatch: 'full'
  },
  {
    path: 'forbidden',
    loadChildren: './pages/forbidden/forbidden.module#ForbiddenPageModule'
  },
  {
    path: 'channels',
    loadChildren: './pages/channels/channels.module#ChannelsPageModule',
    canActivate: [CountryGuard]
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
