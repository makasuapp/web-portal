import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { FaEdit } from 'react-icons/fa'
import classnames from 'classnames'
import moment from 'moment'

import { PredictedOrder } from 'app/models/predicted_order'
import { ResourceRecord } from 'app/common/ResourceHelper'
import styles from './PredictedOrderList.module.css'
import { displayDateTimeFormat, paramsDateFormat } from 'app/common/DateHelper'

interface OuterProps {
  data?: ResourceRecord[]
}

const PredictedOrderList = ({ data = [] }: OuterProps) => {
  const orders = data as PredictedOrder[]
  let list: ReactNode[][] = []
  let currentDate = ''

  //separate by date
  orders.forEach((order) => {
    if (order.date !== currentDate) {
      currentDate = order.date
      list.push([
        <div key={order.date} className={styles.header}>
          <div className={styles.headerText}>
            {moment(order.date).format(displayDateTimeFormat)}
          </div>
          <Link
            className={classnames('btn btn-primary', styles.editButton)}
            to={`/predicted_orders/${moment(order.date).format(
              paramsDateFormat
            )}/edit`}>
            <FaEdit />
          </Link>
        </div>,
      ])
    }

    list[list.length - 1].push(
      <div key={order.id} className={styles.order}>
        <div>
          {order.quantity} {order.name}
        </div>
      </div>
    )
  })

  return (
    <>
      {list.map((child, idx) => (
        <div key={idx} className={styles.container}>
          {child}
        </div>
      ))}
    </>
  )
}

export default PredictedOrderList
