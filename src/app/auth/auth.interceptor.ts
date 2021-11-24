import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core"
import { Store } from "@ngrx/store";
import { exhaustMap, take } from "rxjs/operators";
import * as fromAppReducer from "../store/app.reducer";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromAppReducer.AppState>) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return this.store.select('auth').pipe(
      take(1),
      exhaustMap(state => {
        if (!state.user) {
          return next.handle(request);
        }
        const modifiedRequest = request.clone({
          params: new HttpParams().set('auth', state.user._token)
        });
        return next.handle(modifiedRequest);
      })
    );
  }
}