import { Profile } from "../profile.model";
import * as ProfileActions from "./profile.actions";

export interface State {
  editing: boolean;
  profiles: Profile[];
}

const initialState: State = {
  editing: false,
  profiles: []
}

export function profileResucer(state: State = initialState, action: ProfileActions.ProfileActions) {
  switch (action.type) {
    case ProfileActions.EDIT_MODE:
      return {
        ...state,
        editing: action.payload,
      }

    case ProfileActions.EDIT_PROFILE:
      const editedProfile = {
        ...state.profiles[action.payload.index],
        ...action.payload.newUser
      }
      const editedUsers = [...state.profiles];
      editedUsers[action.payload.index] = editedProfile;
      return {
        ...state,
        profiles: [...editedUsers],
      }

    case ProfileActions.SET_PROFILES:
      return {
        ...state,
        profiles: [...action.payload],
      }

    default: return state;
  }
}