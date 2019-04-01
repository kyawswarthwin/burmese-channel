import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { MoviesPage } from './movies.page';
import { MoviesComponent } from './shared/components/movies/movies.component';
import { GenresComponent } from './shared/components/genres/genres.component';
import { YearsComponent } from './shared/components/years/years.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/movies/movies',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MoviesPage,
    children: [
      {
        path: 'movies',
        component: MoviesComponent
      },
      {
        path: 'genres',
        component: GenresComponent
      },
      {
        path: 'years',
        component: YearsComponent
      }
    ]
  }
];

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RouterModule.forChild(routes)],
  declarations: [MoviesPage, MoviesComponent, GenresComponent, YearsComponent]
})
export class MoviesPageModule {}
