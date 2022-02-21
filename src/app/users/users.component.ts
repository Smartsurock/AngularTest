import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { usersAnimation } from './users.animation';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [usersAnimation]
})
export class UsersComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }

  routeAnimation(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData
      && outlet.activatedRouteData['animation'];
  }
}
