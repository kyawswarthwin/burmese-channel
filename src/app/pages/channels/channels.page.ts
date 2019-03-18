import { Component, Injector, ViewChild } from '@angular/core';
import { IonSearchbar } from '@ionic/angular';

import { BasePage } from 'src/app/shared/pages/base/base.page';
import { ChannelService } from './shared/services/channel.service';
import { SortComponent } from 'src/app/shared/components/sort/sort.component';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.page.html',
  styleUrls: ['./channels.page.scss']
})
export class ChannelsPage extends BasePage {
  @ViewChild(IonSearchbar) searchbar: IonSearchbar;

  params: any = {};
  channels: ChannelService[];
  showSearchbar: boolean = false;
  fields: any[] = [
    {
      name: 'name',
      label: 'Name'
    },
    {
      name: 'updatedAt',
      label: 'Date Modified'
    }
  ];
  field: string = 'name';
  direction: string = '';

  constructor(public injector: Injector, private channel: ChannelService) {
    super(injector);
  }

  async ngOnInit() {
    await this.showLoadingView('Loading...');
    this.onReload();
  }

  onReload(event?: Event) {
    this.refresher = event && event.target;

    this.params.sortBy = `${this.direction}${this.field}`;
    this.params.page = 1;
    this.channels = [];

    this.loadData();
  }

  async loadData() {
    try {
      const data = await this.channel.load(this.params);
      this.channels = this.channels.concat(data);
      this.onRefreshComplete(data);
      if (this.channels.length) {
        this.showContentView();
      } else {
        this.showEmptyView();
      }
    } catch (error) {
      this.onRefreshComplete();
      this.showErrorView();
    }
  }

  focusSearchbar() {
    setTimeout(() => {
      this.searchbar.setFocus();
    }, 500);
  }

  async onSearch() {
    await this.showLoadingView('Searching...');
    this.onReload();
    this.focusSearchbar();
  }

  onClearSearch() {
    this.params.search = '';
    this.ngOnInit();
    this.focusSearchbar();
  }

  async onSort(event: Event) {
    const { field, direction } = await this.showPopover(event, SortComponent, {
      fields: this.fields,
      field: this.field,
      direction: this.direction
    });
    this.field = field;
    this.direction = direction;
    this.ngOnInit();
  }

  onLoadMore(event: Event) {
    this.infiniteScroll = event.target;
    this.params.page++;
    this.loadData();
  }
}
