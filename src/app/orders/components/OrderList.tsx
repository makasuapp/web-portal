import React, {useState} from 'react';
import {Order} from 'app/models/order';
import {Recipe} from 'app/models/recipe';
import OrderCard from './OrderCard';
import classnames from 'classnames';
import styles from './OrderList.module.css';

interface OuterProps {
  orders: Order[]
  recipesMap: {[key: number]: Recipe}
}

const OrderList = ({orders, recipesMap}: OuterProps) => {
  const [currentOrders, deliveredOrders] = orders.reduce(([current, delivered]: [Order[], Order[]], order) =>
    order.state === "delivered" ? 
      [current, delivered.concat(order)] :
      [current.concat(order), delivered]
  , [[], []])

  const [orderFilter, setOrderFilter] = useState("current")
  const selectedOrders = orderFilter === "current" ? currentOrders : deliveredOrders 
  const orderItems = selectedOrders.map((order) => <OrderCard key={order.id} order={order} recipesMap={recipesMap} />)

  const orderFilterBtn = (state: "current" | "delivered", text: string) =>
    <div 
      key={state}
      className={classnames(state === orderFilter ? styles.selectedFilter : null, styles.orderFilterBtn)} 
      onClick={() => setOrderFilter(state)}
    >{text}</div>

  return <div>
    <div className={styles.filters}>
      {orderFilterBtn("current", `Remaining Orders (${currentOrders.length})`)}
      {orderFilterBtn("delivered", `Completed Orders (${deliveredOrders.length})`)}
    </div>

    {orderItems}
  </div>
}

export default OrderList;