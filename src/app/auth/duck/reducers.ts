import * as types from './types';

import {Token, UserState, Kitchen} from "app/models/user";

import {AuthActionTypes} from "./types";

export interface AuthState {
  isAuthenticating: boolean,
  currentUser: UserState,
  currentKitchen?: Kitchen,
  token: Token | null,
  errors: string[]
}

const initialState: AuthState = {
  isAuthenticating: false,
  currentUser: null,
  currentKitchen: undefined,
  token: null,
  errors: []
};

const AuthReducer = (state = initialState, action: AuthActionTypes): AuthState => {
  switch (action.type) {
    case types.AUTHENTICATION_REQUEST:
      return {
        ...state,
        isAuthenticating: true
      };

    case types.AUTHENTICATION_SUCCESS:
      return {
        ...state,
        isAuthenticating: false,
        currentUser: action.user,
        token: action.token 
      };

    case types.RESET_SUCCESS:
      return {
        ...state,
        isAuthenticating: false,
      };

    case types.AUTHENTICATION_FAILURE:
      return {
        isAuthenticating: false,
        currentUser: null,
        currentKitchen: undefined,
        token: null,
        errors: action.errors || []
      };

    case types.LOGOUT:
      return {
        isAuthenticating: false,
        currentUser: null,
        currentKitchen: undefined,
        token: null,
        errors: []
      };

    case types.SET_KITCHEN:
      return {
        ...state,
        currentKitchen: action.kitchen
      }

    default:
      return state
  }
};

export default AuthReducer;