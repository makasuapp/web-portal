import React from 'react';
import {RouteComponentProps} from 'react-router-dom'
import { formValueSelector } from 'redux-form'
import { ReduxState } from 'reducers';
import { connect } from 'react-redux';
import moment from 'moment';

import CreateView from 'app/common/containers/CreateView';
import { PredictedOrderResource, dateFormat } from '../resource';
import PredictedOrdersForm, {formName} from './PredictedOrdersForm';
import { Kitchen } from 'app/models/user';

interface StateProps {
  selectedDate?: string 
  currentKitchen?: Kitchen
}

type Props = RouteComponentProps & StateProps

const PredictedOrdersCreate = (props: Props) => {
  const {currentKitchen} = props

  if (currentKitchen === undefined) {
    return <div>No kitchen selected</div>
  }

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
      kitchen_id: currentKitchen.id
    }}
    hideHeader
  />
}

const selector = formValueSelector(formName)
const mapStateToProps = (state: ReduxState): StateProps => {  
  const dateMs = selector(state, "date_ms")
  const date = dateMs ? moment(parseInt(dateMs)).format(dateFormat) : undefined

  return {
    selectedDate: date,
    currentKitchen: state.auth.currentKitchen
  }
};
export default connect(mapStateToProps, {})(PredictedOrdersCreate)