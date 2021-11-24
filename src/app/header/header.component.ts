import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscriber, Subscription } from 'rxjs';
import * as AuthActions from '../auth/auth-store/auth.actions';
import * as fromAppReducer from '../store/app.reducer';
import { BurgerService } from './burger.service';
import { headerAnimation } from './header.animation';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [headerAnimation]
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private store: Store<fromAppReducer.AppState>,
    private burgerService: BurgerService) { }

  isLoged = false;
  authSub: Subscription;
  burgerSub: Subscription;
  time: Date;
  timer: Observable<number> = null;
  burger: boolean = false;

  ngOnInit() {
    this.authSub = this.store.select('auth').subscribe(state => {
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

    this.burgerSub = this.burgerService.burger.subscribe((value: boolean) => {
      this.burger = value;
    });
  }

  ngOnDestroy() {
    this.unsubscriber(this.authSub);
    this.unsubscriber(this.burgerSub);
  }

  unsubscriber(subscription: Subscription) {
    if (subscription) {
      subscription.unsubscribe();
    }
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
    this.burgerService.toogleBurger(false);
  }

  onBurgerMenu() {
    this.burgerService.toogleBurger(!this.burger);
  }
}
