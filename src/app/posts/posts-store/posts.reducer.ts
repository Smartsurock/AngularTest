import { Post } from "../post.model";
import * as PostActions from "./posts.actions";

export interface State {
  posts: Post[];
}

const initialState: State = {
  posts: [new Post('sadasdasdasdasd  sadasdasdasdasd ', 'https://cdn-0.imagensemoldes.com.br/wp-content/uploads/2020/03/Lilo-Stitch-PNG-15-1419x1536.png', 'sadasdasdasdasd'),]
}

export function postResucer(state: State = initialState, action: PostActions.PostActions) {
  switch (action.type) {
    case PostActions.ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      }

    default: return state;
  }
}