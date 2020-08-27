import React from 'react'
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom'
import moment from 'moment'
import queryString from 'query-string'

import LoadingPage from 'app/common/components/LoadingPage';
import {ReduxState} from "reducers";
import { fetch } from 'app/common/duck/actions';
import TopBar from 'app/common/components/TopBar'
import {PredictedOrderResource, dateFormat} from '../resource';
import PredictedOrderList from '../components/PredictedOrderList';
import DateRangeSelector from '../components/DateRangeSelector';
import { Resource, Params } from 'app/common/ResourceHelper';
import { PredictedOrder } from 'app/models/predicted_order';

interface DispatchProps {
  fetch: (resource: Resource, params?: Params) => void
}

interface StateProps {
  isFetching: boolean
  hasFetched: boolean
  predictedOrders: PredictedOrder[] 
}

type Props = DispatchProps & StateProps & RouteComponentProps

interface State {
  startDate: Date,
  endDate: Date
}

const today = new Date()
class PredictedOrdersIndex extends React.Component<Props, State> {
  state: State = {startDate: today, endDate: today}

  //set date from query str
  componentDidMount() {
    const values = queryString.parse(this.props.location.search)
    const {startDate, endDate} = values

    const startDateObj = startDate ? moment(startDate, dateFormat).toDate() : this.state.startDate
    const endDateObj = endDate ? moment(endDate, dateFormat).toDate() : this.state.endDate

    if (this.isDiffDateState(startDateObj, endDateObj)) {
      this.setState({startDate: startDateObj, endDate: endDateObj})
    } else {
      this.props.fetch(PredictedOrderResource, this.endpointParams())
    }
  }

  //pull data and update query params for new dates
  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.isDiffDateState(prevState.startDate, prevState.endDate)) {
      this.props.fetch(PredictedOrderResource, this.endpointParams())

      this.props.history.push({
        pathname: PredictedOrderResource.indexPath,
        search: `?startDate=${this.dateStr(this.state.startDate)}&endDate=${this.dateStr(this.state.endDate)}`
      })
    }
  }

  isDiffDateState = (startDate: Date, endDate: Date) => 
    this.state.startDate.getTime() !== startDate.getTime() ||
      this.state.endDate.getTime() !== endDate.getTime()

  dateStr = (date: Date) => moment(date).format(dateFormat)

  endpointParams = () => {
    //TODO(kitchenId)
    return {
      kitchen_id: 1, 
      start: this.dateStr(this.state.startDate),
      end: this.dateStr(this.state.endDate)
    }
  }

  setStartDate = (date: Date) => {
    this.setState({startDate: date})
    if (this.state.endDate.getTime() < date.getTime()) {
      this.setState({endDate: date})
    }
  }

  render() {
    const {startDate, endDate} = this.state
    const {predictedOrders, isFetching} = this.props

    let list
    if (isFetching) {
      list = <LoadingPage />
    } else if (predictedOrders.length === 0) {
      list = <div>Nothing to see here yet!</div>
    } else {
      list = <PredictedOrderList data={predictedOrders} />
    }

    return <div>
      <TopBar items={[
        <Link 
          key="new"
          className={"btn btn-primary"}
          to={"/predicted_orders/new"}>
            Add Predicted Orders
        </Link>
      ]} />
      <h1>Predicted Orders</h1>
      <DateRangeSelector 
        startDate={startDate}
        endDate={endDate}
        onStartChange={this.setStartDate}
        onEndChange={(date) => this.setState({endDate: date})}
      />
      {list}
    </div>
  }
}

const mapStateToProps = (state: ReduxState): StateProps => {
  const resourceState = state.api[PredictedOrderResource.name]
  const predictedOrders = resourceState.data as PredictedOrder[]

  return {
    isFetching: resourceState.isFetching,
    hasFetched: resourceState.hasFetched,
    predictedOrders
  }
};

export default connect(mapStateToProps, {fetch})(PredictedOrdersIndex)