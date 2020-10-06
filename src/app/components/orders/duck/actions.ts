import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import apiCall from 'app/utils/apiCall'
import { RecipeResource } from 'app/resources/RecipeResource'
import { Params } from 'app/resources/ResourceHelper'
import {
  fetchCall,
  replaceResources,
  fetchCallError,
} from 'app/components/common/reduxForm/duck/actions'
import { OrderResource } from '../../../resources/OrderResource'

export const fetchOrders = (params?: Params) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  dispatch(fetchCall(OrderResource.name))

  return apiCall({
    path: OrderResource.indexUrl(params),
    method: 'GET',
  })
    .then((response) => {
      const { orders, recipes } = response
      // TODO: moving recipes out of orders_controller soon, should move recipes to SWR instead
      dispatch(replaceResources(RecipeResource.name, recipes))
      dispatch(replaceResources(OrderResource.name, orders))
    })
    .catch((error) => {
      console.log(error)
      dispatch(
        fetchCallError(
          OrderResource.name,
          'An error occurred fetching orders. Please try again or contact support'
        )
      )
    })
}
