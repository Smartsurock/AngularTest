import { Post } from "../post.model";
import * as PostsActions from "./posts.actions";

export interface State {
  posts: Post[];
}

const initialState: State = {
  posts: []
}

export function postsResucer(state: State = initialState, action: PostsActions.PostsActions) {
  switch (action.type) {
    case PostsActions.ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      }

    case PostsActions.EDIT_POST:
      const editedPost = {
        ...state.posts[action.payload.index],
        ...action.payload.newPost
      }
      const editedPosts = [...state.posts];
      editedPosts[action.payload.index] = editedPost;
      return {
        ...state,
        posts: [...editedPosts],
      }

    case PostsActions.SET_POSTS:
      return {
        ...state,
        posts: [...action.payload],
      }

    case PostsActions.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post, index) => {
          return index !== action.payload;
        }),
      }

    default: return state;
  }
}