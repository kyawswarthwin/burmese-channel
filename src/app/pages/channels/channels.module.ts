import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ChannelsPage } from './channels.page';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { SortComponent } from 'src/app/shared/components/sort/sort.component';
import { ChannelDetailComponent } from './shared/components/channel-detail/channel-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ChannelsPage
  },
  {
    path: ':id',
    component: ChannelDetailComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedComponentsModule
  ],
  declarations: [ChannelsPage, ChannelDetailComponent],
  entryComponents: [SortComponent]
})
export class ChannelsPageModule {}
