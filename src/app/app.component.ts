import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { appAnimation } from './app.animation';
import * as AuthActions from './auth/auth-store/auth.actions';
import * as fromAppReducer from './store/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [appAnimation]
})
export class AppComponent implements OnInit {
  constructor(private store: Store<fromAppReducer.AppState>) { }
  ngOnInit() {
    this.store.dispatch(new AuthActions.AutoLogin())
  }

  routeAnimation(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData
      && outlet.activatedRouteData['animation'];
  }
}
