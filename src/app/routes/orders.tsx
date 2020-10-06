import React from 'react'
import AppRoute, { ProtectionType } from 'app/components/common/AppRoute'
import OrderCreate from '../components/orders/containers/OrderCreate'
import OrderIndex from '../components/orders/containers/OrderIndex'
import { OrderResource } from 'app/resources/OrderResource'

const OrderRoutes = () => (
  <>
    <AppRoute
      path={OrderResource.indexPath}
      exact
      component={OrderIndex}
      resourceNames={['recipe', 'order']}
      protection={ProtectionType.Authenticated}
    />
    <AppRoute
      path={OrderResource.newPath}
      exact
      component={OrderCreate}
      resourceNames={['recipe', 'order']}
      protection={ProtectionType.Owner}
    />
  </>
)

export default OrderRoutes
