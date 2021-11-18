import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { switchMap, take } from "rxjs/operators";
import * as fromAppReducer from "../store/app.reducer";
import * as PostsActions from "./posts-store/posts.actions";

@Injectable({ providedIn: 'root' })
export class PostsResolver implements Resolve<any> {
  constructor(private store: Store<fromAppReducer.AppState>,
    private actions: Actions) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('posts').pipe(
      take(1),
      switchMap(state => {
        if (!state.posts.length) {
          this.store.dispatch(new PostsActions.GetPosts())
          return this.actions.pipe(
            ofType(PostsActions.SET_POSTS),
            take(1)
          )
        } else {
          return state.posts;
        }
      })
    )
  }
}