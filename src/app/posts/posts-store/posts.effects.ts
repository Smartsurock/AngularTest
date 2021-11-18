import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, switchMap, withLatestFrom } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import * as fromAppReducer from "src/app/store/app.reducer";
import * as PostActions from "./posts.actions";
import { Store } from "@ngrx/store";

@Injectable()
export class PostEffects {
  constructor(private store: Store<fromAppReducer.AppState>,
    private actions: Actions,
    private http: HttpClient) { }

}