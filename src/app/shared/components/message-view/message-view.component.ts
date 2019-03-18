import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-message-view',
  templateUrl: './message-view.component.html',
  styleUrls: ['./message-view.component.scss']
})
export class MessageViewComponent implements OnInit {
  @Input() icon: string = 'alert';
  @Input() message: string = '';

  constructor() {}

  ngOnInit() {}
}
