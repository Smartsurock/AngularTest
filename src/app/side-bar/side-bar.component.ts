import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { BurgerService } from '../header/burger.service';
import * as fromAppReducer from '../store/app.reducer';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit, OnDestroy {
  constructor(
    private burgerService: BurgerService,
    private store: Store<fromAppReducer.AppState>,
  ) { }

  unreadMessages: number;
  myMail: string;
  authSub: Subscription;
  messagesSub: Subscription;

  ngOnInit() {
    this.authSub = this.store.select('auth').subscribe(state => {
      if (state.user) {
        this.myMail = state.user.email;
      }
    });

    this.messagesSub = this.store.select('messages').subscribe(state => {
      this.unreadMessages = state.messages.filter(messages => {
        return messages.toEmail === this.myMail && messages.unread === true;
      }).length;
    });
  }

  onLinkClick() {
    setTimeout(() => {
      this.burgerService.toggleBurger(false);
    }, 200);
  }

  ngOnDestroy() {
    this.unsubscriber(this.authSub);
    this.unsubscriber(this.messagesSub);
  }

  unsubscriber(subscription: Subscription) {
    if (subscription) subscription.unsubscribe();
  }
}
