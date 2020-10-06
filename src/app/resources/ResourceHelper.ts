import { RouteComponentProps } from 'react-router-dom'

export type ID = string | number

const pluralize = (name: string) => `${name}s`

const capitalize = (name: string) =>
  name.charAt(0).toUpperCase() + name.slice(1)

export const idFromUrl = (props: RouteComponentProps<{ id: string }>) =>
  parseInt(props.match.params.id, 10)

export interface ResourceRecord {
  id: ID
}

export type Params = { [key: string]: any }
export const paramStr = (params?: Params): string =>
  params && Object.keys(params).length > 0
    ? `?${Object.keys(params)
        .map((key) => `${key}=${params[key]}`)
        .join('&')}`
    : ''

export interface Resource {
  name: string
  capital: string
  plural: string
  pluralCapital: string
  createUrl: string
  indexUrl: (params?: Params) => string
  showUrl: (id: ID, params?: Params) => string
  editUrl: (id: ID) => string
  newPath: string
  indexPath: string
  showPath: (id: ID) => string
  editPath: (id: ID) => string
}

export const mkResource = (name: string, overrides: any = {}): Resource => {
  const plural = overrides.plural || pluralize(name)
  return {
    name,
    capital: overrides.capital || capitalize(name),
    plural,
    pluralCapital: overrides.pluralCapital || capitalize(plural),
    createUrl: overrides.createUrl || `/${plural}`,
    indexUrl: (params?: Params) =>
      (overrides.indexUrl && overrides.indexUrl(params)) ||
      `/${plural}${paramStr(params)}`,
    showUrl: (id: ID, params?: Params) =>
      (overrides.showUrl && overrides.showUrl(id, params)) ||
      `/${plural}/${id}${paramStr(params)}`,
    editUrl: (id: ID) =>
      (overrides.editUrl && overrides.editUrl(id)) || `/${plural}/${id}`,
    newPath: overrides.newPath || `/${plural}/new`,
    indexPath: overrides.indexPath || `/${plural}`,
    showPath: (id: ID) =>
      (overrides.showPath && overrides.showPath(id)) || `/${plural}/${id}`,
    editPath: (id: ID) =>
      (overrides.editPath && overrides.editPath(id)) || `/${plural}/${id}/edit`,
  }
}

export const defaultError =
  'An error has occurred. Please try again or contact support'

const appendFormData = (
  data: FormData,
  formData: object,
  dataKey: string,
  formDataKey: string
) => {
  const nested = formData[formDataKey]
  if (typeof nested === 'object' && !(nested instanceof File)) {
    Object.keys(nested).forEach((nestedKey) => {
      appendFormData(data, nested, `${dataKey}[${nestedKey}]`, nestedKey)
    })
  } else if (nested !== undefined) {
    data.append(dataKey, nested)
  }
}

export const mkFormData = (formData: object) => {
  const data = new FormData()

  Object.keys(formData).forEach((key) => {
    appendFormData(data, formData, key, key)
  })

  return data
}
