import React from 'react'
import AppRoute, { ProtectionType } from 'app/components/common/AppRoute'
import PredictedOrdersIndex from '../components/predicted_orders/containers/PredictedOrdersIndex'
import PredictedOrdersCreate from '../components/predicted_orders/containers/PredictedOrdersCreate'
import PredictedOrdersEdit from '../components/predicted_orders/containers/PredictedOrdersEdit'
import { PredictedOrderResource } from 'app/resources/PredictedOrderResource'

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
