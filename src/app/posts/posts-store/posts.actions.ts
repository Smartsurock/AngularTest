import { Action } from "@ngrx/store";
import { Post } from "../post.model";

export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const START_EDIT = 'START_EDIT';
export const STOP_EDIT = 'STOP_EDIT';
export const EDIT_POST = 'EDIT_POST';
export const SAVE_POSTS = 'SAVE_POSTS';
export const GET_POSTS = 'GET_POSTS';
export const SET_POSTS = 'SET_POSTS';

export class AddPost implements Action {
  readonly type = ADD_POST;

  constructor(public payload: Post) { }
}

export class DeletePost implements Action {
  readonly type = DELETE_POST;

  constructor(public payload: number) { }
}

export class StartEdit implements Action {
  readonly type = START_EDIT;

  constructor(public payload: number) { }
}

export class StopEdit implements Action {
  readonly type = STOP_EDIT;
}

export class EditPost implements Action {
  readonly type = EDIT_POST;

  constructor(public payload: { index: number, newPost: Post }) { }
}

export class GetPosts implements Action {
  readonly type = GET_POSTS;
}

export class SetPosts implements Action {
  readonly type = SET_POSTS;

  constructor(public payload: Post[]) { }
}

export class SavePosts implements Action {
  readonly type = SAVE_POSTS;

  constructor(public payload: Post[]) { }
}

export type PostsActions =
  | EditPost
  | DeletePost
  | StartEdit
  | StopEdit
  | SavePosts
  | GetPosts
  | SetPosts
  | AddPost;