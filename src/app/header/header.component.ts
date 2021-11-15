import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as AuthActions from '../auth/auth-store/auth.actions';
import * as fromAppReducer from '../store/app.reducer';
import { headerAnimation } from './header.animation';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [headerAnimation]
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private store: Store<fromAppReducer.AppState>) { }

  isLoged = false;
  private userSub: Subscription;
  name: string;

  ngOnInit() {
    this.userSub = this.store.select('auth').subscribe(state => {
      this.isLoged = !!state.user;
      if (state.user) {
        this.name = state.user.email;
      } else {
        this.name = null;
      }
    });
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }
}
