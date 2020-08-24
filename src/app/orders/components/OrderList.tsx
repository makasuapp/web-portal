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
  const [orderFilter, setOrderFilter] = useState("current")
  const filteredOrders = orders.filter((order) => orderFilter === "current" ? 
    order.state !== "delivered" : order.state === "delivered")
  const orderItems = filteredOrders.map((order) => <OrderCard order={order} recipesMap={recipesMap} />)

  const orderFilterBtn = (state: "current" | "delivered", text: string) =>
    <div 
      className={classnames(state === orderFilter ? styles.selectedFilter : null, styles.orderFilterBtn)} 
      onClick={() => setOrderFilter(state)}
    >{text}</div>

  return <div>
    <div className={styles.filters}>
      {orderFilterBtn("current", "Remaining Orders")}
      {orderFilterBtn("delivered", "Completed Orders")}
    </div>

    {orderItems}
  </div>
}

export default OrderList;