import { Action } from "@ngrx/store";
import { Profile } from "../profile-model/profile.model";

export const EDIT_MODE = 'EDIT_MODE';
export const EDIT_PROFILE = 'EDIT_PROFILE';
export const SET_PROFILES = 'SET_PROFILES';
export const GET_PROFILES = 'GET_PROFILES';
export const SAVE_PROFILES = 'SAVE_PROFILES';
export const ADD_PROFILE = 'ADD_PROFILE';

export class EditMode implements Action {
  readonly type = EDIT_MODE;

  constructor(public payload: boolean) { }
}

export class EditProfile implements Action {
  readonly type = EDIT_PROFILE;

  constructor(public payload: { newUser: Profile, index: number }) { }
}

export class GetProfiles implements Action {
  readonly type = GET_PROFILES;
}

export class SetProfiles implements Action {
  readonly type = SET_PROFILES;

  constructor(public payload: Profile[]) { }
}

export class SaveProfiles implements Action {
  readonly type = SAVE_PROFILES;
}

export class AddProfile implements Action {
  readonly type = ADD_PROFILE;

  constructor(public payload: Profile) { }
}

export type ProfileActions =
  | SaveProfiles
  | EditMode
  | AddProfile
  | EditProfile
  | GetProfiles
  | SetProfiles;