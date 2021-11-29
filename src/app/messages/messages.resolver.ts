import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { switchMap, take } from "rxjs/operators";
import * as fromAppReducer from "../store/app.reducer";
import * as MessagesActions from "./messages-store/messages.actions";

@Injectable({ providedIn: 'root' })
export class MessagesResolver implements Resolve<any>{
  constructor(private store: Store<fromAppReducer.AppState>,
    private actions: Actions) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('messages').pipe(
      take(1),
      switchMap(state => {
        if (!state.messages.length) {
          this.store.dispatch(new MessagesActions.GetMessages());
          return this.actions.pipe(
            ofType(MessagesActions.SET_MESSAGES),
            take(1)
          )
        } else {
          return state.messages;
        }
      })
    );
  }
}