import './App.css'

import React, { Component } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import AppRoute from './common/AppRoute';
import NotFound from '../NotFound';
import LandingPage from './LandingPage';

export default class App extends Component {
  render () {
    return <Router>
      <Switch>
        <AppRoute path='/' exact component={LandingPage} />
        <AppRoute component={NotFound} />
      </Switch>
    </Router>
  }
}
