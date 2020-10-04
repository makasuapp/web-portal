import React, { useState } from 'react'
import classnames from 'classnames'

import { Order } from 'app/models/order'
import { Recipe } from 'app/models/recipe'
import { ResourceRecord } from 'app/common/ResourceHelper'
import OrderCard from './OrderCard'
import styles from './OrderList.module.css'

interface OuterProps {
  data?: ResourceRecord[]
  recipesMap: { [key: number]: Recipe }
}

const OrderList = ({ data = [], recipesMap }: OuterProps) => {
  const orders = data as Order[]
  const [currentOrders, deliveredOrders] = orders.reduce(
    ([current, delivered]: [Order[], Order[]], order) =>
      order.state === 'delivered'
        ? [current, delivered.concat(order)]
        : [current.concat(order), delivered],
    [[], []]
  )

  const [orderFilter, setOrderFilter] = useState('current')
  const selectedOrders =
    orderFilter === 'current' ? currentOrders : deliveredOrders
  const orderItems = selectedOrders.map((order) => (
    <OrderCard key={order.id} order={order} recipesMap={recipesMap} />
  ))

  const orderFilterBtn = (state: 'current' | 'delivered', text: string) => (
    <div
      key={state}
      className={classnames(
        state === orderFilter ? styles.selectedFilter : null,
        styles.orderFilterBtn
      )}
      onClick={() => setOrderFilter(state)}>
      {text}
    </div>
  )

  return (
    <div>
      <div className={styles.filters}>
        {orderFilterBtn(
          'current',
          `Remaining Orders (${currentOrders.length})`
        )}
        {orderFilterBtn(
          'delivered',
          `Completed Orders (${deliveredOrders.length})`
        )}
      </div>

      {orderItems}
    </div>
  )
}

export default OrderList
