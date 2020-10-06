import React from 'react'
import AppRoute, { ProtectionType } from 'app/common/AppRoute'
import PredictedOrdersIndex from '../predicted_orders/containers/PredictedOrdersIndex'
import PredictedOrdersCreate from '../predicted_orders/containers/PredictedOrdersCreate'
import PredictedOrdersEdit from '../predicted_orders/containers/PredictedOrdersEdit'
import { PredictedOrderResource } from 'app/predicted_orders/resource'

const PredictedOrderRoutes = () => (
  <>
    <AppRoute
      path={PredictedOrderResource.indexPath}
      exact
      component={PredictedOrdersIndex}
      resourceNames={['predicted_order']}
      protection={ProtectionType.Owner}
    />
    <AppRoute
      path={PredictedOrderResource.newPath}
      exact
      component={PredictedOrdersCreate}
      resourceNames={['recipe', 'predicted_order']}
      protection={ProtectionType.Owner}
    />
    <AppRoute
      path="/predicted_orders/:date/edit"
      exact
      component={PredictedOrdersEdit}
      resourceNames={['recipe', 'predicted_order']}
      protection={ProtectionType.Owner}
    />
  </>
)

export default PredictedOrderRoutes
