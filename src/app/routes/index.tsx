import React from 'react'
import AppRoute from 'app/components/common/AppRoute'
import LandingPage from '../components/dashboard/containers/LandingPage'
import OrderRoutes from './orders'
import AppLaunchPage from '../components/dashboard/containers/AppLaunchPage'
import PredictedOrderRoutes from './predicted_orders'
import RecipeRoutes from './recipes'
import AuthRoutes from './auth'
import VendorRoutes from './vendors'

const Routes = () => (
  <>
    <AppRoute path="/" exact component={LandingPage} />
    <AppRoute path="/auth" exact component={AppLaunchPage} />

    <AuthRoutes />
    <OrderRoutes />
    <PredictedOrderRoutes />
    <RecipeRoutes />
    <VendorRoutes />
  </>
)

export default Routes
