import React from 'react'
import { User } from 'app/models/user'
import { Link } from 'react-router-dom'

interface Props {
  user: User
}

const UserDashboard = (props: Props) => {
  return <div>
    <div><Link to={"/orders"}>Orders</Link></div>
  </div>
}

export default UserDashboard