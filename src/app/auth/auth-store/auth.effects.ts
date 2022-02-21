import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import * as AuthActions from "./auth.actions";
import { User } from "../user.model"
import { of } from "rxjs";
import { LogoutService } from "../logout.service";
import { Router } from "@angular/router";

export interface AuthResponsData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

function handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  const user = new User(email, userId, token, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));

  return new AuthActions.AuthSuccess({
    email, userId, token, expirationDate, redirect: true
  })
}

function handleError(response: any) {
  let errorMessage = "Непонятный еррор!";

  if (!response.error || !response.error.error) {
    return of(new AuthActions.AuthFail(errorMessage));
  }

  switch (response.error.error.message) {
    case 'EMAIL_EXISTS': errorMessage = "Это мыло уже занято!";
      break;
    case 'OPERATION_NOT_ALLOWED': errorMessage = "Регистрация не завершена, обратитесь через несколько лет!";
      break;
    case 'TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.': errorMessage = "Хз чё ты тут наклацал, придёться подождать... недельку...!";
      break;
    case 'EMAIL_NOT_FOUND': errorMessage = "Нет такого мыла!";
      break;
    case 'INVALID_PASSWORD': errorMessage = "Инвалидный пароль!";
      break;
    case 'USER_DISABLED': errorMessage = "Админ тебя кикнул нахуй!";
      break;
    default: errorMessage;
  }

  return of(new AuthActions.AuthFail(errorMessage));
}

@Injectable()
export class AuthEffects {
  constructor(private actions: Actions,
    private http: HttpClient,
    private logoutService: LogoutService,
    private router: Router) { }

  @Effect()
  authSignUp = this.actions.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((signUpAction: AuthActions.SignUpStart) => {
      return this.http.post<AuthResponsData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIkey}`, {
        email: signUpAction.payload.email,
        password: signUpAction.payload.password,
        returnSecureToken: true
      }).pipe(
        tap(response => {
          this.logoutService.setLogoutTimer(+response.expiresIn * 1000);
        }),
        map(response => {
          return handleAuthentication(response.email, response.localId, response.idToken, +response.expiresIn);
        }),
        catchError(response => {
          return handleError(response);
        })
      )
    })
  );

  @Effect()
  authLogin = this.actions.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((loginAction: AuthActions.LoginStart) => {
      return this.http.post<AuthResponsData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIkey}`, {
        email: loginAction.payload.email,
        password: loginAction.payload.password,
        returnSecureToken: true
      }).pipe(
        tap(response => {
          this.logoutService.setLogoutTimer(+response.expiresIn * 1000);
        }),
        map(response => {
          return handleAuthentication(response.email, response.localId, response.idToken, +response.expiresIn);
        }),
        catchError(response => {
          return handleError(response);
        })
      )
    })
  );

  @Effect({ dispatch: false })
  authRedirect = this.actions.pipe(
    ofType(AuthActions.AUTH_SUCCESS),
    tap((authSuccessAction: AuthActions.AuthSuccess) => {
      if (authSuccessAction.payload.redirect) {
        this.router.navigate(['/profile']);
      }
    })
  )

  @Effect({ dispatch: false })
  logout = this.actions.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      this.router.navigate(['/login']);
      localStorage.removeItem('userData');
      this.logoutService.clearLogoutTimer();
    })
  )

  @Effect()
  autoLogin = this.actions.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate: Date;
      } = JSON.parse((localStorage.getItem('userData')!));

      if (!userData) {
        return { type: "Invalid Action" };
      }

      const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

      if (loadedUser.checkToken) {
        const expirationDate = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.logoutService.setLogoutTimer(expirationDate);

        return new AuthActions.AuthSuccess({
          email: loadedUser.email,
          userId: loadedUser.id,
          token: loadedUser._token,
          expirationDate: loadedUser._tokenExpirationDate,
        });
      }

      return { type: "Invalid Action" };
    })
  )
}