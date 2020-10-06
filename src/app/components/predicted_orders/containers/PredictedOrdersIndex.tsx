import React from 'react'
import { connect } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'
import moment, { Moment } from 'moment'
import queryString from 'query-string'

import LoadingPage from 'app/components/common/LoadingPage'
import { ReduxState } from 'reducers'
import { fetch } from 'app/components/common/reduxForm/duck/actions'
import TopBar from 'app/components/common/TopBar'
import { PredictedOrderResource } from '../../../resources/PredictedOrderResource'
import { paramsDateFormat } from 'app/utils/DateHelper'
import PredictedOrderList from '../components/PredictedOrderList'
import DateRangeSelector from '../components/DateRangeSelector'
import { Resource, Params } from 'app/resources/ResourceHelper'
import { PredictedOrder } from 'app/models/predicted_order'
import { Kitchen } from 'app/models/user'

interface DispatchProps {
  fetch: (resource: Resource, params?: Params) => void
}

interface StateProps {
  isFetching: boolean
  predictedOrders: PredictedOrder[]
  currentKitchen?: Kitchen
}

type Props = DispatchProps & StateProps & RouteComponentProps

interface State {
  startDate: Moment
  endDate: Moment
}

class PredictedOrdersIndex extends React.Component<Props, State> {
  state: State = {
    startDate: moment().startOf('day'),
    endDate: moment().endOf('day'),
  }

  //set initial state from params, state is what's synced with server
  componentDidMount() {
    const values = queryString.parse(this.props.location.search)
    const { startDate, endDate } = values

    const startDateObj = startDate
      ? moment(startDate, paramsDateFormat)
      : this.state.startDate
    const endDateObj = endDate
      ? moment(endDate, paramsDateFormat)
      : this.state.endDate

    if (this.isDiffDateState(startDateObj, endDateObj)) {
      this.setState({ startDate: startDateObj, endDate: endDateObj })
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
        search: `?startDate=${this.dateStr(
          this.state.startDate
        )}&endDate=${this.dateStr(this.state.endDate)}`,
      })
    }
  }

  isDiffDateState = (startDate: Moment, endDate: Moment) =>
    this.state.startDate.valueOf() !== startDate.valueOf() ||
    this.state.endDate.valueOf() !== endDate.valueOf()

  dateStr = (date: Moment) => date.format(paramsDateFormat)

  endpointParams = () => {
    //TODO: should redirect if no kitchen
    const { currentKitchen } = this.props
    if (currentKitchen) {
      return {
        kitchen_id: currentKitchen.id,
        start: this.dateStr(this.state.startDate),
        end: this.dateStr(this.state.endDate),
      }
    } else {
      throw Error('no kitchen set')
    }
  }

  setStartDate = (dateObj: Date) => {
    const date = moment(dateObj)
    this.setState({ startDate: date })
    if (this.state.endDate.valueOf() < date.valueOf()) {
      this.setState({ endDate: date })
    }
  }

  render() {
    const { startDate, endDate } = this.state
    const { predictedOrders, isFetching } = this.props

    let list
    if (isFetching) {
      list = <LoadingPage />
    } else if (predictedOrders.length === 0) {
      list = <div>Nothing to see here yet!</div>
    } else {
      list = <PredictedOrderList data={predictedOrders} />
    }

    return (
      <div>
        <TopBar
          items={[
            <Link
              key="new"
              className={'btn btn-primary'}
              to={PredictedOrderResource.newPath}>
              Add Expected Orders
            </Link>,
          ]}
        />
        <h1>Expected Orders</h1>
        <DateRangeSelector
          startDate={startDate.toDate()}
          endDate={endDate.toDate()}
          onStartChange={this.setStartDate}
          onEndChange={(date) => this.setState({ endDate: moment(date) })}
        />
        {list}
      </div>
    )
  }
}

const mapStateToProps = (state: ReduxState): StateProps => {
  const resourceState = state.api[PredictedOrderResource.name]
  const predictedOrders = resourceState.data as PredictedOrder[]

  return {
    isFetching: resourceState.isFetching,
    predictedOrders,
    currentKitchen: state.auth.currentKitchen,
  }
}

export default connect(mapStateToProps, { fetch })(PredictedOrdersIndex)
