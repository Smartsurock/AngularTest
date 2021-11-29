import { ActionReducerMap } from "@ngrx/store";
import * as fromAuthReducer from "../auth/auth-store/auth.reducer";
import * as fromPostsReducer from "../posts/posts-store/posts.reducer";
import * as fromProfileReducer from "../profile/profile-store/profile.reducer";
import * as fromMessagesReducer from "../messages/messages-store/messages.reducer";

export interface AppState {
  profile: fromProfileReducer.State;
  auth: fromAuthReducer.State;
  posts: fromPostsReducer.State;
  messages: fromMessagesReducer.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  profile: fromProfileReducer.profileResucer,
  auth: fromAuthReducer.authReducer,
  posts: fromPostsReducer.postsResucer,
  messages: fromMessagesReducer.messagesReducer,
}