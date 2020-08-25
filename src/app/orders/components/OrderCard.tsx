import React from 'react'
import moment from 'moment'
import {Order} from 'app/models/order';
import {Recipe} from 'app/models/recipe';
import styles from './OrderCard.module.css';

interface OuterProps {
  order: Order
  recipesMap: {[key: number]: Recipe}
}

const OrderCard = ({order, recipesMap}: OuterProps) => {
  const {customer} = order;
  const name = customer.name ?? customer.id;
  const contact = customer.phone_number ?? customer.email;

  const forTimeSec = order.for_time ?? order.created_at
  const forTime = moment(forTimeSec * 1000).format('lll')

  return <div className={styles.card}>
    <div className={styles.top}>
      <div>Order ID: {order.order_id}</div>
      <div>Type: {order.order_type}</div>
      <div>For: {forTime}</div>
      <div>Status: {order.state}</div>
      <div>Customer: {name} {contact ? `(${contact})` : null}</div>
    </div>

    <div className={styles.items}>
      {order.items.map((item) => {
        const recipe = recipesMap[item.recipe_id]
        return <div key={item.id}>
          {item.quantity} {(recipe && recipe.name) || `Recipe ${item.recipe_id}`}
        </div>
      })}
    </div>
  </div>
}

export default OrderCard;