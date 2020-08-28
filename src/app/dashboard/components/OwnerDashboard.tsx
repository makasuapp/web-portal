import React from 'react'
import { User } from 'app/models/user'
import { Link } from 'react-router-dom'

interface Props {
  user: User
}

const OwnerDashboard = (props: Props) => {
  return <div>
    <div><Link to={"/orders"}>Orders</Link></div>
    <div><Link to={"/predicted_orders"}>Predicted Orders</Link></div>
  </div>
}

export default OwnerDashboard