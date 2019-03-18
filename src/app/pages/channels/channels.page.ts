import { Component, OnInit, ViewChild } from '@angular/core';
import { IonVirtualScroll, IonInfiniteScroll, IonRefresher } from '@ionic/angular';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';

import { ChannelService } from './shared/services/channel.service';
import {
  LoadingWrapperService,
  LoadingStatus
} from 'src/app/shared/services/loading-wrapper.service';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.page.html',
  styleUrls: ['./channels.page.scss']
})
export class ChannelsPage implements OnInit {
  @ViewChild(IonVirtualScroll) virtualScroll: IonVirtualScroll;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonRefresher) refresher: IonRefresher;

  params: any = {
    page: 1
  };
  channels: ChannelService[];
  loading$: Observable<LoadingWrapperService<any>>;
  refreshing: boolean;

  LoadingStatus: typeof LoadingStatus = LoadingStatus;

  constructor(private channel: ChannelService) {}

  ngOnInit() {
    this.load();
  }

  onReload(event: Event) {
    this.refreshing = true;
    this.params = {
      page: 1
    };
    this.load();
    this.infiniteScroll.disabled = false;
  }

  onLoadMore(event: Event) {
    this.refreshing = true;
    this.params.page++;
    this.channel.load(this.params).subscribe(data => {
      this.channels = this.channels.concat(data);
      this.infiniteScroll.complete();
      if (data && data.length > 0) {
        this.infiniteScroll.disabled = false;
      } else {
        this.infiniteScroll.disabled = true;
      }
      this.virtualScroll.checkEnd();
    });
  }

  load() {
    this.loading$ = LoadingWrapperService.wrap(this.channel.load(this.params)).pipe(
      tap(loading => {
        if (loading.status === LoadingStatus.LOADING) {
          this.refresher.disabled = true;
        } else if (loading.status === LoadingStatus.SUCCESS) {
          this.channels = loading.data;
          this.refresher.disabled = false;
        } else {
          this.refresher.disabled = false;
        }
      }),
      finalize(() => {
        this.refresher.complete();
        this.refreshing = false;
      })
    );
  }
}
