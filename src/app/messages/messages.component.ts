import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { messagesAnimation } from './messages.animation';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  animations: [messagesAnimation]
})
export class MessagesComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }

  routeAnimation(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData
      && outlet.activatedRouteData['animation'];
  }
}
