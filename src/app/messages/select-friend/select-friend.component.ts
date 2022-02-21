import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { Profile } from 'src/app/profile/profile-models/profile.model';
import { Message } from '../message.model';
import * as fromAppReducer from 'src/app/store/app.reducer';

@Component({
  selector: 'app-select-friend',
  templateUrl: './select-friend.component.html',
  styleUrls: ['./select-friend.component.scss']
})
export class SelectFriendComponent implements OnInit {
  constructor(private store: Store<fromAppReducer.AppState>) { }

  friends: Profile[];
  myMail: string;
  unreadMessages: Message[];
  newUnreadMessages: any[] = [];
  newMessagesValue: number[] = [];

  ngOnInit(): void {
    this.store.select('auth').pipe(take(1)).subscribe(state => {
      if (state.user) {
        this.myMail = state.user.email;
      }
    });

    this.store.select('profile').pipe(take(1)).subscribe(state => {
      this.friends = state.profiles;
    });

    this.store.select('messages').pipe(take(1)).subscribe(state => {
      this.unreadMessages = state.messages.filter(message => {
        return message.unread === true;
      });
    });

    for (let i = 0; i < this.friends.length; i++) {
      let temp: Message[] = [];

      this.newUnreadMessages.push(temp);
      for (let j = 0; j < this.unreadMessages.length; j++) {
        if (this.friends[i].privateMail === this.unreadMessages[j].fromEmail && this.unreadMessages[j].toEmail === this.myMail) {
          temp.push(this.unreadMessages[j]);
        }
      }
    }

    this.newMessagesValue = this.newUnreadMessages.map(element => {
      return element.length;
    });
  }
}
