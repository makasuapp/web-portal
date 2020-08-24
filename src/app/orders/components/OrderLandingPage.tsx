import React from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import styles from './OrderLandingPage.module.css'
import OrderListContainer from '../containers/OrderListContainer'

export default class OrderLandingPage extends React.Component {
  render() {
    return <div>
      <div className={styles.top}>
        <Link 
          className={classnames(styles.createButton, "btn btn-primary")}
          to={"/orders/new"}>
            New Order
        </Link>
      </div>

      <OrderListContainer />
    </div>
  }
}