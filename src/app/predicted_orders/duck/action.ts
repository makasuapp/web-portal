import {AnyAction} from "redux";
import {ThunkDispatch} from "redux-thunk";
import apiCall from "app/utils/apiCall";
import {replaceResources, makeApiCall, apiCallError} from '../../common/duck/actions';
import {PredictedOrderResource} from '../resource'
import { mkFormData } from "app/common/ResourceHelper";
import { PredictedOrdersFormData } from "../containers/PredictedOrdersForm";

export const editPredictedOrders = (formData: PredictedOrdersFormData) => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(makeApiCall(PredictedOrderResource.name));

    const data = mkFormData(formData);

    return apiCall({
      path: '/predicted_orders/for_date',
      method: "POST",
      data,
      dataType: 'form',
    }).then((response) => {
      dispatch(replaceResources(PredictedOrderResource.name, response))
    }).catch((error) => {
      console.log(error)
      dispatch(apiCallError(PredictedOrderResource.name, "error editing predicted orders"));
    })
  }
}