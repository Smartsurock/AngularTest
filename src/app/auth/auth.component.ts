import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromAppReducer from '../store/app.reducer';
import * as AuthActions from './auth-store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  constructor(private store: Store<fromAppReducer.AppState>) { }

  authForm: FormGroup;
  authSub: Subscription;
  loading: boolean = false;
  error: string | null = null;

  ngOnInit() {
    this.authForm = new FormGroup({
      mail: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    });

    this.authSub = this.store.select('auth').subscribe(state => {
      this.error = state.error;
      this.loading = state.loading;
    });
  }

  ngOnDestroy() {
    this.unsubscriber(this.authSub);
  }

  unsubscriber(subscription: Subscription) {
    if (subscription) {
      subscription.unsubscribe();
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
  }

  onSignUp() {
    if (this.authForm.invalid) return;
    this.store.dispatch(new AuthActions.SignUpStart(this.authFormValue()));
  }
}
