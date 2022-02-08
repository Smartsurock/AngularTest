import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromAppReducer from "../store/app.reducer";
import { map, switchMap, take } from "rxjs/operators";
import * as ProfileActions from "./profile-store/profile.actions";
import { of } from "rxjs";
import { Actions, ofType } from "@ngrx/effects";

@Injectable({ providedIn: 'root' })
export class ProfileResolver implements Resolve<any> {
  constructor(
    private store: Store<fromAppReducer.AppState>,
    private actions: Actions,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('profile').pipe(
      take(1),
      map(state => state.profiles),
      switchMap(profiles => {
        if (!profiles.length) {
          this.store.dispatch(new ProfileActions.GetProfiles());
          return this.actions.pipe(
            ofType(ProfileActions.SET_PROFILES),
            take(1),
          );
        } else {
          return of(profiles);
        }
      })
    )
  }
}