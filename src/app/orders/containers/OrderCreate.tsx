import React from 'react';
import { connect } from 'react-redux';
import {RouteComponentProps} from 'react-router-dom'
import {reset} from 'redux-form';

import CreateView from 'app/common/containers/CreateView';
import OrderForm, { OrderFormData } from './OrderForm';
import { OrderResource } from '../resource';

interface DispatchProps {
  reset: (formName: string) => void
}

type Props = DispatchProps & RouteComponentProps

const formatData = (form: OrderFormData) => {
  const {order} = form
  const updatedOrderItems = (order.order_items ||  []).map((item) =>
    Object.assign({}, item, {price_cents: parseFloat(item.price_cents) * 100})
  )
  //TODO(kitchenId): once we use actual kitchen, change asap time to now
  const updatedTime = order.for_type === "asap" ? "1595549594000" : order.for_time
  const updatedOrder = Object.assign({}, order, {
    order_items: updatedOrderItems, 
    for_type: undefined,
    for_time: updatedTime
  })

  return Object.assign({}, form, {order: updatedOrder})
}

const OrderCreate = (props: Props) => {
  //TODO(kitchenId): use actual kitchen id
  return <CreateView 
    resource={OrderResource} 
    Form={OrderForm} 
    onCreate={() => {
      props.reset("orderForm")
    }}
    formatData={formatData}
    initialValues={{
      order: {
        order_type: "delivery", 
        for_type: "asap",
        kitchen_id: 1
      },
      customer: {
        //a bit hacky but need something to init customer with everything optional
        first_name: "" 
      }
    }}
  />
}

export default connect(null, {reset})(OrderCreate)
