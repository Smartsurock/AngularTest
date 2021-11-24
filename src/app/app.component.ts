import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
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
export class AppComponent implements OnInit {
  constructor(private store: Store<fromAppReducer.AppState>,
    private burgerService: BurgerService) { }

  burger: boolean = false;

  ngOnInit() {
    this.store.dispatch(new AuthActions.AutoLogin());
  }

  routeAnimation(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData
      && outlet.activatedRouteData['animation'];
  }

  openBurgerMenu() {
    this.burger = !this.burger;
  }

  closeBurgerMenu() {
    setTimeout(() => {
      this.burger = !this.burger;
    }, 300)
  }

  @ViewChild('profile') profile: ElementRef;
  @HostListener("document:click", ["$event"]) toggleBtn(event: Event) {
    if (this.profile.nativeElement.contains(event.target)) {
      this.burger = false;
      this.burgerService.toogleBurger(false);
    }
  }
}
