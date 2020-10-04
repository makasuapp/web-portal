
import { AnyAction, Store } from 'redux'
import {
  SignupRequestData,
  Token,
  User,
  UserResponse,
  Kitchen,
} from 'app/models/user'

import { ThunkDispatch } from 'redux-thunk'
import apiCall from 'app/utils/apiCall'
import { AuthActionTypes } from './types'
import * as types from './types'
import { LoginFormValues } from '../containers/LoginForm'
import { ResetFormValues } from '../containers/ResetForm'

const authRequest = (): AuthActionTypes => ({
    type: types.AUTHENTICATION_REQUEST,
  })

const authSuccess = (
  user: User,
  token: Token,
  newAuth = true
): AuthActionTypes => ({
    type: types.AUTHENTICATION_SUCCESS,
    user,
    token,
    newAuth,
  })

const resetSuccess = (): AuthActionTypes => ({
    type: types.RESET_SUCCESS,
  })

const authFailure = (errors: string[]): AuthActionTypes => ({
    type: types.AUTHENTICATION_FAILURE,
    errors,
  })

export const _setKitchen = (kitchen: Kitchen): AuthActionTypes => ({
    type: types.SET_KITCHEN,
    kitchen,
  })

export const setKitchen = (kitchen: Kitchen) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    localStorage.setItem('kitchen', JSON.stringify(kitchen))
    dispatch(_setKitchen(kitchen))
  }

const _setUser = (
  response: UserResponse,
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  newAuth = true
) => {
  const { token, user } = response
  localStorage.setItem('token', token)
  localStorage.setItem('user', JSON.stringify(user))

  dispatch(authSuccess(user, token, newAuth))
}

export const signup = (data: SignupRequestData) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(authRequest())

    return apiCall({
      path: '/users',
      method: 'POST',
      data,
    })
      .then((response: UserResponse) => {
        _setUser(response, dispatch)
      })
      .catch((error) => {
        if (error && error.data && Array.isArray(error.data)) {
          dispatch(authFailure(error.data))
        } else {
          dispatch(
            authFailure([
              'An error has occurred, please try again or contact support',
            ])
          )
          throw error
        }
      })
  }

export const setUser = (response: UserResponse) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    _setUser(response, dispatch)
  }

export const authenticate = (credentials: LoginFormValues) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(authRequest())

    return apiCall({
      path: '/users/login',
      method: 'POST',
      data: {
        auth: credentials,
      },
    })
      .then((response: UserResponse) => {
        _setUser(response, dispatch)
      })
      .catch((error) => {
        localStorage.clear()
        if (error && error.data && Array.isArray(error.data)) {
          dispatch(authFailure(error.data))
        } else {
          dispatch(
            authFailure([
              'An error has occurred, please try again or contact support',
            ])
          )
          throw error
        }
      })
  }

export const logout = () => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    localStorage.clear()
    return dispatch({
      type: types.LOGOUT,
    })
  }

export const verifyCredentials = async (store: Store) => {
  const savedToken = localStorage.getItem('token')
  const savedUserStr = localStorage.getItem('user')
  const savedKitchenStr = localStorage.getItem('kitchen')

  if (savedToken !== null && savedUserStr !== null) {
    // assume this one is valid for the meantime
    try {
      const savedUser: User = JSON.parse(savedUserStr)
      store.dispatch(authSuccess(savedUser, savedToken, false))
      if (savedKitchenStr !== null) {
        store.dispatch(_setKitchen(JSON.parse(savedKitchenStr)))
      }

      // verify this is actually the case
      await apiCall({
        path: '/users/verify',
        method: 'POST',
        data: {
          user: savedUser.id,
        },
      })
        .then((response: UserResponse) => {
          // updated versions
          _setUser(response, store.dispatch, false)

          // TODO: if user doesn't have access anymore to kitchen, revoke kitchen and redirect to select
        })
        .catch((errors) => {
          logout()(store.dispatch)
        })
    } catch (err) {
      logout()(store.dispatch)
      throw err
    }
  } else {
    logout()(store.dispatch)
  }
}

export const resetPassword = (token: string, form: ResetFormValues) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(authRequest())

    return apiCall({
      path: '/users/reset_password',
      method: 'POST',
      data: {
        auth: form,
        token,
      },
    })
      .then(() => {
        dispatch(resetSuccess())
      })
      .catch((error: any) => {
        localStorage.clear()
        if (error && error.data) {
          dispatch(authFailure(error.data))
        } else {
          dispatch(
            authFailure([
              'An error has occurred, please try again or contact support',
            ])
          )
          throw error
        }
      })
  }

export const requestReset = (email: string) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(authRequest())

    return apiCall({
      path: '/users/request_reset',
      method: 'POST',
      data: {
        email,
      },
    })
      .then(() => {
        dispatch(resetSuccess())
      })
      .catch((error: any) => {
        localStorage.clear()
        if (error && error.data) {
          dispatch(authFailure(error.data))
        } else {
          dispatch(
            authFailure([
              'An error has occurred, please try again or contact support',
            ])
          )
          throw error
        }
      })
  }
