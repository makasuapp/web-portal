import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import moment from 'moment'

import { fetch } from 'app/common/duck/actions';
import TopBar from 'app/common/components/TopBar'
import IndexView from 'app/common/containers/IndexView';
import {PredictedOrderResource} from '../resource';
import PredictedOrderList from '../components/PredictedOrderList';
import DateRangeSelector from '../components/DateRangeSelector';
import { Resource, Params } from 'app/common/ResourceHelper';

interface DispatchProps {
  fetch: (resource: Resource, params?: Params) => void
}

type Props = DispatchProps

interface State {
  startDate: Date,
  endDate: Date
}

const today = new Date()
class PredictedOrdersIndex extends React.Component<Props, State> {
  state: State = {startDate: today, endDate: today}

  endpointParams = () => {
    return {
      kitchen_id: 1, 
      start: moment(this.state.startDate).format("D/M/y"),
      end: moment(this.state.endDate).format("D/M/y")
    }
  }

  setStartDate = (date: Date) => {
    this.setState({startDate: date})
    if (this.state.endDate.getTime() < date.getTime()) {
      this.setState({endDate: date})
    }
  }

  refreshDates = () => {
    this.props.fetch(PredictedOrderResource, this.endpointParams())
  }

  render() {
    const {startDate, endDate} = this.state

    return <div>
      <TopBar items={[
        <Link 
          key="new"
          className={"btn btn-primary"}
          to={"/predicted_orders/new"}>
            Add Predicted Orders
        </Link>
      ]} />
      <DateRangeSelector 
        startDate={startDate}
        endDate={endDate}
        onStartChange={this.setStartDate}
        onEndChange={(date) => this.setState({endDate: date})}
        onSubmit={this.refreshDates}
      />
      <IndexView
        resource={PredictedOrderResource}
        params={this.endpointParams()}
      >
        <PredictedOrderList />
      </IndexView>
    </div>
  }
}

export default connect(null, {fetch})(PredictedOrdersIndex)