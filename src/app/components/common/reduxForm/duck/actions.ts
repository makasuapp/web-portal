import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import apiCall from 'app/utils/apiCall'
import {
  Resource,
  ResourceRecord,
  defaultError,
  mkFormData,
  Params,
  ID,
} from 'app/resources/ResourceHelper'
import * as types from './types'

export const makeApiCall = (
  resourceName: string
): types.ResourceActionTypes => ({
  type: types.MAKE_API_CALL,
  meta: {
    resourceName,
  },
})

export const addResource = (
  resourceName: string,
  resource: ResourceRecord
): types.ResourceActionTypes => ({
  type: types.ADD_RESOURCE,
  meta: {
    resourceName,
  },
  resource,
})

export const updateResource = (
  resourceName: string,
  id: ID,
  resource: ResourceRecord
): types.ResourceActionTypes => ({
  type: types.UPDATE_RESOURCE,
  meta: {
    resourceName,
  },
  id,
  resource,
})

export const apiCallError = (
  resourceName: string,
  error: string
): types.ResourceActionTypes => ({
  type: types.API_CALL_ERROR,
  meta: {
    resourceName,
  },
  error,
})
export const fetchCall = (resourceName: string): types.ResourceActionTypes => ({
  type: types.FETCH_CALL,
  meta: {
    resourceName,
  },
})

export const fetchCallError = (
  resourceName: string,
  error: string
): types.ResourceActionTypes => ({
  type: types.FETCH_CALL_ERROR,
  meta: {
    resourceName,
  },
  error,
})

export const replaceResources = (
  resourceName: string,
  resources: ResourceRecord[]
): types.ResourceActionTypes => ({
  type: types.REPLACE_RESOURCES,
  meta: {
    resourceName,
  },
  resources,
})

export const registerResource = (
  resourceName: string
): types.ResourceActionTypes => ({
  type: types.REGISTER_RESOURCE,
  meta: {
    resourceName,
  },
})

export const resetResource = (
  resourceName: string
): types.ResourceActionTypes => ({
  type: types.RESET_RESOURCE,
  meta: {
    resourceName,
  },
})

export const fetch = (
  resource: Resource,
  params?: Params,
  responseKey?: string
) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  dispatch(fetchCall(resource.name))

  return apiCall({
    path: resource.indexUrl(params),
    method: 'GET',
  })
    .then((response) => {
      if (responseKey) {
        dispatch(replaceResources(resource.name, response[responseKey]))
      } else {
        dispatch(replaceResources(resource.name, response))
      }
    })
    .catch((error) => {
      console.log(error)
      dispatch(fetchCallError(resource.name, defaultError))
    })
}

export const show = (resource: Resource, id: ID) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  dispatch(fetchCall(resource.name))

  return apiCall({
    path: resource.showUrl(id),
    method: 'GET',
  })
    .then((response) => {
      dispatch(updateResource(resource.name, id, response))
    })
    .catch((error) => {
      console.log(error)
      dispatch(apiCallError(resource.name, defaultError))
    })
}

export const create = (resource: Resource, formData: object) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  dispatch(makeApiCall(resource.name))

  const data = mkFormData(formData)

  return apiCall({
    path: resource.createUrl,
    method: 'POST',
    data,
    dataType: 'form',
  })
    .then((response) => {
      dispatch(addResource(resource.name, response))
    })
    .catch((error) => {
      console.log(error)
      dispatch(apiCallError(resource.name, defaultError))
    })
}

export const edit = (resource: Resource, id: ID, formData: object) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  dispatch(makeApiCall(resource.name))

  const data = mkFormData(formData)

  return apiCall({
    path: resource.editUrl(id),
    method: 'PATCH',
    data,
    dataType: 'form',
  })
    .then((response) => {
      dispatch(updateResource(resource.name, id, response))
    })
    .catch((error) => {
      console.log(error)
      dispatch(apiCallError(resource.name, defaultError))
    })
}
