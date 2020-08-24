import React from 'react'
import { Link } from 'react-router-dom'

export default class LandingPage extends React.Component {
  render() {
    return <div>
      <div><Link to={"/orders"}>Orders</Link></div>
      <div><Link to={"/predicted_orders"}>Predicted Orders</Link></div>
    </div>
  }
}