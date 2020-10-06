import React from 'react'
import AppRoute from 'app/common/AppRoute'
import Login from '../auth/containers/Login'
import Signup from '../auth/containers/Signup'
import Reset from '../auth/containers/Reset'
import RequestReset from '../auth/containers/RequestReset'

const AuthRoutes = () => (
  <>
    <AppRoute path="/login" exact component={Login} />
    <AppRoute path="/signup" exact component={Signup} />
    <AppRoute path="/signup/:email" component={Signup} />
    <AppRoute path="/reset" exact component={Reset} />
    <AppRoute path="/request_reset" exact component={RequestReset} />
  </>
)

export default AuthRoutes
