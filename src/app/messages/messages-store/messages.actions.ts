import { Action } from "@ngrx/store";
import { Message } from "../message.model";

export const SEND_MESSAGE = 'SEND_MESSAGE';
export const GET_MESSAGES = 'GET_MESSAGES';
export const SET_MESSAGES = 'SET_MESSAGES';
export const EDIT_MESSAGE = 'EDIT_MESSAGE';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';
export const SAVE_MESSAGES = 'SAVE_MESSAGES';

export class SendMessage implements Action {
  readonly type = SEND_MESSAGE;

  constructor(public payload: Message) { }
}

export class GetMessages implements Action {
  readonly type = GET_MESSAGES;
}

export class SetMessages implements Action {
  readonly type = SET_MESSAGES;

  constructor(public payload: Message[]) { }
}

export class EditMessage implements Action {
  readonly type = EDIT_MESSAGE;

  constructor(public payload: { newMessage: Message, index: number }) { }
}

export class DeleteMessage implements Action {
  readonly type = DELETE_MESSAGE;

  constructor(public payload: number) { }
}

export class SaveMessages implements Action {
  readonly type = SAVE_MESSAGES;
}

export type MessagesActions =
  | GetMessages
  | SetMessages
  | SaveMessages
  | EditMessage
  | DeleteMessage
  | SendMessage;