import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { Profile } from '../profile/profile-models/profile.model';
import { messagesAnimation } from './messages.animation';
import * as fromAppReducer from '../store/app.reducer';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  animations: [messagesAnimation]
})
export class MessagesComponent implements OnInit {
  constructor(private store: Store<fromAppReducer.AppState>) { }

  friends: Profile[];

  ngOnInit() {
    this.store.select('profile').pipe(take(1)).subscribe(state => {
      this.friends = state.profiles;
    });
  }

  routeAnimation(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData
      && outlet.activatedRouteData['animation'];
  }
}
