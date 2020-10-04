import axios, { AxiosRequestConfig } from 'axios'

import Config from 'config'

interface APICallConfiguration {
  path: string
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE'
  data?: object
  apiPath?: string
  returnText?: boolean
  dataType?: 'json' | 'form'
  onUploadProgress?: (progress: number) => void
}

const _getHeaders = (dataType: 'json' | 'form'): object => {
  const authToken = localStorage.token
  return {
    ...(authToken !== null && authToken !== undefined
      ? { Authorization: `Bearer ${authToken}` }
      : {}),
    ...{
      'Content-Type':
        dataType === 'json' ? 'application/json' : 'multipart/form-data',
      Accept: 'application/json',
    },
  }
}

const apiCall = async (configuration: APICallConfiguration) => {
  const {
    path,
    method = 'GET',
    data = {},
    apiPath = `${Config.API_SERVER_URL}/api`,
    dataType = 'json',
    onUploadProgress,
  } = configuration

  const headers = _getHeaders(dataType)
  // headers will get set on their own with the right boundary for form-data
  if (headers['Content-Type'] === 'multipart/form-data') {
    delete headers['Content-Type']
  }

  const configs: AxiosRequestConfig = {
    method,
    url: `${apiPath}${path}`,
    headers,
  }

  if (onUploadProgress !== undefined) {
    configs.onUploadProgress = (progressEvent) => {
      const progress = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      )
      onUploadProgress(progress)
    }
  }

  if (method === 'GET') {
    configs.params = data
  } else {
    configs.data = data
  }

  try {
    const response = await axios(configs)

    return response.data
  } catch (error) {
    throw error.response
  }
}

export default apiCall
