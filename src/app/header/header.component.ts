import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscriber, Subscription } from 'rxjs';
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
  time: Date;
  timer: Observable<number>;

  ngOnInit() {
    this.userSub = this.store.select('auth').subscribe(state => {
      this.isLoged = !!state.user;
      if (state.user) {
        this.time = state.user._tokenExpirationDate;
      }
    });
    this.timer = new Observable<number>((observer: Subscriber<number>) => {
      setInterval(() => {
        return observer.next(this.time.getTime() - new Date().getTime());
      }, 1000);
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
