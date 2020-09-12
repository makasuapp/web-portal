import React, {Component} from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import moment from 'moment'

import {fetch} from "../../common/duck/actions";
import { PredictedOrderResource } from '../resource';
import { paramsDateFormat } from 'app/common/DateHelper';
import PredictedOrdersForm, { PredictedOrdersFormData } from './PredictedOrdersForm';
import LoadingPage from 'app/common/components/LoadingPage';
import {ReduxState} from "reducers";
import styles from 'app/common/containers/Form.module.css'
import { PredictedOrder } from 'app/models/predicted_order';
import { Resource, Params } from 'app/common/ResourceHelper';
import { editPredictedOrders } from '../duck/action';
import { Kitchen } from 'app/models/user';

interface UrlParams {
  date: string
}

interface StateProps {
  isFetching: boolean
  isLoading: boolean
  error?: string
  predictedOrders: PredictedOrder[]
  currentKitchen?: Kitchen
}

interface DispatchProps {
  fetch: (resource: Resource, params?: Params) => void
  editPredictedOrders: (formData: PredictedOrdersFormData) => void
}

type Props = RouteComponentProps<UrlParams> & StateProps & DispatchProps

class PredictedOrdersEdit extends Component<Props> {
  componentDidMount() {
    const dateStr = this.getDate()
    const {currentKitchen, fetch} = this.props

    //TODO: should redirect if no kitchen
    if (currentKitchen) {
      fetch(PredictedOrderResource, {
        kitchen_id: currentKitchen.id, 
        start: dateStr,
        end: dateStr
      })
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (!this.props.isLoading && prevProps.isLoading) {
      if (this.props.error !== undefined) {
        toast.error(this.props.error);
      } else {
        toast.success(`Successfully edited ${PredictedOrderResource.name}`)

        const dateStr = this.getDate()
        this.props.history.push({
          pathname: PredictedOrderResource.indexPath,
          search: `?startDate=${dateStr}&endDate=${dateStr}`
        })
      }
    }
  }

  getDate = (): string => {
    const date = this.props.match.params.date
    if (date !== undefined) {
      return moment(date, "y-M-D").format(paramsDateFormat)
    }

    throw Error("expected date")
  }

  handleSubmit = (form: PredictedOrdersFormData) => {
    this.props.editPredictedOrders(form)
  }

  render() {
    const {isFetching, isLoading, predictedOrders, currentKitchen} = this.props

    if (isFetching) {
      return <LoadingPage />
    } else if (predictedOrders.length === 0) {
      return <div>Nothing to see here</div>
    } else if (currentKitchen === undefined) {
      return <div>No kitchen selected</div>
    } else {
      return <div className={styles.form}>
        <h1>Edit Predicted Orders</h1>
        {isLoading ? <div>Processing...</div> : null}
        <PredictedOrdersForm 
          onSubmit={this.handleSubmit} 
          disabled={isLoading} 
          dateDisabled={true}
          initialValues={{
            kitchen_id: currentKitchen.id,
            date_ms: moment(this.getDate(), paramsDateFormat).valueOf(),
            predicted_orders: predictedOrders.map((predictedOrder) => {
              return {
                quantity: predictedOrder.quantity,
                recipe_id: predictedOrder.recipe_id
              }
            })
          }} />
      </div>
    }
  }
}

const mapStateToProps = (state: ReduxState): StateProps => {
  const resourceState = state.api[PredictedOrderResource.name]
  const predictedOrders = resourceState.data as PredictedOrder[]

  return {
    isLoading: resourceState.isLoading,
    isFetching: resourceState.isFetching,
    predictedOrders,
    error: resourceState.error,
    currentKitchen: state.auth.currentKitchen
  }
};

export default connect(mapStateToProps, {fetch, editPredictedOrders})(PredictedOrdersEdit)