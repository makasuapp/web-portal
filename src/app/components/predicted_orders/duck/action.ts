import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import apiCall from 'app/utils/apiCall'
import { mkFormData } from 'app/resources/ResourceHelper'
import {
  replaceResources,
  makeApiCall,
  apiCallError,
} from 'app/components/common/reduxForm/duck/actions'
import { PredictedOrderResource } from '../../../resources/PredictedOrderResource'
import { PredictedOrdersFormData } from '../containers/PredictedOrdersForm'

export const editPredictedOrders = (formData: PredictedOrdersFormData) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  dispatch(makeApiCall(PredictedOrderResource.name))

  const data = mkFormData(formData)

  return apiCall({
    path: '/predicted_orders/for_date',
    method: 'POST',
    data,
    dataType: 'form',
  })
    .then((response) => {
      dispatch(replaceResources(PredictedOrderResource.name, response))
    })
    .catch((error) => {
      console.log(error)
      dispatch(
        apiCallError(
          PredictedOrderResource.name,
          'error editing predicted orders'
        )
      )
    })
}
