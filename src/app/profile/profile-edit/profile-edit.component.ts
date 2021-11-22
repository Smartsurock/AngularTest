import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/posts/post.model';
import * as PostsActions from 'src/app/posts/posts-store/posts.actions';
import * as fromAppReducer from 'src/app/store/app.reducer';
import * as ProfileActions from '../profile-store/profile.actions';
import { Profile } from '../profile-models/profile.model';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit, OnDestroy {
  constructor(private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromAppReducer.AppState>) { }

  profile: Profile;
  profileForm: FormGroup;
  private userMail: string;
  index: number;

  profileSub: Subscription;
  authSub: Subscription;
  postsSub: Subscription;

  posts: Post[];
  postsIndex: number[] = [];

  profileName: string;
  profileImage: string;

  ngOnInit() {
    this.authSub = this.store.select('auth').subscribe(state => {
      if (state.user) {
        this.userMail = state.user.email;
      }
    });

    this.profileSub = this.store.select('profile').subscribe(state => {
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
    this.unsubscriber(this.profileSub);
    this.unsubscriber(this.authSub);
    this.unsubscriber(this.postsSub);
  }

  unsubscriber(subscribe: Subscription) {
    if (subscribe) {
      subscribe.unsubscribe();
    }
  }

  onSubmit() {
    if (this.profileForm.invalid) return;

    const newUser = this.profileForm.value;
    newUser.privateMail = this.userMail;
    newUser.id = this.index;

    this.store.dispatch(new ProfileActions.EditProfile(
      { newUser: newUser, index: this.index }
    ));

    //Updating posts =========
    if (this.profileName !== this.profileForm.value.name || this.profileImage !== this.profileForm.value.imageUrl) {
      this.postsSub = this.store.select('posts').subscribe(state => {
        let posts = state.posts.filter((post, index) => {
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
        setTimeout(() => {
          this.store.dispatch(
            new PostsActions.EditPost({ index, newPost: post })
          )
        }, 0)
      });
    }
    //=========================

    this.onCancel();
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
