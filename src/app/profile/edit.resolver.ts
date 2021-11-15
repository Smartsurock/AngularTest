import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromAppReducer from "../store/app.reducer";
import { map, switchMap, take } from "rxjs/operators";
import * as ProfileActions from "./profile-store/profile.actions";
import { of } from "rxjs";

@Injectable({ providedIn: 'root' })
export class EditResolver implements Resolve<any> {
  constructor(private store: Store<fromAppReducer.AppState>) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('profile').pipe(
      take(1),
      map(recipesState => recipesState.editing),
      switchMap(editing => {
        if (!editing) {
          this.store.dispatch(new ProfileActions.EditMode(true));
          return of(editing);
        } else {
          return of(editing);
        }
      })
    )
  }
}