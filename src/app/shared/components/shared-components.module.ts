import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { MessageViewComponent } from './message-view/message-view.component';
import { SortComponent } from './sort/sort.component';
import { VideoComponent } from './video/video.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [MessageViewComponent, SortComponent, VideoComponent],
  exports: [MessageViewComponent, SortComponent, VideoComponent]
})
export class SharedComponentsModule {}
