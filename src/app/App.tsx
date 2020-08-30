import './App.css'

import React, { Component } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import AppRoute, {ProtectionType} from './common/AppRoute';
import NotFound from '../NotFound';
import LandingPage from './dashboard/containers/LandingPage';
import OrderCreate from './orders/containers/OrderCreate';
import OrderIndex from './orders/containers/OrderIndex';
import PredictedOrdersIndex from './predicted_orders/containers/PredictedOrdersIndex';
import PredictedOrdersCreate from './predicted_orders/containers/PredictedOrdersCreate';
import PredictedOrdersEdit from './predicted_orders/containers/PredictedOrdersEdit';
import Login from './auth/containers/Login';
import Signup from './auth/containers/Signup';
import Reset from './auth/containers/Reset';
import RequestReset from './auth/containers/RequestReset';
import LaunchPage from './dashboard/containers/LaunchPage';

export default class App extends Component {
  render () {
    return <Router>
      <Switch>
        <AppRoute path='/' exact component={LandingPage} />
        <AppRoute path='/launch' exact component={LaunchPage} />

        <AppRoute path='/orders' exact component={OrderIndex} 
          resourceNames={["recipe", "order"]} protection={ProtectionType.Authenticated} />
        <AppRoute path='/orders/new' exact component={OrderCreate} 
          resourceNames={["recipe", "order"]} protection={ProtectionType.Owner} />

        <AppRoute path='/predicted_orders' exact component={PredictedOrdersIndex} 
          resourceNames={["predicted_order"]} protection={ProtectionType.Owner} />
        <AppRoute path='/predicted_orders/new' exact component={PredictedOrdersCreate} 
          resourceNames={["recipe", "predicted_order"]} protection={ProtectionType.Owner} />
        <AppRoute path='/predicted_orders/:date/edit' exact component={PredictedOrdersEdit} 
          resourceNames={["recipe", "predicted_order"]} protection={ProtectionType.Owner} />

        <AppRoute path="/login" exact component={Login} />
        <AppRoute path="/signup" exact component={Signup} />
        <AppRoute path="/signup/:email" component={Signup} />
        <AppRoute path="/reset" exact component={Reset} />
        <AppRoute path="/request_reset" exact component={RequestReset} />

        <AppRoute component={NotFound} />
      </Switch>
    </Router>
  }
}
