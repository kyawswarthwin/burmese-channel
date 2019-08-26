import { Component, Injector, OnInit } from '@angular/core';

import { BasePage } from 'src/app/shared/pages/base/base.page';
import { ChannelService as Channel } from '../../services/channel.service';

@Component({
  selector: 'app-channel-detail',
  templateUrl: './channel-detail.component.html',
  styleUrls: ['./channel-detail.component.scss']
})
export class ChannelDetailComponent extends BasePage implements OnInit {
  channel: Channel;

  constructor(public injector: Injector) {
    super(injector);

    this.channel = new Channel();
    this.channel.id = this.route.snapshot.paramMap.get('id');
  }

  async ngOnInit() {
    try {
      await this.showLoadingView('Loading...');
      await this.channel.fetch();
      this.showContentView();
    } catch (error) {
      if (error.code === 101) {
        this.showEmptyView();
      } else {
        this.showErrorView();
      }
    }
  }
}
