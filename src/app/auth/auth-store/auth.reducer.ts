import { User } from "../user.model";
import * as AuthActions from "./auth.actions";

export interface State {
  user: User;
  error: string;
  loading: boolean;
}

const initialState = {
  user: null,
  error: null,
  loading: false,
}

export function authReducer(
  state: State = initialState,
  action: AuthActions.AuthActions) {
  switch (action.type) {
    case AuthActions.AUTH_SUCCESS:
      const user = new User(action.payload.email, action.payload.userId, action.payload.token, action.payload.expirationDate);
      return {
        ...state,
        user: user,
        loading: false,
      }

    case AuthActions.LOGIN_START:
    case AuthActions.SIGNUP_START:
      return {
        ...state,
        loading: true,
      }

    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
      }

    case AuthActions.AUTH_FAIL:
      return {
        ...state,
        user: null,
        error: action.payload,
        loading: false,
      }

    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      }

    default: return state;
  }
}