import { ResourceRecord } from '../ResourceHelper'

export type ID = string | number

export const REGISTER_RESOURCE = 'REGISTER_RESOURCE'
interface RegisterResourceAction {
  type: typeof REGISTER_RESOURCE
  meta: {
    resourceName: string
  }
}

export const MAKE_API_CALL = 'MAKE_API_CALL'
interface MakeApiCallAction {
  type: typeof MAKE_API_CALL
  meta: {
    resourceName: string
  }
}

export const ADD_RESOURCE = 'ADD_RESOURCE'
interface AddResourceAction {
  type: typeof ADD_RESOURCE
  meta: {
    resourceName: string
  }
  resource: ResourceRecord
}

export const UPDATE_RESOURCE = 'UPDATE_RESOURCE'
interface UpdateResourceAction {
  type: typeof UPDATE_RESOURCE
  meta: {
    resourceName: string
  }
  id: ID
  resource: ResourceRecord
}

export const API_CALL_ERROR = 'API_CALL_ERROR'
interface ApiCallErrorAction {
  type: typeof API_CALL_ERROR
  meta: {
    resourceName: string
  }
  error: string
}

export const FETCH_CALL = 'FETCH_CALL'
interface FetchCallAction {
  type: typeof FETCH_CALL
  meta: {
    resourceName: string
  }
}

export const REPLACE_RESOURCES = 'REPLACE_RESOURCES'
interface ReplaceResourcesAction {
  type: typeof REPLACE_RESOURCES
  meta: {
    resourceName: string
  }
  resources: ResourceRecord[]
}

export const FETCH_CALL_ERROR = 'FETCH_CALL_ERROR'
interface FetchCallErrorAction {
  type: typeof FETCH_CALL_ERROR
  meta: {
    resourceName: string
  }
  error: string
}

export const RESET_RESOURCE = 'RESET_RESOURCE'
interface ResetResourceAction {
  type: typeof RESET_RESOURCE
  meta: {
    resourceName: string
  }
}

export type ResourceActionTypes =
  | MakeApiCallAction
  | AddResourceAction
  | ApiCallErrorAction
  | RegisterResourceAction
  | FetchCallAction
  | ReplaceResourcesAction
  | FetchCallErrorAction
  | UpdateResourceAction
  | ResetResourceAction
