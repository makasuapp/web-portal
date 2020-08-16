import { RouteComponentProps } from "react-router-dom"

const pluralize = (name: string) => {
  return `${name}s`
}

const capitalize = (name: string) => {
  return name.charAt(0).toUpperCase() + name.slice(1)
}

export const idFromUrl = (props: RouteComponentProps<{id: string}>) => {
  return parseInt(props.match.params.id, 10)
}

export interface ResourceRecord {
  id: number
}

export interface Resource {
  name: string
  capital: string
  plural: string
  pluralCapital: string
  createUrl: string
  indexUrl: string
  showUrl: (id: number) => string
  editUrl: (id: number) => string
  newPath: string
  indexPath: string
  showPath: (id: number) => string
  editPath: (id: number) => string
}

export const mkResource = (name: string, overrides: any = {}): Resource => {
  const plural = overrides.plural || pluralize(name)
  return {
    name,
    capital: capitalize(name),
    plural,
    pluralCapital: capitalize(plural),
    createUrl: overrides.createUrl || `/${plural}`,
    indexUrl: overrides.indexUrl || `/${plural}`,
    showUrl: (id: number)  => (overrides.showUrl && overrides.showUrl(id)) || `/${plural}/${id}`,
    editUrl: (id: number)  => (overrides.editUrl && overrides.editUrl(id)) || `/${plural}/${id}`,
    newPath: overrides.newPath || `/${plural}/new`,
    indexPath: overrides.indexPath || `/${plural}`,
    showPath: (id: number)  => (overrides.showPath && overrides.showPath(id)) || `/${plural}/${id}`,
    editPath: (id: number)  => (overrides.editPath && overrides.editPath(id)) || `/${plural}/${id}/edit`,
  }
}

export const defaultError = "An error has occurred. Please try again or contact support"

export const mkFormData = (formData: object) => {
  const data = new FormData()
  for (let key in formData) {
    appendFormData(data, formData, key, key)
  }

  return data;
}

const appendFormData = (data: FormData, formData: object, dataKey: string, formDataKey: string) => {
  const nested = formData[formDataKey]
  if (typeof nested === "object" && !(nested instanceof File)) {
    for (let nestedKey in nested) {
      appendFormData(data, nested, `${dataKey}[${nestedKey}]`, nestedKey)
    }
  } else if (nested !== undefined) {
    data.append(dataKey, nested);
  }
}