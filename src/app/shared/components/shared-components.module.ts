import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { MessageViewComponent } from './message-view/message-view.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [MessageViewComponent],
  exports: [MessageViewComponent]
})
export class SharedComponentsModule {}
