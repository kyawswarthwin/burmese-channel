import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loading-view',
  templateUrl: './loading-view.component.html',
  styleUrls: ['./loading-view.component.scss']
})
export class LoadingViewComponent implements OnInit {
  @Input() spinner:
    | 'bubbles'
    | 'circles'
    | 'crescent'
    | 'dots'
    | 'lines'
    | 'lines-small'
    | undefined;
  @Input() duration: number | undefined;
  @Input() message: string | undefined;

  constructor() {}

  ngOnInit() {}
}
