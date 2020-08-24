import './App.css'

import React, { Component } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import AppRoute from './common/AppRoute';
import NotFound from '../NotFound';
import LandingPage from './LandingPage';
import OrderCreate from './orders/containers/OrderCreate';
import OrderLandingPage from './orders/components/OrderLandingPage';
import PredictedOrderLandingPage from './predicted_orders/components/PredictedOrderLandingPage';

export default class App extends Component {
  render () {
    return <Router>
      <Switch>
        <AppRoute path='/' exact component={LandingPage} />

        <AppRoute path='/orders' exact component={OrderLandingPage} resourceNames={["recipe", "order"]} />
        <AppRoute path='/orders/new' exact component={OrderCreate} resourceNames={["recipe", "order"]} />

        <AppRoute path='/predicted_orders' exact component={PredictedOrderLandingPage} resourceNames={["predicted_order"]} />
        <AppRoute path='/predicted_orders/new' exact component={OrderCreate} resourceNames={["predicted_order"]} />

        <AppRoute component={NotFound} />
      </Switch>
    </Router>
  }
}
