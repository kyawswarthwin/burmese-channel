import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { CountryGuard } from './shared/guards/country.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/movies/movies',
    pathMatch: 'full'
  },
  {
    path: 'movies',
    loadChildren: () => import('./pages/movies/movies.module').then(m => m.MoviesPageModule),
    canActivate: [CountryGuard]
  },
  {
    path: 'channels',
    loadChildren: () => import('./pages/channels/channels.module').then(m => m.ChannelsPageModule),
    canActivate: [CountryGuard]
  },
  {
    path: 'forbidden',
    loadChildren: () =>
      import('./pages/forbidden/forbidden.module').then(m => m.ForbiddenPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
