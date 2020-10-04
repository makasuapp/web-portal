import React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { reset } from 'redux-form'

import CreateView from 'app/common/containers/CreateView'
import OrderForm, { OrderFormData } from './OrderForm'
import { OrderResource } from '../resource'
import { ReduxState } from 'reducers'
import { Kitchen } from 'app/models/user'

interface DispatchProps {
  reset: (formName: string) => void
}

interface StateProps {
  currentKitchen?: Kitchen
}

type Props = DispatchProps & RouteComponentProps & StateProps

const formatData = (form: OrderFormData) => {
  const { order } = form
  const updatedOrderItems = (order.order_items || []).map((item) =>
    Object.assign({}, item, { price_cents: parseFloat(item.price_cents) * 100 })
  )

  const updatedTime =
    order.for_type === 'asap' ? new Date().getTime() : order.for_time
  const updatedOrder = Object.assign({}, order, {
    order_items: updatedOrderItems,
    for_type: undefined,
    for_time: updatedTime,
  })

  return Object.assign({}, form, { order: updatedOrder })
}

const OrderCreate = (props: Props) => {
  const { currentKitchen } = props

  if (currentKitchen === undefined) {
    return <div>No kitchen selected</div>
  }

  return (
    <CreateView
      resource={OrderResource}
      Form={OrderForm}
      onCreate={() => {
        props.reset('orderForm')
      }}
      formatData={formatData}
      initialValues={{
        order: {
          order_type: 'delivery',
          for_type: 'asap',
          kitchen_id: currentKitchen.id,
        },
        customer: {
          //a bit hacky but need something to init customer with everything optional
          first_name: '',
        },
      }}
    />
  )
}

const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    currentKitchen: state.auth.currentKitchen,
  }
}

export default connect(mapStateToProps, { reset })(OrderCreate)
