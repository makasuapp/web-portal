import {Token, User, Kitchen} from "app/models/user";

export const AUTHENTICATION_REQUEST = "AUTHENTICATION_REQUEST";
interface AuthRequestAction {
  type: typeof AUTHENTICATION_REQUEST,
}

export const AUTHENTICATION_SUCCESS = "AUTHENTICATION_SUCCESS";
export interface AuthSuccessAction {
  type: typeof AUTHENTICATION_SUCCESS,
  user: User,
  token: Token,
  newAuth: boolean
}

export const RESET_SUCCESS = "RESET_SUCCESS";
interface ResetSuccessAction {
  type: typeof RESET_SUCCESS,
}

export const AUTHENTICATION_FAILURE = "AUTHENTICATION_FAILURE";
interface AuthFailureAction {
  type: typeof AUTHENTICATION_FAILURE,
  errors: string[]
}

export const LOGOUT = "LOGOUT";
export interface LogoutAction {
  type: typeof LOGOUT,
}

export const SET_KITCHEN = "SET_KITCHEN";
export interface SetKitchenAction {
  type: typeof SET_KITCHEN,
  kitchen: Kitchen
}

export type AuthActionTypes = AuthRequestAction | AuthSuccessAction | AuthFailureAction | 
  LogoutAction | ResetSuccessAction | SetKitchenAction
