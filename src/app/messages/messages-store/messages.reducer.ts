import { Message } from "../message.model";
import * as MessagesActions from "./messages.actions";

export interface State {
  messages: Message[];
}

const initialState: State = {
  messages: []
}

export function messagesReducer(state: State = initialState, action: MessagesActions.MessagesActions) {
  switch (action.type) {
    case MessagesActions.SEND_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload]
      }

    case MessagesActions.SET_MESSAGES:
      return {
        ...state,
        messages: [...action.payload]
      }

    case MessagesActions.DELETE_MESSAGE:
      return {
        ...state,
        messages: state.messages.filter((message, index) => {
          return index !== action.payload;
        })
      }

    case MessagesActions.EDIT_MESSAGE:
      const editedMessage = {
        ...state.messages[action.payload.index],
        ...action.payload.newMessage
      }
      const editedMessages = [...state.messages];
      editedMessages[action.payload.index] = editedMessage;
      return {
        ...state,
        messages: [...editedMessages]
      }

    default: return state;
  }
}