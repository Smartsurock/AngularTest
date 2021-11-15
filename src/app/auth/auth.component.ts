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
  constructor(private store: Store<fromAppReducer.AppState>,
  ) { }

  authForm: FormGroup;
  error: string = null;
  loading: boolean = false;
  authSub: Subscription;

  ngOnInit() {
    this.authForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    });

    this.authSub = this.store.select('auth').subscribe(state => {
      this.error = state.error;
      this.loading = state.loading;
    })
  }

  ngOnDestroy() {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }

  authFormValue() {
    const email = this.authForm.value.email;
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
    this.authForm.reset();
  }
}
