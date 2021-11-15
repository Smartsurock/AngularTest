import { Action } from "@ngrx/store";

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const LOGIN_START = 'LOGIN_START';
export const SIGNUP_START = 'SIGNUP_START';
export const LOGOUT = 'LOGOUT';
export const AUTO_LOGIN = 'AUTO_LOGIN';
export const CLEAR_ERROR = 'CLEAR_ERROR';

export class AuthSuccess implements Action {
  readonly type = AUTH_SUCCESS;

  constructor(public payload: {
    email: string,
    userId: string,
    token: string,
    expirationDate: Date,
    redirect?: boolean,
  }) { }
}

export class AuthFail implements Action {
  readonly type = AUTH_FAIL;

  constructor(public payload: string) { }
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(public payload: { email: string, password: string }) { }
}

export class SignUpStart implements Action {
  readonly type = SIGNUP_START;

  constructor(public payload: { email: string, password: string }) { }
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export type AuthActions =
  | LoginStart
  | Logout
  | ClearError
  | AuthFail
  | AutoLogin
  | SignUpStart
  | AuthSuccess;