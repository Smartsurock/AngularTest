import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromAppReducer from "../store/app.reducer";
import * as AuthActions from "./auth-store/auth.actions";

@Injectable({ providedIn: 'root' })
export class LogoutService {
  constructor(private store: Store<fromAppReducer.AppState>) { }

  tokenValidDuration: any = null;

  setLogoutTimer(expiration: number) {
    this.tokenValidDuration = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout());
    }, expiration);
  }

  clearLogoutTimer() {
    if (this.tokenValidDuration) {
      clearTimeout(this.tokenValidDuration);
    }
    this.tokenValidDuration = null;
  }
}