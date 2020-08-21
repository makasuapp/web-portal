import React from 'react';
import { connect } from 'react-redux';
import {RouteComponentProps} from 'react-router-dom'
import {reset} from 'redux-form';

import CreateView from 'app/common/containers/CreateView';
import OrderForm from './OrderForm';
import { OrderResource } from './resource';

interface DispatchProps {
  reset: (formName: string) => void
}

type Props = DispatchProps & RouteComponentProps

const OrderCreate = (props: Props) => {
  return <CreateView 
    resource={OrderResource} 
    Form={OrderForm} 
    onCreate={() => {
      props.reset("orderForm")
    }}
    initialValues={{order: {
      order_type: "delivery", 
      for_time: "2020-07-24 00:13:14",
      kitchen_id: 1
    }}}
  />
}

export default connect(null, {reset})(OrderCreate)
