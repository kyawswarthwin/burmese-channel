import { Component, Injector, Input } from '@angular/core';

import { BasePage } from '../../pages/base/base.page';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent extends BasePage {
  @Input() fields: any[];
  @Input() field: string;
  @Input() direction: string;

  constructor(public injector: Injector) {
    super(injector);
  }

  close() {
    this.closePopover({
      field: this.field,
      direction: this.direction
    });
  }
}
