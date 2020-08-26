import React from 'react';
import {RouteComponentProps} from 'react-router-dom'

import CreateView from 'app/common/containers/CreateView';
import { PredictedOrderResource } from '../resource';
import PredictedOrdersForm from '../containers/PredictedOrdersForm';

type Props = RouteComponentProps

const PredictedOrdersCreate = (props: Props) => {
  //TODO(kitchenId): use actual kitchen id
  return <CreateView 
    resource={PredictedOrderResource} 
    Form={PredictedOrdersForm} 
    onCreate={() => {
      props.history.push(PredictedOrderResource.indexPath)
    }}
    initialValues={{
      kitchen_id: 1
    }}
  />
}

export default PredictedOrdersCreate
