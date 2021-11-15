import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, switchMap, withLatestFrom } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import * as fromAppReducer from "src/app/store/app.reducer";
import * as ProfileActions from "./profile.actions";
import { Profile } from "../profile.model";
import { Store } from "@ngrx/store";

@Injectable()
export class ProfileEffects {
  constructor(private store: Store<fromAppReducer.AppState>,
    private actions: Actions,
    private http: HttpClient) { }

  @Effect()
  getProfiles = this.actions.pipe(
    ofType(ProfileActions.GET_PROFILES),
    switchMap(() => {
      return this.http.get<Profile[]>('https://profile-877f9-default-rtdb.europe-west1.firebasedatabase.app/profile.json')
    }), map((profiles: Profile[]) => {
      return new ProfileActions.SetProfiles(profiles);
    })
  );

  @Effect({ dispatch: false })
  putProfile = this.actions.pipe(
    ofType(ProfileActions.SAVE_PROFILES),
    withLatestFrom(this.store.select('profile')),
    switchMap(([action, state]) => {
      return this.http.put<Profile>('https://profile-877f9-default-rtdb.europe-west1.firebasedatabase.app/profile.json', state.profiles);
    })
  );
}