import { Component, OnInit, ViewChild } from '@angular/core';
import { IonVirtualScroll, IonRefresher } from '@ionic/angular';
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
  @ViewChild(IonRefresher) refresher: IonRefresher;

  loading$: Observable<LoadingWrapperService<any>>;
  refreshing: boolean;

  LoadingStatus: typeof LoadingStatus = LoadingStatus;

  constructor(private channel: ChannelService) {}

  ngOnInit() {
    this.load();
  }

  onReload(event: Event) {
    this.refreshing = true;
    this.load();
  }

  load() {
    this.loading$ = LoadingWrapperService.wrap(this.channel.load()).pipe(
      tap(loading => {
        if (loading.status === LoadingStatus.LOADING) {
          this.refresher.disabled = true;
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
