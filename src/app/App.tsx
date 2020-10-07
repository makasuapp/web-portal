import './App.css'

import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AppRoute from 'app/components/common/AppRoute'
import NotFound from '../NotFound'
import LandingPage from './components/dashboard/containers/LandingPage'
import AppLaunchPage from './components/dashboard/containers/AppLaunchPage'
import Login from './components/auth/containers/Login'
import Signup from './components/auth/containers/Signup'
import Reset from './components/auth/containers/Reset'
import RequestReset from './components/auth/containers/RequestReset'
import IngredientsRoutes from './routes/ingredients'
import OrdersRoutes from './routes/orders'
import PredictedOrdersRoutes from './routes/predicted_orders'
import RecipeRoutes from './routes/recipes'
import VendorsRoutes from './routes/vendors'

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <AppRoute path="/" exact component={LandingPage} />
          <AppRoute path="/auth" exact component={AppLaunchPage} />

          <AppRoute path="/login" exact component={Login} />
          <AppRoute path="/signup" exact component={Signup} />
          <AppRoute path="/signup/:email" component={Signup} />
          <AppRoute path="/reset" exact component={Reset} />
          <AppRoute path="/request_reset" exact component={RequestReset} />

          <Route path="/orders">
            <OrdersRoutes />
          </Route>

          <Route path="/recipes">
            <RecipeRoutes />
          </Route>

          <Route path="/ingredients">
            <IngredientsRoutes />
          </Route>

          <Route path="/predicted_orders">
            <PredictedOrdersRoutes />
          </Route>

          <Route path="/vendors">
            <VendorsRoutes />
          </Route>

          <AppRoute component={NotFound} />
        </Switch>
      </Router>
    )
  }
}
