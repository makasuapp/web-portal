import {AnyAction} from "redux";
import {ThunkDispatch} from "redux-thunk";
import apiCall from "app/utils/apiCall";
import {fetchCall, replaceResources, fetchCallError} from '../../common/duck/actions';
import {OrderResource} from '../resource'

export const fetchOrders = (kitchenId: number) => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(fetchCall(OrderResource.name))

    return apiCall({
      path: `${OrderResource.indexUrl}?env=dev&kitchen_id=${kitchenId}`,
      method: "GET",
    }).then((response) => {
      dispatch(replaceResources(OrderResource.name, response.orders))
    }).catch((error) => {
      console.log(error)
      dispatch(fetchCallError(OrderResource.name, "An error occurred fetching orders. Please try again or contact support"))
    })
  }
}