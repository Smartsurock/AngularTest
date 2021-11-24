import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
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
  private authSub: Subscription;
  time: Date;
  timer: Observable<number> = null;

  @Output() burger = new EventEmitter<any>();
  burgerIcon: boolean = false;

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

    this.burgerService.burgerIcon.subscribe((value: boolean) => {
      this.burgerIcon = value;
    });
  }

  ngOnDestroy() {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }

  onBurgerMenu() {
    this.burger.emit();
    this.burgerService.toogleBurger(!this.burgerIcon);
  }
}
