import React from 'react'
import { User, Kitchen } from 'app/models/user'
import { Link } from 'react-router-dom'
import styles from './Dashboards.module.css'
import { VendorResource } from 'app/vendors/resource'
import { RecipeResource } from 'app/recipes/resource'
import { OrderResource } from 'app/orders/resource'
import { PredictedOrderResource } from 'app/predicted_orders/resource'

interface Props {
  user: User
  kitchen: Kitchen
}

const AccessLink = ({ accessLink }: { accessLink: String }) => {
  //nice to have: on hover show clipboard icon, on click copy to clipboard + alert
  return <pre className={styles.accessLink}>{accessLink}</pre>
}

const Shared = (props: Props) => {
  const accessLink = props.kitchen.access_link

  return (
    <>
      <h1>Kitchen: {props.kitchen.name}</h1>
      {accessLink ? (
        <div>
          <span>Link to view this kitchen in the app:</span>{' '}
          {<AccessLink accessLink={accessLink} />}
        </div>
      ) : null}
      <br />
      <div>
        <Link to={OrderResource.indexPath}>Orders</Link>
      </div>
      <div>
        <Link to={RecipeResource.indexPath}>Recipes</Link>
      </div>
      <div>
        <Link to={VendorResource.indexPath}>Vendors</Link>
      </div>
    </>
  )
}

export const OwnerDashboard = (props: Props) => {
  return (
    <div>
      <Shared {...props} />
      <div>
        <Link to={PredictedOrderResource.indexPath}>Expected Orders</Link>
      </div>
    </div>
  )
}

export const UserDashboard = (props: Props) => {
  return (
    <div>
      <Shared {...props} />
    </div>
  )
}
