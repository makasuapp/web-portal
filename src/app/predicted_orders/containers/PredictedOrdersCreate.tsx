import React from 'react';
import {RouteComponentProps} from 'react-router-dom'
import { formValueSelector } from 'redux-form'
import { ReduxState } from 'reducers';
import { connect } from 'react-redux';
import moment from 'moment';

import CreateView from 'app/common/containers/CreateView';
import { PredictedOrderResource } from '../resource';
import PredictedOrdersForm, {formName} from './PredictedOrdersForm';

interface StateProps {
  selectedDate?: string 
}

type Props = RouteComponentProps & StateProps

const PredictedOrdersCreate = (props: Props) => {
  //TODO(kitchenId): use actual kitchen id
  return <CreateView 
    resource={PredictedOrderResource} 
    Form={PredictedOrdersForm} 
    onCreate={() => {
      const {selectedDate} = props
      props.history.push({
        pathname: PredictedOrderResource.indexPath,
        search: `?startDate=${selectedDate}&endDate=${selectedDate}`
      })
    }}
    initialValues={{
      kitchen_id: 1
    }}
    hideHeader
  />
}

const selector = formValueSelector(formName)
const mapStateToProps = (state: ReduxState) => {  
  const dateMs = selector(state, "date_ms")
  const date = dateMs ? moment(parseInt(dateMs)).format("D/M/y") : undefined

  return {
    selectedDate: date,
  }
};
export default connect(mapStateToProps, {})(PredictedOrdersCreate)