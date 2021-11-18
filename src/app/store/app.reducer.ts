import { ActionReducerMap } from "@ngrx/store";
import * as fromAuthReducer from "../auth/auth-store/auth.reducer";
import * as fromPostReducer from "../posts/posts-store/posts.reducer";
import * as fromProfileReducer from "../profile/profile-store/profile.reducer";

export interface AppState {
  profile: fromProfileReducer.State;
  auth: fromAuthReducer.State;
  posts: fromPostReducer.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  profile: fromProfileReducer.profileResucer,
  auth: fromAuthReducer.authReducer,
  posts: fromPostReducer.postsResucer,
}