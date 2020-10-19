import { mkFormData } from 'app/resources/ResourceHelper'
import apiCall from 'app/utils/apiCall'

export const createCost = (formData: object) => {
  const data = mkFormData(formData)

  return apiCall({
    path: `/procurement/cost`,
    method: 'POST',
    data,
    dataType: 'form',
  })
}
