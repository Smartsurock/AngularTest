import { Action } from "@ngrx/store";
import { Post } from "../post.model";

export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const EDIT_POST = 'EDIT_POST';

export class AddPost implements Action {
  readonly type = ADD_POST;

  constructor(public payload: Post) { }
}

export class DeletePost implements Action {
  readonly type = ADD_POST;

  constructor(public payload: Post) { }
}

export class EditPost implements Action {
  readonly type = ADD_POST;

  constructor(public payload: Post) { }
}

export type PostActions =
  | EditPost
  | DeletePost
  | AddPost;