import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, switchMap, withLatestFrom } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import * as fromAppReducer from "src/app/store/app.reducer";
import * as PostsActions from "./posts.actions";
import { Store } from "@ngrx/store";
import { Post } from "../post.model";

@Injectable()
export class PostsEffects {
  constructor(
    private store: Store<fromAppReducer.AppState>,
    private actions: Actions,
    private http: HttpClient,
  ) { }

  @Effect()
  getPosts = this.actions.pipe(
    ofType(PostsActions.GET_POSTS),
    switchMap(() => {
      return this.http.get<Post[]>('https://profile-877f9-default-rtdb.europe-west1.firebasedatabase.app/posts.json')
    }),
    map(posts => {
      if (posts) {
        return posts;
      } else {
        return [];
      }
    }),
    map((posts: Post[]) => {
      return new PostsActions.SetPosts(posts);
    })
  );

  @Effect({ dispatch: false })
  savePosts = this.actions.pipe(
    ofType(PostsActions.ADD_POST, PostsActions.DELETE_POST,
      PostsActions.SAVE_POSTS),
    withLatestFrom(this.store.select('posts')),
    switchMap(([action, state]) => {
      return this.http.put<Post[]>('https://profile-877f9-default-rtdb.europe-west1.firebasedatabase.app/posts.json', state.posts);
    })
  );
}