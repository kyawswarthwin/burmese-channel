import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CountryGuard } from './shared/guards/country.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/movies/movies',
    pathMatch: 'full'
  },
  {
    path: 'movies',
    loadChildren: './pages/movies/movies.module#MoviesPageModule',
    canActivate: [CountryGuard]
  },
  {
    path: 'channels',
    loadChildren: './pages/channels/channels.module#ChannelsPageModule',
    canActivate: [CountryGuard]
  },
  {
    path: 'forbidden',
    loadChildren: './pages/forbidden/forbidden.module#ForbiddenPageModule'
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
