import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { appAnimation } from './app.animation';
import * as AuthActions from './auth/auth-store/auth.actions';
import { BurgerService } from './header/burger.service';
import * as fromAppReducer from './store/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [appAnimation]
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private store: Store<fromAppReducer.AppState>,
    private burgerService: BurgerService) { }

  burger: boolean = false;
  burgerSub: Subscription;

  ngOnInit() {
    this.store.dispatch(new AuthActions.AutoLogin());

    this.burgerSub = this.burgerService.burger.subscribe((value) => {
      this.burger = value;
    })
  }

  ngOnDestroy() {
    this.unsubscriber(this.burgerSub);
  }

  unsubscriber(subscription: Subscription) {
    if (subscription) {
      subscription.unsubscribe();
    }
  }

  routeAnimation(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData
      && outlet.activatedRouteData['animation'];
  }

  @ViewChild('profile') profile: ElementRef;
  @HostListener("document:click", ["$event"]) toggleBtn(event: Event) {
    if (this.profile.nativeElement.contains(event.target)) {
      this.burgerService.toogleBurger(false);
    }
  }
}
