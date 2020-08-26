import './App.css'

import React, { Component } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import AppRoute from './common/AppRoute';
import NotFound from '../NotFound';
import LandingPage from './LandingPage';
import OrderCreate from './orders/containers/OrderCreate';
import OrderIndex from './orders/containers/OrderIndex';
import PredictedOrdersIndex from './predicted_orders/containers/PredictedOrdersIndex';
import PredictedOrdersCreate from './predicted_orders/components/PredictedOrdersCreate';

export default class App extends Component {
  render () {
    return <Router>
      <Switch>
        <AppRoute path='/' exact component={LandingPage} />

        <AppRoute path='/orders' exact component={OrderIndex} resourceNames={["recipe", "order"]} />
        <AppRoute path='/orders/new' exact component={OrderCreate} resourceNames={["recipe", "order"]} />

        <AppRoute path='/predicted_orders' exact component={PredictedOrdersIndex} resourceNames={["predicted_order"]} />
        <AppRoute path='/predicted_orders/new' exact component={PredictedOrdersCreate} resourceNames={["recipe", "predicted_order"]} />
        <AppRoute path='/predicted_orders/:date/edit' exact component={PredictedOrdersCreate} resourceNames={["recipe", "predicted_order"]} />

        <AppRoute component={NotFound} />
      </Switch>
    </Router>
  }
}
