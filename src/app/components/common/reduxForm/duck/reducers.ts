import {
  SetKitchenAction,
  AuthSuccessAction,
  SET_KITCHEN,
  AUTHENTICATION_SUCCESS,
} from 'app/components/auth/duck/types'
import { ResourceRecord } from 'app/resources/ResourceHelper'
import * as types from './types'

import { resetResource } from './actions'

export interface ResourceReducerState {
  isLoading: boolean
  hasFetched: boolean
  isFetching: boolean
  error: string | undefined
  data: ResourceRecord[]
  byId: { [key: number]: ResourceRecord }
}

const resourceInitialState: ResourceReducerState = {
  hasFetched: false,
  isFetching: false,
  isLoading: false,
  error: undefined,
  data: [],
  byId: {},
}

export const ResourceReducer = (
  state = resourceInitialState,
  action: types.ResourceActionTypes
): ResourceReducerState => {
  switch (action.type) {
    case types.MAKE_API_CALL: {
      return {
        ...state,
        isLoading: true,
        error: undefined,
      }
    }

    case types.FETCH_CALL: {
      return {
        ...state,
        isFetching: true,
        error: undefined,
      }
    }

    case types.REPLACE_RESOURCES: {
      const byId = {}
      action.resources.forEach((object) => {
        byId[object.id] = object
      })

      return {
        ...state,
        isFetching: false,
        isLoading: false,
        hasFetched: true,
        error: undefined,
        data: action.resources,
        byId,
      }
    }

    case types.ADD_RESOURCE: {
      const byId = { ...state.byId, [action.resource.id]: action.resource }
      return {
        ...state,
        isLoading: false,
        isFetching: false,
        error: undefined,
        data: state.data.concat(action.resource),
        byId,
      }
    }

    case types.UPDATE_RESOURCE: {
      let data
      if (state.byId[action.id] !== undefined) {
        data = state.data.map((d) => (d.id === action.id ? action.resource : d))
      } else {
        data = state.data.concat(action.resource)
      }
      const byId = { ...state.byId, [action.id]: action.resource }
      return {
        ...state,
        isFetching: false,
        isLoading: false,
        error: undefined,
        data,
        byId,
      }
    }

    case types.API_CALL_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }

    case types.FETCH_CALL_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }

    case types.RESET_RESOURCE:
      return resourceInitialState

    default:
      return state
  }
}

export interface ApiReducerState {
  [key: string]: ResourceReducerState
}

export const ApiReducer = (
  state: ApiReducerState = {},
  action: types.ResourceActionTypes | SetKitchenAction | AuthSuccessAction
): ApiReducerState => {
  // reset all the resources if we change kitchens or re-auth
  if (
    action.type === SET_KITCHEN ||
    (action.type === AUTHENTICATION_SUCCESS && action.newAuth)
  ) {
    return Object.entries(state).reduce((newState, [key, resourceState]) => {
      newState[key] = ResourceReducer(resourceState, resetResource(key))
      return newState
    }, {})
  }
  if (action.type === AUTHENTICATION_SUCCESS) {
    return state
  }
  if (action.meta && action.meta.resourceName) {
    const prevState = state[action.meta.resourceName]
    const newState = ResourceReducer(prevState, action)
    return { ...state, [action.meta.resourceName]: newState }
  }
  return state
}
