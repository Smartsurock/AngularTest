import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Profile } from 'src/app/profile/profile-models/profile.model';
import { Message } from '../message.model';
import * as fromAppReducer from 'src/app/store/app.reducer';
import * as MessagesActions from '../messages-store/messages.actions';
import { Location } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  animations: [
    trigger('add', [
      transition('void => *', [
        style({
          opacity: 0,
        }),
        animate(600, style({
          opacity: 1,
        }))
      ])
    ]),
  ]
})
export class MessageComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private store: Store<fromAppReducer.AppState>) { }

  messageForm: FormGroup;
  routeSub: Subscription;
  messagesSub: Subscription;
  privateMail: string;
  friendMail: string;
  friendId: number;
  profile: Profile;
  messages: Message[];
  allMessages: Message[];
  newMessages: Message[];
  editMode: boolean = false;
  editIndex: number;

  ngOnInit() {
    this.store.select('auth').pipe(take(1)).subscribe(state => {
      this.privateMail = state.user.email;
    });

    this.routeSub = this.route.params.subscribe((params: Params) => {
      this.friendId = params['id'];
    });

    this.store.select('profile').pipe(take(1)).subscribe(state => {
      let myIndex = state.profiles.findIndex(profile => {
        return profile.privateMail === this.privateMail;
      });
      this.profile = state.profiles[myIndex];
      this.friendMail = state.profiles[this.friendId].privateMail;
    });

    if (this.privateMail === this.friendMail) {
      this.router.navigate(['/profile']);
    }

    this.messagesSub = this.store.select('messages').subscribe(state => {
      this.allMessages = state.messages;

      const messages = state.messages.filter(message => {
        return message.fromEmail === this.privateMail || message.toEmail === this.privateMail;
      });
      this.messages = messages.filter(message => {
        return message.toEmail === this.friendMail || message.fromEmail === this.friendMail;
      })
    });

    this.newMessages = this.messages.filter(message => {
      return message.unread === true;
    });

    this.messageForm = new FormGroup({
      message: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    if (this.messageForm.invalid) return;

    if (!this.editMode) {
      const newMessage = new Message(this.friendId, this.friendMail, this.privateMail, this.profile.name, this.profile.imageUrl, this.messageForm.value.message, new Date().getTime(), true);
      this.store.dispatch(new MessagesActions.SendMessage(newMessage));

      setTimeout(() => {
        this.scrollTop();
      }, 0);
    } else {
      const newMessage: Message = JSON.parse(JSON.stringify(
        this.allMessages[this.editIndex]
      ));
      newMessage.text = this.messageForm.value.message;
      newMessage.unread = true;

      this.store.dispatch(new MessagesActions.EditMessage(
        { newMessage, index: this.editIndex }
      ));
      this.store.dispatch(new MessagesActions.SaveMessages());
    }

    this.editMode = false;
    this.messageForm.reset();
  }

  unsubscriber(subscription: Subscription) {
    if (subscription) {
      subscription.unsubscribe();
    }
  }

  ngOnDestroy() {
    this.unsubscriber(this.routeSub);
    this.unsubscriber(this.messagesSub);

    if (this.updateMessagesTimeout) {
      clearTimeout(this.updateMessagesTimeout);
      this.updateMessagesTimeout = null;
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscape() {
    this.location.back();
  }

  @ViewChild('scrollContainer') scrollContainer: ElementRef;
  @ViewChild('textarea') textarea: ElementRef;

  updateMessagesTimeout: any = null;

  ngAfterViewInit() {
    this.scrollTop();
    this.textarea.nativeElement.addEventListener('keydown',
      (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
          this.onSubmit();
        }
      });

    this.updateMessagesTimeout = setTimeout(() => {
      if (this.newMessages.length) {
        const newMessages = JSON.parse(JSON.stringify(this.newMessages));
        newMessages.forEach((message: Message) => {
          let index = this.allMessages.findIndex(messages => {
            return messages.edit === message.edit && messages.fromEmail !== this.privateMail;
          });
          message.unread = false;
          this.store.dispatch(new MessagesActions.EditMessage(
            { newMessage: message, index }
          ));
          this.store.dispatch(new MessagesActions.SaveMessages());
        });
      }
    }, 2000);
  }

  scrollTop() {
    this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
  }

  onEditMessage(index: number) {
    this.editMode = true;
    this.messageForm.setValue({
      message: this.messages[index].text,
    });

    this.editIndex = this.allMessages.findIndex(message => {
      return message.edit === this.messages[index].edit;
    });
  }

  onDeleteMessage(index: number) {
    const deleteIndex = this.allMessages.findIndex(message => {
      return message.edit === this.messages[index].edit;
    });

    this.store.dispatch(new MessagesActions.DeleteMessage(deleteIndex));
  }

  onUserClick(value: boolean) {
    if (value) {
      this.router.navigate(['/profile']);
    } else {
      if (this.friendId >= 0) {
        this.router.navigate([`/users/${this.friendId}`]);
      } else {
        this.router.navigate(['/error']);
      }
    }
  }
}
