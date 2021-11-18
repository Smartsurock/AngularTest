import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromAppReducer from '../store/app.reducer';
import { Post } from './post.model';
import * as PostActions from './posts-store/posts.actions';
import { postsAnimation } from './posts.animation';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  animations: [postsAnimation]
})
export class PostsComponent implements OnInit, OnDestroy {
  constructor(private store: Store<fromAppReducer.AppState>) { }

  postForm: FormGroup;
  posts: Post[];
  userEmail: string;
  imageUrl: string;
  postSub: Subscription;
  authSub: Subscription;
  profileSub: Subscription;

  anim = "anim";

  ngOnInit() {
    this.postForm = new FormGroup({
      post: new FormControl(null, Validators.required),
    });

    this.postSub = this.store.select('post').subscribe(state => {
      this.posts = state.posts;
    });

    this.authSub = this.store.select('auth').subscribe(state => {
      if (state.user) {
        this.userEmail = state.user.email;
      }
    });

    this.profileSub = this.store.select('profile').subscribe(state => {
      let index = state.profiles.findIndex(profile => {
        return profile.privateMail === this.userEmail;
      });
      this.imageUrl = state.profiles[index].imageUrl;
    });
  }

  ngOnDestroy() {
    this.unsubscriber(this.postSub);
    this.unsubscriber(this.authSub);
    this.unsubscriber(this.profileSub);
  }

  unsubscriber(subscription: Subscription) {
    if (subscription) {
      subscription.unsubscribe();
    }
  }

  onSubmit() {
    this.store.dispatch(new PostActions.AddPost(
      new Post(this.postForm.value.post, this.imageUrl, this.userEmail)
    ));
    // this.postForm.reset();
  }
}
