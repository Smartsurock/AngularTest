import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-unread-messages',
  templateUrl: './unread-messages.component.html',
  styleUrls: ['./unread-messages.component.scss']
})
export class UnreadMessagesComponent implements OnInit {
  constructor() { }

  @Input() unreadMessages: number;

  ngOnInit(): void { }
}
