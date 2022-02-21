import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Post } from './post.model';
import * as fromAppReducer from '../store/app.reducer';
import * as PostActions from './posts-store/posts.actions';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(private store: Store<fromAppReducer.AppState>) { }

  postForm: FormGroup;
  posts: Post[];
  userEmail: string;
  imageUrl: string;
  userName: string;
  postSub: Subscription;
  authSub: Subscription;
  profileSub: Subscription;

  @ViewChild('scrollContainer') scrollContainer: ElementRef;
  @ViewChild('textarea') textarea: ElementRef;

  ngOnInit() {
    this.postForm = new FormGroup({
      post: new FormControl(null, Validators.required),
    });

    this.postSub = this.store.select('posts').subscribe(state => {
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
      this.userName = state.profiles[index].name;
    });
  }

  ngAfterViewInit() {
    this.scrollTop();
    this.textarea.nativeElement.addEventListener('keydown',
      (event: KeyboardEvent) => {
        if (event.key === 'Enter' && !event.shiftKey) {
          this.onSubmit();
        }
      });
  }

  scrollTop() {
    this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
  }

  ngOnDestroy() {
    this.unsubscriber(this.postSub);
    this.unsubscriber(this.authSub);
    this.unsubscriber(this.profileSub);
  }

  unsubscriber(subscription: Subscription) {
    if (subscription) subscription.unsubscribe();
  }

  onSubmit() {
    this.store.dispatch(new PostActions.AddPost(
      new Post(this.userName, this.postForm.value.post.trim(), this.imageUrl, this.userEmail)
    ));
    this.postForm.reset();
    setTimeout(() => {
      this.scrollTop();
    }, 0);
  }

  onDelete(index: number) {
    this.store.dispatch(new PostActions.DeletePost(index));
  }
}
