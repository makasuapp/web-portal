import './App.css'

import React, { Component } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import Routes from './routes'
import AppRoute from 'app/common/AppRoute'
import NotFound from '../NotFound'

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Routes />
          <AppRoute component={NotFound} />
        </Switch>
      </Router>
    )
  }
}
