import React from 'react'
import AppRoute, { ProtectionType } from 'app/common/AppRoute'
import OrderCreate from '../orders/containers/OrderCreate'
import OrderIndex from '../orders/containers/OrderIndex'
import { OrderResource } from 'app/orders/resource'

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
