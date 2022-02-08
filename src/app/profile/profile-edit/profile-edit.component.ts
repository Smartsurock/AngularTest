import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/posts/post.model';
import * as PostsActions from 'src/app/posts/posts-store/posts.actions';
import * as fromAppReducer from 'src/app/store/app.reducer';
import * as ProfileActions from '../profile-store/profile.actions';
import { Profile } from '../profile-models/profile.model';
import { take } from 'rxjs/operators';
import { Message } from 'src/app/messages/message.model';
import * as MessagesActions from 'src/app/messages/messages-store/messages.actions';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromAppReducer.AppState>,
  ) { }

  userMail: string;
  profile: Profile;
  profileForm: FormGroup;
  index: number;
  posts: Post[];
  postsIndex: number[] = [];
  profileName: string;
  profileImage: string;
  messages: Message[];
  messagesIndex: number[] = [];

  ngOnInit() {
    this.store.select('auth').pipe(take(1)).subscribe(state => {
      if (state.user) {
        this.userMail = state.user.email;
      }
    });

    this.store.select('profile').pipe(take(1)).subscribe(state => {
      this.index = state.profiles.findIndex(profile => {
        return profile.privateMail === this.userMail;
      });
      this.profile = state.profiles[this.index];
    });

    this.profileName = this.profile.name
    this.profileImage = this.profile.imageUrl

    this.initForm();
  }

  ngOnDestroy() {
    this.store.dispatch(new ProfileActions.EditMode(false));
  }

  onSubmit() {
    if (this.profileForm.invalid) return;

    const name = this.profileForm.value.name.trim();
    const newUser = this.profileForm.value;
    newUser.privateMail = this.userMail;
    newUser.id = this.index;
    newUser.name = name;

    this.store.dispatch(new ProfileActions.EditProfile(
      { newUser, index: this.index }
    ));

    //Updating posts and messages
    if (this.profileName !== this.profileForm.value.name
      || this.profileImage !== this.profileForm.value.imageUrl) {
      this.updatePosts();
      this.updateMessages();
    }
    //==================================================

    this.onCancel();
  }

  updatePosts() {
    this.store.select('posts').pipe(take(1)).subscribe(state => {
      const posts = state.posts.filter((post, index) => {
        if (post.userEmail === this.userMail) {
          this.postsIndex.push(index);
        }
        return post.userEmail === this.userMail;
      });
      this.posts = JSON.parse(JSON.stringify(posts));
    });

    this.posts.forEach(post => {
      post.imageUrl = this.profileForm.value.imageUrl;
      post.name = this.profileForm.value.name;
      let index = this.postsIndex.shift();
      this.store.dispatch(new PostsActions.EditPost(
        { index, newPost: post }
      ));
    });
    this.store.dispatch(new PostsActions.SavePosts());
  }

  updateMessages() {
    this.store.select('messages').pipe(take(1)).subscribe(state => {
      const messages = state.messages.filter((message, index) => {
        if (message.fromEmail === this.userMail) {
          this.messagesIndex.push(index);
        }
        return message.fromEmail === this.userMail;
      });
      this.messages = JSON.parse(JSON.stringify(messages));
    });

    this.messages.forEach(message => {
      message.imageUrl = this.profileForm.value.imageUrl;
      message.name = this.profileForm.value.name;
      let index = this.messagesIndex.shift();
      this.store.dispatch(new MessagesActions.EditMessage(
        { newMessage: message, index }
      ));
    });
    this.store.dispatch(new MessagesActions.SaveMessages());
  }

  onCancel() {
    this.router.navigate(['/profile'], { relativeTo: this.route });
    this.store.dispatch(new ProfileActions.EditMode(false));
  }

  initForm() {
    this.profileForm = new FormGroup({
      position: new FormControl(this.profile.position, [Validators.required]),
      name: new FormControl(this.profile.name, [Validators.required]),
      phone: new FormControl(this.profile.phone),
      email: new FormControl(this.profile.email),
      imageUrl: new FormControl(this.profile.imageUrl),
      status: new FormControl(this.profile.status),
      employment: new FormControl(this.profile.employment),
      payment: new FormControl(this.profile.payment),
      wishcity: new FormControl(this.profile.wishcity),
      birthday: new FormControl(this.profile.birthday),
      city: new FormControl(this.profile.city),
      social: new FormControl(this.profile.social),
    });
  }
}