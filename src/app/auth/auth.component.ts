import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import * as ProfileActions from '../profile/profile-store/profile.actions';
import { Profile } from '../profile/profile.model';
import * as fromAppReducer from '../store/app.reducer';
import * as AuthActions from './auth-store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  constructor(private store: Store<fromAppReducer.AppState>,
  ) { }

  authForm: FormGroup;
  error: string = null;
  loading: boolean = false;
  authSub: Subscription;
  profileSub: Subscription;
  userId: number;

  ngOnInit() {
    this.authForm = new FormGroup({
      mail: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    });

    this.authSub = this.store.select('auth').subscribe(state => {
      this.error = state.error;
      this.loading = state.loading;
    });

    this.profileSub = this.store.select('profile').subscribe(state => {
      this.userId = state.profiles.length;
    });
  }

  ngOnDestroy() {
    this.unsubscriber(this.authSub);
    this.unsubscriber(this.profileSub);
  }

  unsubscriber(subscribe: Subscription) {
    if (subscribe) {
      subscribe.unsubscribe();
    }
  }

  authFormValue() {
    const email = this.authForm.value.mail;
    const password = this.authForm.value.password;
    return { email, password };
  }

  onLogin() {
    if (this.authForm.invalid) return;
    this.store.dispatch(new AuthActions.LoginStart(this.authFormValue()));
    this.authForm.reset();
  }

  onSignUp() {
    if (this.authForm.invalid) return;
    this.store.dispatch(new AuthActions.SignUpStart(this.authFormValue()));

    // const newProfile = new Profile(this.userId, '', '', '', '', '', '', '', '', '', '', '', '', '');
    // newProfile.privateMail = this.authForm.value.mail;
    // newProfile.imageUrl = 'https://cdn-0.imagensemoldes.com.br/wp-content/uploads/2020/03/Lilo-Stitch-PNG-15-1419x1536.png';

    // this.store.dispatch(new ProfileActions.AddProfile(newProfile));
    // this.store.dispatch(new ProfileActions.SaveProfiles());

    this.authForm.reset();
  }
}
