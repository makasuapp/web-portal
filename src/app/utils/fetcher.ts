import axios, { AxiosRequestConfig } from 'axios'
import Config from 'config'
import { getHeaders } from './apiCall'

export const fetcher = (path: string) => {
  const apiPath = `${Config.API_SERVER_URL}/api`
  const headers = getHeaders('json')

  const configs: AxiosRequestConfig = {
    method: 'GET',
    url: `${apiPath}${path}`,
    headers,
  }

  return axios(configs).then((res) => res.data)
}
