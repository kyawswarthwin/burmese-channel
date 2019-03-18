import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { LoadingViewComponent } from './loading-view/loading-view.component';
import { MessageViewComponent } from './message-view/message-view.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [LoadingViewComponent, MessageViewComponent],
  exports: [LoadingViewComponent, MessageViewComponent]
})
export class SharedComponentsModule {}
