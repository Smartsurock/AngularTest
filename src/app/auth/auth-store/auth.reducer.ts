import { User } from "../user.model";
import * as AuthActions from "./auth.actions";

export interface State {
  user: User | null;
  error: string | null;
  loading: boolean;
  logged: boolean;
}

const initialState: State = {
  user: null,
  error: null,
  loading: false,
  logged: false,
}

export function authReducer(state: State = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case AuthActions.AUTH_SUCCESS:
      const user = new User(action.payload.email, action.payload.userId, action.payload.token, action.payload.expirationDate);
      return {
        ...state,
        user: user,
        error: null,
        loading: false,
        logged: true
      }

    case AuthActions.LOGIN_START:
    case AuthActions.SIGNUP_START:
      return {
        ...state,
        error: null,
        loading: true,
      }

    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
        logged: false
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