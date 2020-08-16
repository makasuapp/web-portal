import * as types from './types';

import {ResourceActionTypes} from "./types";

import { ResourceRecord } from '../ResourceHelper';

export interface ApiReducerState {
  [key: string]: ResourceReducerState
}

export const ApiReducer = (state = {}, action: ResourceActionTypes): ApiReducerState => {
  if (action.meta && action.meta.resourceName) {
    const prevState = state[action.meta.resourceName]
    const newState = ResourceReducer(prevState, action)
    return Object.assign({}, state, {
      [action.meta.resourceName]: newState
    })
  } else {
    return state
  }
}

export interface ResourceReducerState {
  isLoading: boolean
  hasFetched: boolean
  isFetching: boolean
  error: string | undefined
  data: ResourceRecord[],
  byId: {[key: number]: ResourceRecord}
}

const resourceInitialState: ResourceReducerState = {
  hasFetched: false,
  isFetching: false,
  isLoading: false,
  error: undefined,
  data: [],
  byId: {}
}

export const ResourceReducer = (state = resourceInitialState, action: ResourceActionTypes): ResourceReducerState => {
  switch (action.type) {
    case types.MAKE_API_CALL: {
      return {
        ...state,
        isLoading: true,
        error: undefined
      }
    }

    case types.FETCH_CALL: {
      return {
        ...state,
        isFetching: true,
        error: undefined
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
        hasFetched: true,
        error: undefined,
        data: action.resources,
        byId
      }
    }

    case types.ADD_RESOURCE: {
      const byId = Object.assign({}, state.byId, {
        [action.resource.id]: action.resource
      })
      return {
        ...state,
        isLoading: false,
        error: undefined,
        data: state.data.concat(action.resource),
        byId
      }
    }

    case types.UPDATE_RESOURCE: {
      let data
      if (state.byId[action.id] !== undefined) {
        data = state.data.map((d) => d.id === action.id ? action.resource : d)
      } else {
        data = state.data.concat(action.resource)
      }
      const byId = Object.assign({}, state.byId, {
        [action.id]: action.resource
      })
      return {
        ...state,
        isFetching: false,
        isLoading: false,
        error: undefined,
        data,
        byId
      }
    }

    case types.API_CALL_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }

    case types.FETCH_CALL_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }

    default:
      return state
  }
}
