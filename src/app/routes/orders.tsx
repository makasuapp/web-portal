import React from 'react'
import AppRoute, { ProtectionType } from 'app/components/common/AppRoute'
import OrderCreate from '../components/orders/containers/OrderCreate'
import OrderIndex from '../components/orders/containers/OrderIndex'
import { Switch } from 'react-router-dom'
import { OrderResource } from 'app/resources/OrderResource'

const OrdersRoutes = () => (
  <Switch>
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
  </Switch>
)

export default OrdersRoutes
