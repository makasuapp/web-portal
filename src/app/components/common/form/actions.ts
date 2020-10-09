import apiCall from 'app/utils/apiCall'

import { ID, mkFormData, Resource } from 'app/resources/ResourceHelper'

export const create = (resource: Resource, formData: object) => {
  const data = mkFormData(formData)

  return apiCall({
    path: resource.createUrl,
    method: 'POST',
    data,
    dataType: 'form',
  })
}

export const edit = (id: ID, resource: Resource, formData: object) => {
  const data = mkFormData(formData)

  return apiCall({
    path: resource.editUrl(id),
    method: 'PATCH',
    data,
    dataType: 'form',
  })
}
