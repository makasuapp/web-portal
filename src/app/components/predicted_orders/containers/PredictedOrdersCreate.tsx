import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { formValueSelector } from 'redux-form'
import { ReduxState } from 'reducers'
import { connect } from 'react-redux'
import moment, { Moment } from 'moment'

import CreateView from 'app/components/common/reduxForm/CreateView'
import { PredictedOrderResource } from 'app/resources/PredictedOrderResource'
import { paramsDateFormat } from 'app/utils/DateHelper'
import PredictedOrdersForm, {
  formName,
  PredictedOrdersFormData,
} from './PredictedOrdersForm'
import { Kitchen } from 'app/models/user'
import { editPredictedOrders } from '../duck/action'

interface StateProps {
  selectedDate?: Moment
  currentKitchen?: Kitchen
}

interface DispatchProps {
  editPredictedOrders: (formData: PredictedOrdersFormData) => void
}

type Props = RouteComponentProps & StateProps & DispatchProps

const PredictedOrdersCreate = (props: Props) => {
  const { currentKitchen } = props

  if (currentKitchen === undefined) {
    return <div>No kitchen selected</div>
  }

  return (
    <CreateView
      resource={PredictedOrderResource}
      Form={PredictedOrdersForm}
      handleCreate={props.editPredictedOrders}
      onCreate={() => {
        const { selectedDate } = props
        const startDate = selectedDate?.startOf('day').format(paramsDateFormat)
        const endDate = selectedDate?.endOf('day').format(paramsDateFormat)

        props.history.push({
          pathname: PredictedOrderResource.indexPath,
          search: `?startDate=${startDate}&endDate=${endDate}`,
        })
      }}
      initialValues={{
        kitchen_id: currentKitchen.id,
      }}
      hideHeader
    />
  )
}

const selector = formValueSelector(formName)
const mapStateToProps = (state: ReduxState): StateProps => {
  const dateMs = selector(state, 'date_ms')
  const date = dateMs ? moment(parseInt(dateMs)) : undefined

  return {
    selectedDate: date,
    currentKitchen: state.auth.currentKitchen,
  }
}
export default connect(mapStateToProps, { editPredictedOrders })(
  PredictedOrdersCreate
)
