import {AnyAction} from "redux";
import {ThunkDispatch} from "redux-thunk";
import apiCall from "app/utils/apiCall";
import {fetchCall, replaceResources, fetchCallError} from '../../common/duck/actions';
import {OrderResource} from '../resource'
import { RecipeResource } from "app/recipes/resource";

export const fetchOrders = (kitchenId: number, showAll: boolean) => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(fetchCall(OrderResource.name))

    return apiCall({
      path: OrderResource.indexUrl({env: "dev", kitchen_id: kitchenId, all: showAll}),
      method: "GET",
    }).then((response) => {
      const {orders, recipes} = response
      dispatch(replaceResources(RecipeResource.name, recipes))
      dispatch(replaceResources(OrderResource.name, orders))
    }).catch((error) => {
      console.log(error)
      dispatch(fetchCallError(OrderResource.name, "An error occurred fetching orders. Please try again or contact support"))
    })
  }
}