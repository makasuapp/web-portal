import apiCall from 'app/utils/apiCall'

import { toast } from 'react-toastify'
import {
  defaultError,
  mkFormData,
  Resource,
} from 'app/resources/ResourceHelper'

export const create = (
  resource: Resource,
  formData: object,
  onCreate: (response) => void
) => {
  const data = mkFormData(formData)

  return apiCall({
    path: resource.createUrl,
    method: 'POST',
    data,
    dataType: 'form',
  })
    .then((response) => onCreate(response))
    .catch((error) => {
      // better way to handle errors?
      console.log(error)
      toast.error(defaultError)
    })
}
