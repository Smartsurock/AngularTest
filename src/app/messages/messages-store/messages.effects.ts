import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, switchMap, withLatestFrom } from "rxjs/operators";
import * as fromAppReducer from "src/app/store/app.reducer";
import { Message } from "../message.model";
import * as MessagesActions from "./messages.actions";

@Injectable()
export class MessagesEffects {
  constructor(private actions: Actions,
    private store: Store<fromAppReducer.AppState>,
    private http: HttpClient) { }

  @Effect()
  getMessages = this.actions.pipe(
    ofType(MessagesActions.GET_MESSAGES),
    switchMap(() => {
      return this.http.get<Message[]>('https://profile-877f9-default-rtdb.europe-west1.firebasedatabase.app/messages.json')
    }),
    map(messages => {
      if (messages) {
        return messages;
      } else {
        return [];
      }
    }),
    map((messages: Message[]) => {
      return new MessagesActions.SetMessages(messages);
    })
  );

  @Effect({ dispatch: false })
  saveMessages = this.actions.pipe(
    ofType(MessagesActions.SEND_MESSAGE, MessagesActions.EDIT_MESSAGE, MessagesActions.DELETE_MESSAGE),
    withLatestFrom(this.store.select('messages')),
    switchMap(([action, state]) => {
      return this.http.put<Message[]>('https://profile-877f9-default-rtdb.europe-west1.firebasedatabase.app/messages.json', state.messages);
    })
  );
}